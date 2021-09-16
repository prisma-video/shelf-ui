import { Principal } from "@dfinity/principal";

export * from "./auth";
export * from "./nft";

export const KEY_LOCALSTORAGE_USER = `ic-shelf-user`;

export const MAX_CHUNK_SIZE = 1024 * 500; // 500kb
export const REWARDS_CHECK_INTERVAL = 10000;
export const hashtagRegExp = /(?:\s|^)#[A-Za-z0-9\-._]+(?:\s|$)/gim;

export const encodeArrayBuffer = (file) =>
  Array.from(new Uint8Array(file));

export function unwrap(val) {
  if (val[0] === undefined) {
    return null;
  } else {
    return val[0];
  }
}

export function formatBigNumber(number) {
  if (number >= 1_000_000_000) {
    return `${(number / 1_000_000_000).toFixed(2)}B`;
  }
  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(2)}M`;
  }
  if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1)}K`;
  }
  return `${number}`;
}

// Regular expressions for detecting canisterId in various formats
const ic0AppHostRegEx = /(?:(?<canisterId>.*)\.)?(?<subdomain>[^.]*)\.(?<domain>ic0\.app)$/;
const localhostRegEx = /(?<canisterId>(?:\w{5}-){4}cai)\.[^.]*$/;

// Detect canisterId from current URL
export function getCanisterId() {
  const loc = new URL(window.location.toString());
  const hostName = loc.hostname;
  const matchesIc0 = ic0AppHostRegEx.exec(hostName);
  const matchesLocalhost = localhostRegEx.exec(hostName);

  if (matchesIc0?.groups?.canisterId) {
    return Principal.fromText(matchesIc0.groups.canisterId);
  } else if (matchesLocalhost?.groups?.canisterId) {
    return Principal.fromText(matchesLocalhost.groups.canisterId);
  } else if (loc.searchParams.get("canisterId")) {
    return Principal.fromText(loc.searchParams.get("canisterId"));
  } else {
    throw new Error("Could not find the canister ID.");
  }
}