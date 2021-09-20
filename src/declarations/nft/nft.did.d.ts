import type { Principal } from '@dfinity/principal';
export type Balance = bigint;
export type CommonError = { 'InvalidToken' : TokenIndex__1 } |
  { 'Other' : string };
export type Result = { 'ok' : Balance } |
  { 'err' : CommonError };
export type Result_1 = { 'ok' : Principal } |
  { 'err' : CommonError };
export type Result_2 = { 'ok' : Array<[TokenIndex, TokenMetadata]> } |
  { 'err' : CommonError };
export type TokenIndex = number;
export type TokenIndex__1 = number;
export interface TokenMetadata {
  'name' : string,
  'description' : string,
  'properties' : {
    'title' : string,
    'original_owner' : Principal,
    'internal_id' : string,
    'shipment_id' : string,
    'previous_metadata' : string,
    'metadata_version' : bigint,
  },
}
export interface _SERVICE {
  '_exists' : (arg_0: TokenIndex) => Promise<boolean>,
  '_isApprovedOrOwner' : (arg_0: Principal, arg_1: TokenIndex) => Promise<
      boolean
    >,
  '_transfer' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: TokenIndex,
    ) => Promise<undefined>,
  '_updateBalance' : (arg_0: Principal, arg_1: bigint) => Promise<Result>,
  'acceptCycles' : () => Promise<undefined>,
  'availableCycles' : () => Promise<bigint>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'getApproved' : (arg_0: TokenIndex) => Promise<Result_1>,
  'getCaller' : () => Promise<string>,
  'getMinter' : () => Promise<Principal>,
  'getNFT' : (arg_0: TokenIndex) => Promise<[] | [Principal]>,
  'getNFTsOfOwner' : () => Promise<Result_2>,
  'getOwners' : () => Promise<Array<[TokenIndex, Principal]>>,
  'getTokens' : () => Promise<Array<[TokenIndex, TokenMetadata]>>,
  'mintMovieNFT' : (arg_0: Principal, arg_1: TokenMetadata) => Promise<
      TokenIndex
    >,
  'ownerOf' : (arg_0: TokenIndex) => Promise<Result_1>,
  'setMinter' : (arg_0: Principal) => Promise<undefined>,
  'tokenOfOwnerByIndex' : (arg_0: Principal, arg_1: bigint) => Promise<
      [] | [TokenIndex]
    >,
  'totalSupply' : () => Promise<Result>,
  'transferFrom' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: TokenIndex,
    ) => Promise<undefined>,
}
