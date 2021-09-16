export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'authorized' : IDL.Null,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(IDL.Principal, Role), List)));
  const anon_class_6_1 = IDL.Service({
    'assign_role' : IDL.Func([IDL.Principal, IDL.Opt(Role)], [], []),
    'callerPrincipal' : IDL.Func([], [IDL.Principal], []),
    'get_role_requests' : IDL.Func([], [List], []),
    'get_roles' : IDL.Func([], [List], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'my_role' : IDL.Func([], [IDL.Opt(Role)], []),
    'my_role_request' : IDL.Func([], [IDL.Opt(Role)], []),
    'request_role' : IDL.Func([Role], [IDL.Principal], []),
  });
  return anon_class_6_1;
};
export const init = ({ IDL }) => { return []; };
