import type { Principal } from '@dfinity/principal';
export type Balance = bigint;
export type CommonError = { 'InvalidToken' : TokenIndex__1 } |
  { 'Other' : string };
export type Result = { 'ok' : Balance } |
  { 'err' : CommonError };
export type Result_1 = { 'ok' : Principal } |
  { 'err' : CommonError };
export type Result_2 = { 'ok' : string } |
  { 'err' : string };
export type Result_3 = { 'ok' : Array<TokenIndex> } |
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
export type UpdateOwnedTokenTypes = { 'Add' : null } |
  { 'Remove' : null };
export interface _SERVICE {
  '_exists' : (arg_0: TokenIndex) => Promise<boolean>,
  '_isApprovedOrOwner' : (arg_0: Principal, arg_1: TokenIndex) => Promise<
      boolean
    >,
  '_setVideo' : (arg_0: TokenIndex, arg_1: string) => Promise<undefined>,
  '_transfer' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: TokenIndex,
    ) => Promise<undefined>,
  '_updateBalance' : (arg_0: Principal, arg_1: bigint) => Promise<Result>,
  '_updateOwnedTokens' : (
      arg_0: Principal,
      arg_1: TokenIndex,
      arg_2: UpdateOwnedTokenTypes,
    ) => Promise<undefined>,
  'acceptCycles' : () => Promise<undefined>,
  'availableCycles' : () => Promise<bigint>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'getApproved' : (arg_0: TokenIndex) => Promise<Result_1>,
  'getCaller' : () => Promise<string>,
  'getMinter' : () => Promise<Principal>,
  'getNFT' : (arg_0: TokenIndex) => Promise<[] | [Principal]>,
  'getNFTsOfOwner' : () => Promise<Array<[TokenIndex, TokenMetadata]>>,
  'getNFTsOfOwner3' : (arg_0: Principal) => Promise<Result_3>,
  'getOwners' : () => Promise<Array<[TokenIndex, Principal]>>,
  'getOwnerships' : () => Promise<Array<[Principal, Array<TokenIndex>]>>,
  'getTokens' : () => Promise<Array<[TokenIndex, TokenMetadata]>>,
  'getVideo' : (arg_0: TokenIndex) => Promise<Result_2>,
  'mintMovieNFT' : (
      arg_0: Principal,
      arg_1: TokenMetadata,
      arg_2: string,
    ) => Promise<TokenIndex>,
  'ownerOf' : (arg_0: TokenIndex) => Promise<Result_1>,
  'setMinter' : (arg_0: Principal) => Promise<undefined>,
  'totalSupply' : () => Promise<Result>,
  'transferFrom' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: TokenIndex,
    ) => Promise<undefined>,
}
