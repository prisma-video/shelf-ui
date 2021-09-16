export const idlFactory = ({ IDL }) => {
  const TokenIdentifier = IDL.Text;
  const AccountIdentifier = IDL.Text;
  const User = IDL.Variant({
    'principal' : IDL.Principal,
    'address' : AccountIdentifier,
  });
  const AllowanceRequest = IDL.Record({
    'token' : TokenIdentifier,
    'owner' : User,
    'spender' : IDL.Principal,
  });
  const Balance__1 = IDL.Nat;
  const CommonError = IDL.Variant({
    'InvalidToken' : TokenIdentifier,
    'Other' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : Balance__1, 'err' : CommonError });
  const SubAccount = IDL.Vec(IDL.Nat8);
  const Balance = IDL.Nat;
  const ApproveRequest = IDL.Record({
    'token' : TokenIdentifier,
    'subaccount' : IDL.Opt(SubAccount),
    'allowance' : Balance,
    'spender' : IDL.Principal,
  });
  const BalanceRequest = IDL.Record({
    'token' : TokenIdentifier,
    'user' : User,
  });
  const CommonError__1 = IDL.Variant({
    'InvalidToken' : TokenIdentifier,
    'Other' : IDL.Text,
  });
  const BalanceResponse = IDL.Variant({
    'ok' : Balance,
    'err' : CommonError__1,
  });
  const TokenIndex = IDL.Nat32;
  const AccountIdentifier__1 = IDL.Text;
  const TokenIdentifier__1 = IDL.Text;
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Nat8),
    'err' : CommonError,
  });
  const Result_1 = IDL.Variant({
    'ok' : AccountIdentifier__1,
    'err' : CommonError,
  });
  const Memo = IDL.Vec(IDL.Nat8);
  const TransferRequest = IDL.Record({
    'to' : User,
    'token' : TokenIdentifier,
    'notify' : IDL.Bool,
    'from' : User,
    'memo' : Memo,
    'subaccount' : IDL.Opt(SubAccount),
    'amount' : Balance,
  });
  const TransferResponse = IDL.Variant({
    'ok' : Balance,
    'err' : IDL.Variant({
      'CannotNotify' : AccountIdentifier,
      'InsufficientBalance' : IDL.Null,
      'InvalidToken' : TokenIdentifier,
      'Rejected' : IDL.Null,
      'Unauthorized' : AccountIdentifier,
      'Other' : IDL.Text,
    }),
  });
  const movieNFT = IDL.Service({
    'acceptCycles' : IDL.Func([], [], []),
    'allowance' : IDL.Func([AllowanceRequest], [Result], ['query']),
    'approve' : IDL.Func([ApproveRequest], [], []),
    'availableCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'balance' : IDL.Func([BalanceRequest], [BalanceResponse], ['query']),
    'getAllowances' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Principal))],
        ['query'],
      ),
    'getCaller' : IDL.Func([], [IDL.Principal], ['query']),
    'getMinter' : IDL.Func([], [IDL.Principal], ['query']),
    'getNFTsOfOwner' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Principal))],
        ['query'],
      ),
    'getRegistry' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
        ['query'],
      ),
    'getTokens' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Vec(IDL.Nat8)))],
        ['query'],
      ),
    'metadata' : IDL.Func([TokenIdentifier__1], [Result_2], ['query']),
    'mintNFT' : IDL.Func([IDL.Principal, IDL.Text], [TokenIndex], []),
    'ownerOf' : IDL.Func([TokenIdentifier__1], [Result_1], ['query']),
    'setMinter' : IDL.Func([IDL.Principal], [], []),
    'totalSupply' : IDL.Func([TokenIdentifier__1], [Result], ['query']),
    'transferFrom' : IDL.Func([TransferRequest], [TransferResponse], []),
  });
  return movieNFT;
};
export const init = ({ IDL }) => { return [IDL.Principal]; };
