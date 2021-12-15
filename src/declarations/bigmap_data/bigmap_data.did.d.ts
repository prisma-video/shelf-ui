import type { Principal } from '@dfinity/principal';
export type KeyValue = [Array<number>, Array<number>];
export interface _SERVICE {
  'append' : (arg_0: Array<number>, arg_1: Array<number>) => Promise<bigint>,
  'append_from_index' : (arg_0: Array<number>, arg_1: Array<number>) => Promise<
      bigint
    >,
  'batch_put' : (arg_0: Array<KeyValue>) => Promise<bigint>,
  'delete' : (arg_0: Array<number>) => Promise<bigint>,
  'get' : (arg_0: Array<number>) => Promise<[] | [Array<number>]>,
  'get_random_key' : () => Promise<string>,
  'holds_key' : (arg_0: Array<number>) => Promise<boolean>,
  'list' : (arg_0: Array<number>) => Promise<Array<Array<number>>>,
  'put' : (arg_0: Array<number>, arg_1: Array<number>) => Promise<bigint>,
  'seed_random_data' : (arg_0: number, arg_1: number) => Promise<Array<string>>,
  'set_range' : (arg_0: Array<number>, arg_1: Array<number>) => Promise<
      undefined
    >,
  'used_bytes' : () => Promise<bigint>,
}
