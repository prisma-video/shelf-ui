import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Char "mo:base/Char";
import Nat8 "mo:base/Nat8";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Option "mo:base/Option";

module {

  private let symbols = [
    '0', '1', '2', '3', '4', '5', '6', '7',
    '8', '9', 'a', 'b', 'c', 'd', 'e', 'f',
  ];
  private let base : Nat8 = 0x10;

  public func encode(array : [Nat8]) : Text {
    func nat8ToText(u8: Nat8) : Text {
      let c1 = symbols[Nat8.toNat((u8/base))];
      let c2 = symbols[Nat8.toNat((u8%base))];
      return Char.toText(c1) # Char.toText(c2);
    };
    Array.foldLeft<Nat8, Text>(array, "", func (accum, u8) {
      accum # nat8ToText(u8);
    });
  };
};