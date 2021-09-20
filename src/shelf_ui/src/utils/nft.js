import { nft as movieNFT} from "../../../declarations/nft/index";

export async function listNFTs() {
  const list = await movieNFT.getTokens();
  if (list) {
    return list;
  } else {
    return null;
  }
}

export async function listMyNFTs() {
  const list = await movieNFT.getNFTsOfOwner();
  if (list) {
    return list;
  } else {
    return null;
  }
}

export async function getCaller() {
  const list = await movieNFT.getCaller();
  if (list) {
    return list;
  } else {
    return null;
  }
}
