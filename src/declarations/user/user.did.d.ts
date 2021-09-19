import type { Principal } from '@dfinity/principal';
export type Role = { 'admin' : null } |
  { 'authorized' : null } |
  { 'guest' : null } |
  { 'ambassador' : null };
export interface UserProfile {
  'userName' : [] | [string],
  'communities' : [] | [Array<string>],
  'doubleOptIn' : boolean,
  'emailAddress' : [] | [string],
  'lastName' : [] | [string],
  'firstName' : [] | [string],
}
export interface user {
  'assign_role' : (arg_0: Principal, arg_1: Role) => Promise<undefined>,
  'createNewUser' : (arg_0: UserProfile) => Promise<undefined>,
  'getUserProfile' : () => Promise<[] | [UserProfile]>,
  'getUserRole' : () => Promise<[] | [Role]>,
  'updateUserProfile' : (arg_0: UserProfile) => Promise<undefined>,
}
export interface _SERVICE extends user {}
