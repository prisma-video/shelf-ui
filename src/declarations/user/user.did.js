export const idlFactory = ({ IDL }) => {
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'authorized' : IDL.Null,
    'guest' : IDL.Null,
    'ambassador' : IDL.Null,
  });
  const UserProfile = IDL.Record({
    'userName' : IDL.Opt(IDL.Text),
    'communities' : IDL.Opt(IDL.Vec(IDL.Text)),
    'doubleOptIn' : IDL.Bool,
    'emailAddress' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Opt(IDL.Text),
    'firstName' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'assign_role' : IDL.Func([IDL.Principal, Role], [], []),
    'createNewUser' : IDL.Func([UserProfile], [], []),
    'getUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], []),
    'getUserRole' : IDL.Func([], [IDL.Opt(Role)], []),
    'updateUserProfile' : IDL.Func([UserProfile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
