import { user, idlFactory } from "../../../declarations/user/index";

export const baseProfile= idlFactory.UserProfile;

export async function getUserProfile() {
  const appUser = await user.getUserProfile();
  if (appUser) {
    return appUser;
  } else {
    return null;
  }
}

export async function createNewUser(data) {
  const appUser = await user.createNewUser(data);
  if (appUser) {
    return appUser;
  } else {
    return null;
  }
}

export async function updateUserProfile(data) {
  const appUser = await user.updateUserProfile(data);
  if (appUser) {
    return appUser;
  } else {
    return null;
  }
}

export async function getUserFromCanister(userId) {
  const icUser = await user.getProfilePlus(userId);
  if (icUser) {
    return icUser;
  } else {
    return null;
  }
}

export function getUserFromStorage(storage = window.localStorage, key){
    const lsUser = storage.getItem(key);
    if (lsUser) {
      return JSON.parse(lsUser, (k, v) => {
        if (k === "rewards") {
          return v;
        }
        return v;
      });
    } else {
      return undefined;
    }
  }