export const idlFactory = ({ IDL }) => {
  const KeyValue = IDL.Tuple(IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8));
  return IDL.Service({
    'append' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [IDL.Nat64],
        [],
      ),
    'append_from_index' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [IDL.Nat64],
        [],
      ),
    'batch_put' : IDL.Func([IDL.Vec(KeyValue)], [IDL.Nat64], []),
    'delete' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Nat64], []),
    'get' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Opt(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    'get_random_key' : IDL.Func([], [IDL.Text], ['query']),
    'holds_key' : IDL.Func([IDL.Vec(IDL.Nat8)], [IDL.Bool], []),
    'list' : IDL.Func(
        [IDL.Vec(IDL.Nat8)],
        [IDL.Vec(IDL.Vec(IDL.Nat8))],
        ['query'],
      ),
    'put' : IDL.Func([IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)], [IDL.Nat64], []),
    'seed_random_data' : IDL.Func(
        [IDL.Nat32, IDL.Nat32],
        [IDL.Vec(IDL.Text)],
        [],
      ),
    'set_range' : IDL.Func(
        [IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [],
        ['oneway'],
      ),
    'used_bytes' : IDL.Func([], [IDL.Nat64], []),
  });
};
export const init = ({ IDL }) => { return []; };
