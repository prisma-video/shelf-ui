import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Nat "mo:base/Nat";
import Int "mo:base/Int";
// import List "mo:base/List";
import Bool "mo:base/Bool";

import Types "./types";

// shared (install) actor class movieNFT(mintingAuthority: Principal) = this {
// shared (install) actor class movieNFT() = this {
actor movieNFT {
  
  type Balance = Types.Balance;
  type TokenIndex = Types.TokenIndex;
  type TokenMetadata = Types.TokenMetadata;
  type CommonError = Types.CommonError;
  type UpdateOwnedTokenTypes = Types.UpdateOwnedTokenTypes;

  //State work
  private stable var _ownersState : [(TokenIndex, Principal)] = [];
  private var _owners : HashMap.HashMap<TokenIndex, Principal> = HashMap.fromIter(_ownersState.vals(), 0, Types.TokenIndex.equal, Types.TokenIndex.hash);
	
  private stable var _balancesState : [(Principal, Nat)] = [];
  private var _balances : HashMap.HashMap<Principal, Nat> = HashMap.fromIter(_balancesState.vals(), 0, Principal.equal, Principal.hash);
	
  private stable var _tokenApprovalsState : [(TokenIndex, Principal)] = [];
  private var _tokenApprovals : HashMap.HashMap<TokenIndex, Principal> = HashMap.fromIter(_tokenApprovalsState.vals(), 0, Types.TokenIndex.equal, Types.TokenIndex.hash);
		
	private stable var _ownedTokenState : [(Principal, [TokenIndex])] = [];
  private var _ownedTokens : HashMap.HashMap<Principal, [TokenIndex]> = HashMap.fromIter(_ownedTokenState.vals(), 0, Principal.equal, Principal.hash);
  
	private stable var _tokenMetadataState : [(TokenIndex, TokenMetadata)] = [];
  private var _tokenMetadata : HashMap.HashMap<TokenIndex, TokenMetadata> = HashMap.fromIter(_tokenMetadataState.vals(), 0, Types.TokenIndex.equal, Types.TokenIndex.hash);
  
  private stable var _supply : Balance  = 0;
  // private stable var _mintingAuthority : Principal  = mintingAuthority;
  private stable var _mintingAuthority : Principal  =  Principal.fromText("mcnes-wkvkd-habbb-sctde-hwuhr-adhwb-y24aj-p2ppe-2bgva-sfvb2-5ae");
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
  // public query func tokenOfOwnerByIndex(owner : Principal, index : Nat) : async ?TokenIndex {
  //   // assert(index < balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
  //   var balance : Nat = 0;
  //   switch(_balances.get(owner)) {
  //     case (?_balance) {
	// 			 balance := _balance;
  //     };
  //     case (_) {};
  //   };
  //   assert(Nat.lessOrEqual(index, balance));
  //   assert(Nat.greater(balance, 0));
  //   switch(_ownedTokens.get(owner)) {
  //     case (?_tokens) {
	// 			return List.get<TokenIndex>(_tokens, index);
  //     };
  //     case (_) {
  //       return null;
  //     };
  //   };
  // };

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
		(await _mint(to, _nextTokenId, metadata));
	};

  private func _mint(to : Principal, token : TokenIndex, _data: TokenMetadata) : async TokenIndex {
    assert((await movieNFT._exists(token)) == false); // "ERC721: operator query for nonexistent token"
		_owners.put(token, to);
    // Update balances
    assert((await movieNFT._updateBalance(to, 1)) == #ok(1));
    // Update owned tokens
    await _updateOwnedTokens(to, token, #Add);
    // Update metadata
		_tokenMetadata.put(token, _data);
		_supply := _supply + 1;
		_nextTokenId := _nextTokenId + 1;
    token
	};
  
  // Transfer functions

  public shared(msg) func transferFrom(from : Principal, to : Principal, token : TokenIndex) : async () {
    // Verify caller authorization
    assert((await movieNFT._isApprovedOrOwner(msg.caller, token)));
		
    await movieNFT._transfer(from, to, token);
  };

  public func getApproved(token : TokenIndex) : async Result.Result<Principal, CommonError> {
    assert(await movieNFT._exists(token)); // "ERC721: operator query for nonexistent token"

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
    assert(await movieNFT._exists(token)); // "ERC721: operator query for nonexistent token"
    let isOwner: Bool = ((await movieNFT.ownerOf(token)) == #ok(from));
    let isApproved = ((await movieNFT.getApproved(token)) == #ok(from));
    Bool.logor(isOwner, isApproved);
  };


  // TODO: private
  public func _transfer(from : Principal, to : Principal, token : TokenIndex) : async () {
    // Verify ownership
    // assert(to != address(0));

    // Clear approvals from the previous owner
    // _approve(address(0), tokenId);

    // private func testToken(t: TokenIndex, token: TokenIndex): Bool {Types.TokenIndex.equal(t, token)};
    // Update balances
    assert(Result.isOk(await movieNFT._updateBalance(from, -1)));
    assert(Result.isOk(await movieNFT._updateBalance(to, 1)));

    _owners.put(token, to);
    // Update _ownedTokens of seller
    await _updateOwnedTokens(from, token, #Remove);
    // Update _ownedTokens of buyer
    await _updateOwnedTokens(to, token, #Add);
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
        var newBalance : Balance = _balance;
        if(Int.equal(add, -1)) { newBalance := Nat.sub(_balance, 1) }
        else { newBalance := Nat.add(_balance, 1) };
        _balances.put(user, newBalance);
				return #ok(1);
      };
      case (_) {
        if(Int.equal(add, 1)) { _balances.put(user, 1); }
        else { _balances.put(user, 0); };
				return #ok(1);
      };
    };
  };

  public shared func _updateOwnedTokens(user : Principal, token: TokenIndex, mode: UpdateOwnedTokenTypes) : async () {
      switch(_ownedTokens.get(user)) {
      case (?_tokenList) {
        if(mode == #Add) {
          _ownedTokens.put(user, Array.append<TokenIndex>([token], _tokenList));
        } else {
          _ownedTokens.put(user, Array.filter<TokenIndex>(_tokenList, func(t) { return (Types.TokenIndex.equal(t, token) == false) } ));
        };
      };
      case (_) {
        if(mode == #Add) {
          _ownedTokens.put(user, Array.make<TokenIndex>(token));
        };
      };
    };
  };

  // Getters

  public query func getOwners() : async [(TokenIndex, Principal)] {
    Iter.toArray(_owners.entries());
  };

  public query func getOwnerships() : async [(Principal, [TokenIndex])] {
    Iter.toArray(_ownedTokens.entries());
  };

  public query func getTokens() : async [(TokenIndex, TokenMetadata)] {
    Iter.toArray(_tokenMetadata.entries());
  };

  public query (msg) func getCaller() : async Text {
    Principal.toText(msg.caller);
  };

  public query func getNFT(token: TokenIndex) : async ?Principal {
    _owners.get(token);
  };

  public query (msg) func getNFTsOfOwner() : async [(TokenIndex, TokenMetadata)] {
    var _tokens: [(TokenIndex, TokenMetadata)] = [];
    switch(_ownedTokens.get(msg.caller)) {
      case (?tokens) {
        for (token in Iter.fromArray<TokenIndex>(tokens)) {
          switch(_tokenMetadata.get(token)) {
            case (?metadata) {
              _tokens:= Array.append<(TokenIndex, TokenMetadata)>(_tokens, [(token, metadata)]);
            };
            case(_) {};
          };
        };
        return _tokens;
      };
      case (_) {return _tokens;}
      };
  };

  public query (msg) func getNFTsOfOwner3(user: Principal) : async  Result.Result<[TokenIndex], CommonError> {
    var _tokens: [(TokenIndex, TokenMetadata)] = [];
    switch(_ownedTokens.get(user)) {
      case (?tokens) {
        return #ok(tokens);
      };
      case (_) {
				return #ok([]);
      };
    };
  };

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