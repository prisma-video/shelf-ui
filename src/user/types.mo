
import Principal "mo:base/Principal";


module {

    public type UserProfile = {
        userName: ?Text;
        emailAddress: ?Text;
        doubleOptIn: Bool;
        communities: ?[Text];
    };

    public type Role = {
        #admin;
        #ambassador;
        #authorized;
        #guest;
    };

    public type Permission = {
        #assign_role;
        #access;
        #lowest;
    };
}