import type { Principal } from '@dfinity/principal';
export type AccountIdentifier = string;
export type AccountIdentifier__1 = string;
export interface AllowanceRequest {
  'token' : TokenIdentifier,
  'owner' : User,
  'spender' : Principal,
}
export interface ApproveRequest {
  'token' : TokenIdentifier,
  'subaccount' : [] | [SubAccount],
  'allowance' : Balance,
  'spender' : Principal,
}
export type Balance = bigint;
export interface BalanceRequest { 'token' : TokenIdentifier, 'user' : User }
export type BalanceResponse = { 'ok' : Balance } |
  { 'err' : CommonError__1 };
export type Balance__1 = bigint;
export type CommonError = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type CommonError__1 = { 'InvalidToken' : TokenIdentifier } |
  { 'Other' : string };
export type Memo = Array<number>;
export type Result = { 'ok' : Balance__1 } |
  { 'err' : CommonError };
export type Result_1 = { 'ok' : AccountIdentifier__1 } |
  { 'err' : CommonError };
export type Result_2 = { 'ok' : Array<number> } |
  { 'err' : CommonError };
export type SubAccount = Array<number>;
export type TokenIdentifier = string;
export type TokenIdentifier__1 = string;
export type TokenIndex = number;
export interface TransferRequest {
  'to' : User,
  'token' : TokenIdentifier,
  'notify' : boolean,
  'from' : User,
  'memo' : Memo,
  'subaccount' : [] | [SubAccount],
  'amount' : Balance,
}
export type TransferResponse = { 'ok' : Balance } |
  {
    'err' : { 'CannotNotify' : AccountIdentifier } |
      { 'InsufficientBalance' : null } |
      { 'InvalidToken' : TokenIdentifier } |
      { 'Rejected' : null } |
      { 'Unauthorized' : AccountIdentifier } |
      { 'Other' : string }
  };
export type User = { 'principal' : Principal } |
  { 'address' : AccountIdentifier };
export interface movieNFT {
  'acceptCycles' : () => Promise<undefined>,
  'allowance' : (arg_0: AllowanceRequest) => Promise<Result>,
  'approve' : (arg_0: ApproveRequest) => Promise<undefined>,
  'availableCycles' : () => Promise<bigint>,
  'balance' : (arg_0: BalanceRequest) => Promise<BalanceResponse>,
  'getAllowances' : () => Promise<Array<[TokenIndex, Principal]>>,
  'getCaller' : () => Promise<Principal>,
  'getMinter' : () => Promise<Principal>,
  'getNFTsOfOwner' : () => Promise<Array<[TokenIndex, Principal]>>,
  'getRegistry' : () => Promise<Array<[TokenIndex, AccountIdentifier__1]>>,
  'getTokens' : () => Promise<Array<[TokenIndex, Array<number>]>>,
  'metadata' : (arg_0: TokenIdentifier__1) => Promise<Result_2>,
  'mintNFT' : (arg_0: Principal, arg_1: string) => Promise<TokenIndex>,
  'ownerOf' : (arg_0: TokenIdentifier__1) => Promise<Result_1>,
  'setMinter' : (arg_0: Principal) => Promise<undefined>,
  'totalSupply' : (arg_0: TokenIdentifier__1) => Promise<Result>,
  'transferFrom' : (arg_0: TransferRequest) => Promise<TransferResponse>,
}
export interface _SERVICE extends movieNFT {}
