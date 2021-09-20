import type { Principal } from '@dfinity/principal';
export type Role = { 'admin' : null } |
  { 'authorized' : null } |
  { 'guest' : null } |
  { 'ambassador' : null };
export interface UserProfile {
  'userName' : string,
  'emailAddress' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'assign_role' : (arg_0: Principal, arg_1: Role) => Promise<undefined>,
  'createNewUser' : (arg_0: UserProfile) => Promise<undefined>,
  'getUserProfile' : () => Promise<[] | [UserProfile]>,
  'getUserRole' : () => Promise<[] | [Role]>,
  'updateUserProfile' : (arg_0: UserProfile) => Promise<undefined>,
}
