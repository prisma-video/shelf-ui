import { authprovider } from "../../../declarations/authprovider/index";
// import { authprovider } from "ic:canister/authprovider";

export async function getUserFromCanister(userId) {
  const icUser = await authprovider.getProfilePlus(userId);
  console.log(icUser);
  if (icUser) {
    return icUser;
  } else {
    return null;
  }
};

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
  };