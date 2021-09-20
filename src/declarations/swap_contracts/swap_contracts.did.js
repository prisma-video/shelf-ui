export const idlFactory = ({ IDL }) => {
  const SalesContractId = IDL.Nat32;
  const TokenIndex__1 = IDL.Nat32;
  const Time = IDL.Int;
  const SalesContractStatus = IDL.Variant({
    'pending' : IDL.Null,
    'blocked' : IDL.Null,
    'approved' : IDL.Null,
    'rejected' : IDL.Null,
  });
  const SalesTypes = IDL.Variant({
    'automatic' : IDL.Null,
    'undefined' : IDL.Null,
    'manual' : IDL.Null,
  });
  const SalesContract = IDL.Record({
    'nft' : TokenIndex__1,
    'offerDate' : Time,
    'status' : SalesContractStatus,
    'purchasePrice' : IDL.Nat32,
    'seller' : IDL.Principal,
    'buyer' : IDL.Principal,
    'executionDate' : Time,
    'executionType' : SalesTypes,
  });
  const TokenIndex = IDL.Nat32;
  const SalesOffer = IDL.Record({
    'nft' : TokenIndex__1,
    'purchasePrice' : IDL.Nat32,
  });
  return IDL.Service({
    'executeSalesOrder' : IDL.Func([SalesContractId], [IDL.Bool], []),
    'getOffer' : IDL.Func(
        [SalesContractId],
        [IDL.Opt(SalesContract)],
        ['query'],
      ),
    'getReservationAvailability' : IDL.Func([TokenIndex], [IDL.Bool], []),
    'makeOffer' : IDL.Func([SalesOffer], [SalesContractId], []),
    'requestReservation' : IDL.Func([TokenIndex], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
