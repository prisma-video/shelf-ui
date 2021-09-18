import { user } from "../../../declarations/user/index";

export async function getUserProfile() {
  const appUser = await user.getUserProfile();
  if (appUser) {
    return appUser;
  } else {
    return null;
  }
}

export async function createNewUser() {
  const appUser = await user.createNewUser();
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