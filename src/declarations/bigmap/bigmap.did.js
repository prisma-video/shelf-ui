export const idlFactory = ({ IDL }) => {
  const KeyValue = IDL.Tuple(IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8));
  const KeyString = IDL.Tuple(IDL.Vec(IDL.Nat8), IDL.Text);
  return IDL.Service({
    'append' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [IDL.Nat64],
        [],
      ),
    'batch_put' : IDL.Func([IDL.Vec(KeyValue)], [IDL.Nat64], []),
    'batch_put_and_fts_index' : IDL.Func([IDL.Vec(KeyString)], [IDL.Nat64], []),
    'delete' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat64], []),
    'get' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    'get_random_key' : IDL.Func([], [IDL.Text], ['query']),
    'list' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    'lookup_data_bucket_for_get' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Text)],
        ['query'],
      ),
    'lookup_data_bucket_for_put' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Text)],
        ['query'],
      ),
    'maintenance' : IDL.Func([], [IDL.Text], []),
    'put' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)], [IDL.Nat64], []),
    'put_and_fts_index' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Text],
        [IDL.Nat64],
        [],
      ),
    'remove_from_fts_index' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Text], [], []),
    'search' : IDL.Func(
        [IDL.Text],
        [IDL.Tuple(IDL.Nat64, IDL.Vec(KeyValue))],
        ['query'],
      ),
    'set_data_bucket_canister_wasm_binary' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
    'set_search_canister_wasm_binary' : IDL.Func([IDL.Vec(IDL.Nat8)], [], []),
    'set_used_bytes_threshold' : IDL.Func([IDL.Nat32], [], []),
    'status' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
