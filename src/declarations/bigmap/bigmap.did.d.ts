import type { Principal } from '@dfinity/principal';
export type KeyString = [Array<number>, string];
export type KeyValue = [Array<number>, Array<number>];
export type ResultNat8 = { 'Ok' : number } |
  { 'Err' : string };
export interface _SERVICE {
  'append' : (arg_0: Array<number>, arg_1: Array<number>) => Promise<bigint>,
  'batch_put' : (arg_0: Array<KeyValue>) => Promise<bigint>,
  'batch_put_and_fts_index' : (arg_0: Array<KeyString>) => Promise<bigint>,
  'delete' : (arg_0: Array<number>) => Promise<bigint>,
  'get' : (arg_0: Array<number>) => Promise<[] | [Array<number>]>,
  'get_random_key' : () => Promise<string>,
  'list' : (arg_0: Array<number>) => Promise<Array<Array<number>>>,
  'lookup_data_bucket_for_get' : (arg_0: Array<number>) => Promise<
      [] | [string]
    >,
  'lookup_data_bucket_for_put' : (arg_0: Array<number>) => Promise<
      [] | [string]
    >,
  'maintenance' : () => Promise<string>,
  'put' : (arg_0: Array<number>, arg_1: Array<number>) => Promise<bigint>,
  'put_and_fts_index' : (arg_0: Array<number>, arg_1: string) => Promise<
      bigint
    >,
  'remove_from_fts_index' : (arg_0: Array<number>, arg_1: string) => Promise<
      undefined
    >,
  'search' : (arg_0: string) => Promise<[bigint, Array<KeyValue>]>,
  'set_data_bucket_canister_wasm_binary' : (arg_0: Array<number>) => Promise<
      undefined
    >,
  'set_search_canister_wasm_binary' : (arg_0: Array<number>) => Promise<
      undefined
    >,
  'set_used_bytes_threshold' : (arg_0: number) => Promise<undefined>,
  'status' : () => Promise<string>,
}
