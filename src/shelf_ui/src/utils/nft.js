// import { nft as movieNFT, idlFactory, canisterId} from "../dfinity/declarations/nft/index";
import { nft as movieNFT} from "../../../declarations/nft/index";
// import { actorController } from "../dfinity/declarations/nft/index";

import { unwrap } from "./index";

// import { Actor, HttpAgent } from "@dfinity/agent";


// const host = "http://127.0.0.1:8000/";
// function createActor(identity) {
//   const agent = new HttpAgent({ host, identity });
//   const actor = Actor.createActor(idlFactory, {
//     agent,
//     canisterId: canisterId,
//   });
//   return { actor, agent };
// }

// class ActorController {
//   _isAuthenticated=false;

//   constructor() {
//     this._actor = this.initBaseActor();
//   }

//   async initBaseActor(identity) {
//     const { agent, actor } = createActor(identity);
//     // The root key only has to be fetched for local development environments
//     // if (isLocalEnv) {
//     //   await agent.fetchRootKey();
//     // }
//     await agent.fetchRootKey();
//     return actor;
//   }

//   /*
//    * Get the actor instance to run commands on the canister.
//    */
//   get actor() {
//     return this._actor;
//   }

//   /*
//    * Once a user has authenticated and has an identity pass this identity
//    * to create a new actor with it, so they pass their Principal to the backend.
//    */
//   async authenticateActor(identity) {
//     this._actor = this.initBaseActor(identity);
//     this._isAuthenticated = true;
//   }

//   /*
//    * If a user unauthenticates, recreate the actor without an identity.
//    */
//   unauthenticateActor() {
//     this._actor = this.initBaseActor();
//     this._isAuthenticated = false;
//   }
// }
// const actorController = new ActorController();



export async function listMyNFTs() {
  const list = unwrap(await movieNFT.getNFTsOfOwner());
  if (list) {
    return list;
  } else {
    return null;
  }
};


export async function listNFTs() {
  const list = unwrap(await movieNFT.getTokens());
  if (list) {
    return list;
  } else {
    return null;
  }
};

