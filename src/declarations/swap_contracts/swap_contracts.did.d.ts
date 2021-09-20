import type { Principal } from '@dfinity/principal';
export interface SalesContract {
  'nft' : TokenIndex__1,
  'offerDate' : Time,
  'status' : SalesContractStatus,
  'purchasePrice' : number,
  'seller' : Principal,
  'buyer' : Principal,
  'executionDate' : Time,
  'executionType' : SalesTypes,
}
export type SalesContractId = number;
export type SalesContractStatus = { 'pending' : null } |
  { 'blocked' : null } |
  { 'approved' : null } |
  { 'rejected' : null };
export interface SalesOffer { 'nft' : TokenIndex__1, 'purchasePrice' : number }
export type SalesTypes = { 'automatic' : null } |
  { 'undefined' : null } |
  { 'manual' : null };
export type Time = bigint;
export type TokenIndex = number;
export type TokenIndex__1 = number;
export interface _SERVICE {
  'executeSalesOrder' : (arg_0: SalesContractId) => Promise<boolean>,
  'getOffer' : (arg_0: SalesContractId) => Promise<[] | [SalesContract]>,
  'getReservationAvailability' : (arg_0: TokenIndex) => Promise<boolean>,
  'makeOffer' : (arg_0: SalesOffer) => Promise<SalesContractId>,
  'requestReservation' : (arg_0: TokenIndex) => Promise<boolean>,
}
