
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";

module {
  public type Balance = Nat;
  public type TokenIndex = Nat32;
  public module TokenIndex = {
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

  public type TokenMetadata = {
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

  public type UpdateOwnedTokenTypes = {
    #Add;
    #Remove;
  };

}