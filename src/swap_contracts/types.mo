
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";
import Hash "mo:base/Hash";

import NftTypes "../nft/types";

module {

    public type SalesContractId = Nat32;

    public module SalesContractId = {
        public func equal(x : SalesContractId, y : SalesContractId) : Bool {
        return Nat32.equal(x, y);
        };
        public func hash(x : SalesContractId) : Hash.Hash {
        return x;
        };
    };

    public type Reservation = {
        user: Principal;
        fromDate: Time.Time;
        toDate: Time.Time;
    };
    
    public type SalesTypes = {
        #automatic;
        #manual;
        #undefined;
    };

    public type SalesContractStatus = {
        #pending;
        #blocked;
        #rejected;
        #approved;
    };

    public type SalesOffer = {
        nft: NftTypes.TokenIndex;
        purchasePrice: Nat32;
    };

    public type SalesContract = {
        buyer: Principal;
        seller: Principal;
        nft: NftTypes.TokenIndex;
        purchasePrice: Nat32;
        status: SalesContractStatus;
        offerDate: Time.Time;
        executionDate: Time.Time;
        executionType: SalesTypes;
    };

    
}