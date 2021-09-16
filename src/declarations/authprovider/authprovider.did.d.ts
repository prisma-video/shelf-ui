import type { Principal } from '@dfinity/principal';
export type List = [] | [[[Principal, Role], List]];
export type Role = { 'admin' : null } |
  { 'owner' : null } |
  { 'authorized' : null };
export interface anon_class_6_1 {
  'assign_role' : (arg_0: Principal, arg_1: [] | [Role]) => Promise<undefined>,
  'callerPrincipal' : () => Promise<Principal>,
  'get_role_requests' : () => Promise<List>,
  'get_roles' : () => Promise<List>,
  'greet' : (arg_0: string) => Promise<string>,
  'my_role' : () => Promise<[] | [Role]>,
  'my_role_request' : () => Promise<[] | [Role]>,
  'request_role' : (arg_0: Role) => Promise<Principal>,
}
export interface _SERVICE extends anon_class_6_1 {}
