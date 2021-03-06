const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const exec = require('child_process').execSync;
const { Crypto } = require("node-webcrypto-ossl");

global.crypto = new Crypto();

const decode = s => (new TextDecoder()).decode(s);

const { networks } = require("../dfx.json");
console.log(networks);
const DEFAULT_HOST = networks.local.bind;
const OUTPUT_DIR = './output/';
const {
  generateKeyPair,
  HttpAgent,
  makeActorFactory,
  makeAuthTransform,
  makeNonceTransform,
  Principal
} = require('@dfinity/agent');

// Main

const main = async () => {
  console.log("Adding profiles...");
  const profiles = require("./data");
  profiles.forEach(async (profile) => {
    const nft = getActor("nft");
    await nft.create(profile);
    console.log("...profile added");
  });
};

// Helpers

const getActor = (
  canisterName,
  host = DEFAULT_HOST,
  keypair = generateKeyPair()
) => {
  const candid = eval(getCandid(canisterName));
  const canisterId = getCanisterId(canisterName);
  const principal = Principal.selfAuthenticating(keypair.publicKey)
  const agent = new HttpAgent({ fetch, host, principal });
  agent.addTransform(makeNonceTransform());
  agent.addTransform(makeAuthTransform(keypair));
  return makeActorFactory(candid)({ canisterId, agent });
};

const getCanisterPath = (canisterName) => path.join(__dirname, '..', '.dfx', 'local', OUTPUT_DIR, canisterName);

const getCandid = (canisterName) =>
  fs
    .readFileSync(`${getCanisterPath(canisterName)}/${canisterName}.did.js`)
    .toString()
    .replace("export default ", "");

const getCanisterId = (canisterName) => {
  if (process.env.DFX_NETWORK === 'tungsten') {
    let id = exec(`dfx canister --network=tungsten id ${canisterName}`)
    return decode(id).trim();
  } else {
    let id = exec(`dfx canister --network=local id ${canisterName}`)
    return decode(id).trim();
  }
};

const format = (canisterId) => canisterId.toString("hex").toUpperCase();

// Run main()

main();
