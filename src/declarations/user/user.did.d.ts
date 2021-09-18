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
}
export interface user {
  'assign_role' : (arg_0: Principal, arg_1: Role) => Promise<undefined>,
  'createNewUser' : () => Promise<undefined>,
  'getUserProfile' : () => Promise<[] | [UserProfile]>,
  'getUserRole' : () => Promise<[] | [Role]>,
}
export interface _SERVICE extends user {}
