import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Int "mo:base/Int";
import List "mo:base/List";
import Bool "mo:base/Bool";
import Hash "mo:base/Hash";

shared (install) actor class movieNFT(mintingAuthority: Principal) = this {
  
  public type Balance = Nat;
  public type TokenIndex = Nat32;
  private module TokenIndex = {
    public func equal(x : TokenIndex, y : TokenIndex) : Bool {
      return Nat32.equal(x, y);
    };
    public func hash(x : TokenIndex) : Hash.Hash {
      return x;
    };
  };
  
  public type CommonError = {
    #InvalidToken: TokenIndex;
    #Other : Text;
  };

  type TokenMetadata = {
    name : Text;
    description : Text;
    properties : {
      title : Text;
      internal_id : Text;
      shipment_id : Text;
      original_owner : Principal;
      metadata_version : Nat;
      previous_metadata : Text;
    };
  };

  //State work
  private stable var _ownersState : [(TokenIndex, Principal)] = [];
  private var _owners : HashMap.HashMap<TokenIndex, Principal> = HashMap.fromIter(_ownersState.vals(), 0, Nat32.equal, TokenIndex.hash);
	
  private stable var _balancesState : [(Principal, Nat)] = [];
  private var _balances : HashMap.HashMap<Principal, Nat> = HashMap.fromIter(_balancesState.vals(), 0, Principal.equal, Principal.hash);
	
  private stable var _tokenApprovalsState : [(TokenIndex, Principal)] = [];
  private var _tokenApprovals : HashMap.HashMap<TokenIndex, Principal> = HashMap.fromIter(_tokenApprovalsState.vals(), 0, Nat32.equal, TokenIndex.hash);
		
	private stable var _ownedTokenState : [(Principal, List.List<TokenIndex>)] = [];
  private var _ownedTokens : HashMap.HashMap<Principal, List.List<TokenIndex>> = HashMap.fromIter(_ownedTokenState.vals(), 0, Principal.equal, Principal.hash);
  
	private stable var _tokenMetadataState : [(TokenIndex, TokenMetadata)] = [];
  private var _tokenMetadata : HashMap.HashMap<TokenIndex, TokenMetadata> = HashMap.fromIter(_tokenMetadataState.vals(), 0, Nat32.equal, TokenIndex.hash);
  
  private stable var _supply : Balance  = 0;
  private stable var _mintingAuthority : Principal  = mintingAuthority;
  private stable var _nextTokenId : TokenIndex  = 0;


  //State functions
  system func preupgrade() {
    _ownersState := Iter.toArray(_owners.entries());
    _balancesState := Iter.toArray(_balances.entries());
    _tokenApprovalsState := Iter.toArray(_tokenApprovals.entries());
    _ownedTokenState := Iter.toArray(_ownedTokens.entries());
    _tokenMetadataState := Iter.toArray(_tokenMetadata.entries());
  };
  system func postupgrade() {
    _ownersState := [];
    _balancesState := [];
    _tokenApprovalsState := [];
    _ownedTokenState := [];
    _tokenMetadataState := [];
  };

  // ERC721 functions
  public shared query func balanceOf(owner: Principal) : async Nat {
    switch(_balances.get(owner)) {
      case (?_balance) {
				return _balance;
      };
      case (_) {
        return 0;
      };
    };
  };

	public query func ownerOf(token : TokenIndex) : async Result.Result<Principal, CommonError> {
    switch (_owners.get(token)) {
      case (?token_owner) {
				return #ok(token_owner);
				// return token_owner;
      };
      case (_) {
        // return Principal.null;
        return #err(#Other("1"));
      };
    };
	};

  // approve(to, tokenId)

  // setApprovalForAll(operator, _approved)

  // isApprovedForAll(owner, operator)

  // IERC721Enumerable
  public query func tokenOfOwnerByIndex(owner : Principal, index : Nat) : async ?TokenIndex {
    // assert(index < balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
    var balance : Nat = 0;
    switch(_balances.get(owner)) {
      case (?_balance) {
				 balance := _balance;
      };
      case (_) {};
    };
    assert(Nat.lessOrEqual(index, balance));
    assert(Nat.greater(balance, 0));
    switch(_ownedTokens.get(owner)) {
      case (?_tokens) {
				return List.get<TokenIndex>(_tokens, index);
      };
      case (_) {
        return null;
      };
    };
  };

  public query func totalSupply() : async Result.Result<Balance, CommonError> {
    #ok(_supply);
  };

  // tokenByIndex

	
  // Minting functions
  public query func getMinter() : async Principal {
    _mintingAuthority;
  };
  
	public shared(msg) func setMinter(minter : Principal) : async () {
		assert(msg.caller == _mintingAuthority);
		_mintingAuthority := minter;
	};

  public shared(msg) func mintMovieNFT(to : Principal, metadata : TokenMetadata) : async TokenIndex {
		assert(msg.caller == _mintingAuthority);
		// assert(to == _mintingAuthority); "ERC721: mint to the zero address")
		// assert(!_exists(tokenId));"ERC721: token already minted"
		// let md : Blob = Text.encodeUtf8(metadata);
		(await _mint(to, _nextTokenId, metadata));
	};

  private func _mint(to : Principal, token : TokenIndex, _data: TokenMetadata) : async TokenIndex {
    assert((await this._exists(token)) == false); // "ERC721: operator query for nonexistent token"
		_owners.put(token, to);
    // Update balances
    assert((await this._updateBalance(to, 1)) == #ok(1));
    // Update owned tokens
    switch(_ownedTokens.get(to)) {
      case (?_tokenList) {
				let res : ?List.List<TokenIndex> =_ownedTokens.replace(to, List.push<TokenIndex>(token, _tokenList));
      };
      case (_) {
        _ownedTokens.put(to, List.make<TokenIndex>(token));
      };
    };
    // Update metadata
		_tokenMetadata.put(token, _data);
		_supply := _supply + 1;
		_nextTokenId := _nextTokenId + 1;
    token
	};
  
  // Transfer functions

  public shared(msg) func transferFrom(from : Principal, to : Principal, token : TokenIndex) : async () {
    // Verify caller authorization
    assert((await this._isApprovedOrOwner(msg.caller, token)));
		
    await this._transfer(from, to, token);
  };

  public func getApproved(token : TokenIndex) : async Result.Result<Principal, CommonError> {
    assert(await this._exists(token)); // "ERC721: operator query for nonexistent token"

    switch (_tokenApprovals.get(token)) {
      case (?approved) {
				return #ok(approved);
      };
      case (_) {
        return #err(#Other("1"));
      };
    };
    
  };


  public func _isApprovedOrOwner(from : Principal, token : TokenIndex) : async Bool {
    assert(await this._exists(token)); // "ERC721: operator query for nonexistent token"
    let isOwner: Bool = ((await this.ownerOf(token)) == #ok(from));
    let isApproved = ((await this.getApproved(token)) == #ok(from));
    Bool.logor(isOwner, isApproved);
  };

  public func _transfer(from : Principal, to : Principal, token : TokenIndex) : async () {
    // Verify ownership
    assert((await this.ownerOf(token)) == #ok(from));
    // Verify ownership
    // assert(to != address(0));

    // Clear approvals from the previous owner
    // _approve(address(0), tokenId);

    // Update balances
    assert(Result.isOk(await this._updateBalance(from, -1)));
    assert(Result.isOk(await this._updateBalance(to, 1)));

    let res3 : ?Principal = _owners.replace(token, to);
  };


  // Utils

  public func _exists(token : TokenIndex) : async Bool {
    switch (_owners.get(token)) {
      case (?owner) {
				return true;
      };
      case (_) {
        return false;
      };
    };
  };
  
  public shared func _updateBalance(user : Principal, add: Int) : async Result.Result<Balance, CommonError> {
    assert(Int.notEqual(add, 0));
    switch(_balances.get(user)) {
      case (?_balance) {
        var newBalance : Nat = _balance;
        if(Int.equal(add, -1)) { newBalance := Nat.sub(_balance, 1) }
        else { newBalance := Nat.add(_balance, 1) };
        let res : ?Nat = _balances.replace(user, newBalance);
				return #ok(1);
      };
      case (_) {
        if(Int.equal(add, 1)) { _balances.put(user, 1); }
        else { _balances.put(user, 0); };
				return #ok(1);
      };
    };
  };
  
  public query func getOwners() : async [(TokenIndex, Principal)] {
    Iter.toArray(_owners.entries());
  };

  public query func getTokens() : async [(TokenIndex, TokenMetadata)] {
    Iter.toArray(_tokenMetadata.entries());
  };

  public query (msg) func getCaller() : async Principal {
    msg.caller
  };

  public query (msg) func getNFTsOfOwner() : async  Result.Result<[(TokenIndex, TokenMetadata)], CommonError> {
    var _tokens: [(TokenIndex, TokenMetadata)] = [];
    switch(_ownedTokens.get(msg.caller)) {
      case (?tokens) {
        for (token in Iter.fromList<TokenIndex>(tokens)) {
          switch(_tokenMetadata.get(token)) {
            case (?metadata) {
              _tokens := Array.append<(TokenIndex, TokenMetadata)>(_tokens, [(token, metadata)]);
            };
            case(_) {};
          };
        };
        return #ok(_tokens);
      };
      case (_) {
				return #ok([]);
      };
    };
    
    // Iter.toArray(HashMap.mapFilter(_tokenMetadata, ExtCore.TokenIndex.equal, ExtCore.TokenIndex.hash, ).entries());
  }; //tokenOfOwnerByIndex

  // public query func metadata(token : TokenIndex) : async Result.Result<Blob, CommonError> {
  //   if (ExtCore.TokenIdentifier.isPrincipal(token, Principal.fromActor(this)) == false) {
	// 		return #err(#InvalidToken(token));
	// 	};
	// 	let tokenind = ExtCore.TokenIdentifier.getIndex(token);
  //   switch (_tokenMetadata.get(tokenind)) {
  //     case (?token_metadata) {
	// 			return #ok(token_metadata);
  //     };
  //     case (_) {
  //       return #err(#InvalidToken(token));
  //     };
  //   };
  // };
  
  //Internal cycle management - good general case
  public func acceptCycles() : async () {
    let available = Cycles.available();
    let accepted = Cycles.accept(available);
    assert (accepted == available);
  };
  public query func availableCycles() : async Nat {
    return Cycles.balance();
  };
}