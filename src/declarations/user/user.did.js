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
  });
  const user = IDL.Service({
    'assign_role' : IDL.Func([IDL.Principal, Role], [], []),
    'createNewUser' : IDL.Func([], [], []),
    'getUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], []),
    'getUserRole' : IDL.Func([], [IDL.Opt(Role)], []),
  });
  return user;
};
export const init = ({ IDL }) => { return []; };
