// Import base modules
import movieNFT "canister:nft";
// import movieNFT "movieNFT";

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Error "mo:base/Error";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat32 "mo:base/Nat32";

import NftTypes "../nft/types";
import Types "./types";


actor swap_contracts {

    type SalesContractId = Types.SalesContractId;
    type SalesContract = Types.SalesContract;
    type SalesTypes = Types.SalesTypes;
    type SalesContractStatus = Types.SalesContractStatus;
    type SalesOffer = Types.SalesOffer;
    type Reservation = Types.Reservation;
    type TokenIndex = NftTypes.TokenIndex;

    //State work
    private stable var _salesContractsState : [(SalesContractId, SalesContract)] = [];
    private var _salesContracts : HashMap.HashMap<SalesContractId, SalesContract> = HashMap.fromIter(_salesContractsState.vals(), 0, Types.SalesContractId.equal, Types.SalesContractId.hash);
	
    private stable var _reservationsState : [(TokenIndex, Reservation)] = [];
    private var _reservations : HashMap.HashMap<TokenIndex, Reservation> = HashMap.fromIter(_reservationsState.vals(), 0, NftTypes.TokenIndex.equal, NftTypes.TokenIndex.hash);
	
    private stable var _failedReservationsState : [(TokenIndex, Reservation)] = [];
    private var _failedReservations : HashMap.HashMap<TokenIndex, Reservation> = HashMap.fromIter(_failedReservationsState.vals(), 0, NftTypes.TokenIndex.equal, NftTypes.TokenIndex.hash);
	
    private stable var _totalCount : Nat32  = 0;
    private stable var _totalSuccessCount : Nat32  = 0;
    private stable var _nextSalesId : SalesContractId  = 0;

    //State functions
    system func preupgrade() {
        _salesContractsState := Iter.toArray(_salesContracts.entries());
        _reservationsState := Iter.toArray(_reservations.entries());
        _failedReservationsState := Iter.toArray(_failedReservations.entries());
    };

    system func postupgrade() {
        _salesContractsState := [];
        _reservationsState := [];
        _failedReservationsState := [];
    };

    //
    // Reservations functions
    //
    public shared(msg) func requestReservation(token: TokenIndex) : async Bool {
        // Get token reservation data
        let newReservation = _buildReservation(msg.caller);
        if(_isRevervationAvailable(msg.caller, _reservations.get(token))) {
            _reservations.put(token, newReservation);
            return true;
        } else {
            _failedReservations.put(token, newReservation);
            return false;
        };
    };

    private func _isRevervationAvailable(user: Principal, reservation: ?Reservation) : Bool {
        switch(reservation) {
            case (?_reservation) {
                // Check if reservation is valid
                if(_reservation.user == user) {
                    return true;
                } else if (Int.less(_reservation.toDate, Time.now())) {
                    return true;
                } else {
                    return false;
                };
            };
            case (_) {
                return true;
            };
        };
    };

    private func _buildReservation(user: Principal) : Reservation {
        return {
            user= user;
            fromDate= Time.now();
            toDate= Int.add(Time.now(), 18_000_000); // 5h
        }
    };

    public shared(msg) func getReservationAvailability(token: TokenIndex) : async Bool {
        return _isRevervationAvailable(msg.caller, _reservations.get(token))
    };

    //
    // Sales contracts functions
    //

    public shared(msg) func makeOffer(offer: SalesOffer) : async SalesContractId {
        // TODO: Check no similar sales order in pending
        // TODO: Check buyer/seller situation
        assert(Nat32.greater(offer.purchasePrice, 0));

        // Check NFT exists
        assert(await movieNFT._exists(offer.nft));

        switch(await movieNFT.getNFT(offer.nft)) {
            case (?_owner) {
                let offerId = _nextSalesId;
                let contract: SalesContract = {
                    buyer= msg.caller;
                    seller= _owner;
                    nft= offer.nft;
                    purchasePrice= offer.purchasePrice;
                    status= #pending;
                    offerDate= Time.now();
                    executionDate= 0;
                    executionType=#undefined;
                };
                _salesContracts.put(offerId, contract);
                _totalCount := _totalCount + 1;
                _nextSalesId := _nextSalesId + 1;
                return offerId;
            };
            case (_) {
                return 0;
            };
        };
    };

    public query func getOffer(offerId: SalesContractId) : async ?SalesContract {
        _salesContracts.get(offerId);
    };
    // public shared(msg) func approveOffer(offerId: SalesContractId) : async Bool {
    // };

    public shared(msg) func executeSalesOrder(offerId: SalesContractId) : async Bool {
        // TODO: Check if nft is automatically transferable
        // Check msg.caller == nft owner
        switch(_salesContracts.get(offerId)) {
            case (?offer) {
                let finalOffer: SalesContract = {
                    buyer= offer.buyer;
                    seller= offer.seller;
                    nft= offer.nft;
                    purchasePrice= offer.purchasePrice;
                    status= #approved;
                    offerDate= offer.offerDate;
                    executionDate=Time.now();
                    executionType=#automatic;
                };
                _salesContracts.put(offerId, finalOffer);
                // Replace with transferFrom avec implmentation approval role
                await movieNFT._transfer(finalOffer.seller, finalOffer.buyer, finalOffer.nft);
                return true;
            };
            case (_) {
                return false;
            };
        };
    };
};