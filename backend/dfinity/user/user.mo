// Import base modules
import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import List "mo:base/List";
import Iter "mo:base/Iter";

import Types "./types";

actor user {

    type UserProfile = Types.UserProfile;
    type Role = Types.Role;
    type Permission = Types.Permission;

    //State work
    private stable var _userDatabaseState : [(Principal, UserProfile)] = [];
    private var _userDatabase : HashMap.HashMap<Principal, UserProfile> = HashMap.fromIter(_userDatabaseState.vals(), 0, Principal.equal, Principal.hash);
	
    private stable var _rolesState : [(Principal, Role)] = [];
    private var _roles : HashMap.HashMap<Principal, Role> = HashMap.fromIter(_rolesState.vals(), 0, Principal.equal, Principal.hash);

    private stable var _subscriptionsState : [(Principal, Role)] = [];
    private var _subscriptions : HashMap.HashMap<Principal, Role> = HashMap.fromIter(_subscriptionsState.vals(), 0, Principal.equal, Principal.hash);

    //State functions
    system func preupgrade() {
        _userDatabaseState := Iter.toArray(_userDatabase.entries());
        _subscriptionsState := Iter.toArray(_subscriptions.entries());
        _rolesState := Iter.toArray(_roles.entries());
    };
    system func postupgrade() {
        _userDatabaseState := [];
        _subscriptionsState := [];
        _rolesState := [];
    };

    // User & Profile functions
    public shared(msg) func createNewUser(profile: UserProfile) : async () {
        _userDatabase.put(msg.caller, profile);
        _roles.put(msg.caller, #guest);
    };

    public shared(msg) func updateUserProfile(profile: UserProfile) : async () {
        _userDatabase.put(msg.caller, profile);
    };

    func getProfile(user: Principal) : ?UserProfile {
        _userDatabase.get(user);
    };

    public shared(msg) func getUserProfile() : async ?UserProfile {
        return getProfile(msg.caller);
    };

    // Role & Permission functions
    func getRole(user: Principal) : ?Role {
        _roles.get(user);
    };

    public shared({ caller }) func getUserRole() : async ?Role {
        return getRole(caller);
    };

    func has_permission(pal: Principal, perm : Permission) : Bool {
        switch (getRole(pal), perm) {
            case (?#admin, _) true;
            case (?#ambassador or ?#authorized, #access) true;
            case (_, _) false;
        }
    };

    // Reject unauthorized user identities
    func require_permission(pal: Principal, perm: Permission) : async () {
        if ( has_permission(pal, perm) == false ) {
            throw Error.reject( "unauthorized" );
        }
    };

    // Assign a new role to a principal
    public shared({ caller }) func assign_role(assignee: Principal, new_role: Role ) : async () {
        await require_permission(caller, #assign_role );

        if (new_role == #admin) {
            throw Error.reject( "Cannot assign anyone to be the admin" );
        };
        _roles.put(assignee, new_role);
    };

    // Subcription methods
    public shared({ caller }) func updateSubscriptionPlan(user: Principal, new_role: Role ) : async () {
        await require_permission(caller, #assign_role );

        if (new_role == #admin) {
            throw Error.reject( "Cannot assign anyone to be the admin" );
        };
        _roles.put(assignee, new_role);
    };


};