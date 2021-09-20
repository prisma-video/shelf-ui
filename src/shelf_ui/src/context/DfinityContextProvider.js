import React, { createContext, useContext, useEffect, useState } from "react";
// import { Identity } from '@dfinity/agent';

import { authClient as authenticationClient } from "./DfinityAuthClient";
import {
  getUserFromCanister,
  getUserFromStorage,
  getUserProfile,
  createNewUser,
  updateUserProfile,
  // baseProfile,
  KEY_LOCALSTORAGE_USER,
} from "../utils/index";

// export const defaultProfile = baseProfile;

export const defaultProfile = {
  userName: "test",
  firstName: "test",
  lastName: "test",
  emailAddress: "test",
  // doubleOptIn: "false",
  // communities: [""],
};

// Provider hook that creates auth object and handles state
export function useProvideAuth(authClient) {
  const [user, setUser] = useState();
  const [isAuthenticatedLocal, setIsAuthenticatedLocal] = useState(false);
  const [_identity, _setIdentity] = useState();
  const [isAuthClientReady, setAuthClientReady] = useState(false);
//   const [urlWithSearch] = useState(globalThis.location.search);
  const [urlWithSearch] = useState();
  const [userProfile, _setUserProfile] = useState();

  // Creating the auth client is async and no auth related checks can happen
  // until it's ready so we set a state variable to keep track of it
  if (!authClient.ready) {
    authClient.create().then(() => setAuthClientReady(true));
  }

  // Use the user from local storage if it is set so the flow doesn't have to
  // make an async query.
  const setUserFromLocalStorage = () => {
    const lsUser = getUserFromStorage(localStorage, KEY_LOCALSTORAGE_USER);
    if (lsUser) {
      setUser(lsUser);
      setIsAuthenticatedLocal(true);
      return () => void 0;
    }
  };

  // Once the auth client is initialized, get the identity and check that they
  // are authenticated, then set them to be fully logged in.
  useEffect(() => {
    if (!authClient.ready) return;
    Promise.all([authClient.getIdentity(), authClient.isAuthenticated()]).then(
      ([identity, isAuthenticated]) => {
        setIsAuthenticatedLocal(isAuthenticated || false);
        _setIdentity(identity);
        setUserFromLocalStorage();
        setAuthClientReady(true);
      }
    );
  }, [authClient, isAuthClientReady]);

  // For testing environments only, this bypasses the authentication with an
  // identity provider for testing purposes.
  const DFX_NETWORK = process.env.DFX_NETWORK || "local";
  useEffect(() => {
    if (DFX_NETWORK === "local") {
      const testUserParam = new URLSearchParams(urlWithSearch).get("testUser");
      if (testUserParam) {
        setIsAuthenticatedLocal(true);
        setAuthClientReady(true);
        setUserFromLocalStorage();
        if (!user) {
          getUserFromCanister(testUserParam).then(
            (user_) => !user && user_ && setUser(user_)
          );
        }
      }
    }
  }, [DFX_NETWORK, urlWithSearch, user]);

  // When user is set, and is not in local storage yet store the user object
  // from the canister in local storag so the user doesn't need to be fetched
  // every load. Then insure user is correctly logged in with identity service,
  // and set them to not logged in if not.
  useEffect(() => {
    if (user && !getUserFromStorage(localStorage, KEY_LOCALSTORAGE_USER)) {
      localStorage.setItem(
        KEY_LOCALSTORAGE_USER,
        JSON.stringify({ ...user, rewards: user.rewards }, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
      if (!authClient.ready) return;
      (async () => {
        const identity = await authClient.getIdentity();
        if (identity && !identity.getPrincipal().isAnonymous()) {
          _setIdentity(identity);
        }
      })();
    }
  }, [authClient, user]);

  // Just creating variables here so that it's pretty below
  const identity = _identity;
  const isAuthenticated = isAuthenticatedLocal;

  // Login to the identity provider by sending user to the IDP and logging
  // them in.
  const logIn = async function () {
    if (!authClient) return;
    await authClient.login();
    const identity = await authClient.getIdentity();
    if (identity) {
      setIsAuthenticatedLocal(true);
      _setIdentity(identity);
      getUserDetails();
    } else {
      console.error("Could not get identity from identity provider");
    }
  };

  // Login to the App
  const getUserDetails = async function () {
    console.log('CALLING');
    const _userProfile = await getUserProfile();
    if(_userProfile[0] != undefined) {
      _setUserProfile(_userProfile[0]);
    } else {
      // registering new user in the DB
      await createNewUser(defaultProfile);
      _setUserProfile(defaultProfile);
    }
  };

  const updateUserDetails = async function (newUserData) {
    await updateUserProfile(newUserData ? newUserData : defaultProfile);
  };

  // Clears the authClient of any cached data, and redirects user to root.
  function logOut() {
    setUser(undefined);
    setIsAuthenticatedLocal(false);
    if (!authClient.ready) return;
    authClient.logout();
  }

  return {
    isAuthenticated,
    isAuthClientReady,
    hasShelfAccount: user !== undefined,
    logIn,
    logOut,
    user,
    identity,
    setUser,
    getUserDetails,
    updateUserDetails,
    userProfile,
  };
}

const dfinityAuthContext = createContext({
    isAuthenticated: false,
    isAuthClientReady: false,
    hasShelfAccount: false,
    identity: null,
    logIn: () => {},
    logOut: () => {},
    user: undefined,
    setUser: () => {},
    getUserDetails: () => {},
    updateUserDetails: () => {},
    userProfile: defaultProfile,
  });

export function DfinityAuth({ children }) {
  const auth = useProvideAuth(authenticationClient);
  return <dfinityAuthContext.Provider value={auth}>{children}</dfinityAuthContext.Provider>;
}

export const useDfinityAuth = () => {
  return useContext(dfinityAuthContext);
};
