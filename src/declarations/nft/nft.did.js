export const idlFactory = ({ IDL }) => {
  const TokenIndex = IDL.Nat32;
  const Balance = IDL.Nat;
  const TokenIndex__1 = IDL.Nat32;
  const CommonError = IDL.Variant({
    'InvalidToken' : TokenIndex__1,
    'Other' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : Balance, 'err' : CommonError });
  const UpdateOwnedTokenTypes = IDL.Variant({
    'Add' : IDL.Null,
    'Remove' : IDL.Null,
  });
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
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(TokenIndex),
    'err' : CommonError,
  });
  return IDL.Service({
    '_exists' : IDL.Func([TokenIndex], [IDL.Bool], []),
    '_isApprovedOrOwner' : IDL.Func(
        [IDL.Principal, TokenIndex],
        [IDL.Bool],
        [],
      ),
    '_transfer' : IDL.Func([IDL.Principal, IDL.Principal, TokenIndex], [], []),
    '_updateBalance' : IDL.Func([IDL.Principal, IDL.Int], [Result], []),
    '_updateOwnedTokens' : IDL.Func(
        [IDL.Principal, TokenIndex, UpdateOwnedTokenTypes],
        [],
        [],
      ),
    'acceptCycles' : IDL.Func([], [], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getApproved' : IDL.Func([TokenIndex], [Result_1], []),
    'getCaller' : IDL.Func([], [IDL.Text], ['query']),
    'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
    'getNFT' : IDL.Func([TokenIndex], [IDL.Opt(IDL.Principal)], ['query']),
    'getNFTsOfOwner' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, TokenMetadata))],
        ['query'],
      ),
    'getNFTsOfOwner3' : IDL.Func([IDL.Principal], [Result_2], ['query']),
    'getOwners' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Principal))],
        ['query'],
      ),
    'getOwnerships' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(TokenIndex)))],
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
    'totalSupply' : IDL.Func([], [Result], ['query']),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, TokenIndex],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
