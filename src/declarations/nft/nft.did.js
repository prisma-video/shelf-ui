export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const TokenIndex = IDL.Nat32;
  const Balance = IDL.Nat;
  const TokenIndex__1 = IDL.Nat32;
  const CommonError = IDL.Variant({
    'InvalidToken' : TokenIndex__1,
    'Other' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : Balance, 'err' : CommonError });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : CommonError });
  const TokenMetadata = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Text,
    'properties' : IDL.Record({
      'title' : IDL.Text,
      'original_owner' : IDL.Principal,
      'internal_id' : IDL.Text,
      'shipment_id' : IDL.Text,
      'previous_metadata' : IDL.Text,
      'metadata_version' : IDL.Nat,
    }),
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(TokenIndex, TokenMetadata)),
    'err' : CommonError,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(TokenIndex),
    'err' : CommonError,
  });
  List.fill(IDL.Opt(IDL.Tuple(TokenIndex, List)));
  return IDL.Service({
    '_exists' : IDL.Func([TokenIndex], [IDL.Bool], []),
    '_isApprovedOrOwner' : IDL.Func(
        [IDL.Principal, TokenIndex],
        [IDL.Bool],
        [],
      ),
    '_transfer' : IDL.Func([IDL.Principal, IDL.Principal, TokenIndex], [], []),
    '_updateBalance' : IDL.Func([IDL.Principal, IDL.Int], [Result], []),
    'acceptCycles' : IDL.Func([], [], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getApproved' : IDL.Func([TokenIndex], [Result_1], []),
    'getCaller' : IDL.Func([], [IDL.Text], ['query']),
    'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
    'getNFT' : IDL.Func([TokenIndex], [IDL.Opt(IDL.Principal)], ['query']),
    'getNFTsOfOwner' : IDL.Func([], [Result_3], ['query']),
    'getNFTsOfOwner2' : IDL.Func([], [Result_2], ['query']),
    'getOwners' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Principal))],
        ['query'],
      ),
    'getOwnerships' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, List))],
        ['query'],
      ),
    'getTokens' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, TokenMetadata))],
        ['query'],
      ),
    'mintMovieNFT' : IDL.Func([IDL.Principal, TokenMetadata], [TokenIndex], []),
    'ownerOf' : IDL.Func([TokenIndex], [Result_1], ['query']),
    'setMinter' : IDL.Func([IDL.Principal], [], []),
    'tokenOfOwnerByIndex' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [IDL.Opt(TokenIndex)],
        ['query'],
      ),
    'totalSupply' : IDL.Func([], [Result], ['query']),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, TokenIndex],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
