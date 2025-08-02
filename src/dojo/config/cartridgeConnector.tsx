import { Connector } from "@starknet-react/core";
import { ControllerConnector } from "@cartridge/connector";
import { ControllerOptions } from "@cartridge/controller";
import { constants } from "starknet";
import { manifest } from "./manifest";

const { NEXT_PUBLIC_DEPLOY_TYPE } = process.env;

console.log("NEXT_PUBLIC_DEPLOY_TYPE", NEXT_PUBLIC_DEPLOY_TYPE);

const getRpcUrl = () => {
  switch (NEXT_PUBLIC_DEPLOY_TYPE) {
    case "localhost":
      return "http://localhost:5050"; // Katana localhost
    case "mainnet":
      return "https://api.cartridge.gg/x/starknet/mainnet";
    case "sepolia":
      return "https://api.cartridge.gg/x/starknet/sepolia";
    default:
      return "https://api.cartridge.gg/x/starknet/sepolia";
  }
};

const getDefaultChainId = () => {
  switch (NEXT_PUBLIC_DEPLOY_TYPE) {
    case "localhost":
      return "0x4b4154414e41"; // KATANA in ASCII
    case "mainnet":
      return constants.StarknetChainId.SN_MAIN;
    case "sepolia":
      return constants.StarknetChainId.SN_SEPOLIA;
    default:
      return constants.StarknetChainId.SN_SEPOLIA;
  }
};

// ⚠️ Manejo defensivo para evitar crash si el manifest no tiene contratos
const getGameContractAddress = (): string => {
  try {
    if (
      manifest?.contracts &&
      Array.isArray(manifest.contracts) &&
      manifest.contracts.length > 0 &&
      manifest.contracts[0].address
    ) {
      return manifest.contracts[0].address;
    } else {
      console.warn("⚠️ manifest.contracts[0].address no está definido");
      return "0x0000000000000000000000000000000000000000"; // Dummy address
    }
  } catch (err) {
    console.error("❌ Error accediendo al contrato en el manifest:", err);
    return "0x0000000000000000000000000000000000000000";
  }
};

const CONTRACT_ADDRESS_GAME = getGameContractAddress();
console.log("✅ Using game contract address:", CONTRACT_ADDRESS_GAME);

const policies = {
  contracts: {
    [CONTRACT_ADDRESS_GAME]: {
      methods: [
        { name: "spawn_player", entrypoint: "spawn_player" },
        { name: "train", entrypoint: "train" },
        { name: "mine", entrypoint: "mine" },
        { name: "rest", entrypoint: "rest" },
      ],
    },
  },
};

const options: ControllerOptions = {
  chains: [{ rpcUrl: getRpcUrl() }],
  defaultChainId: getDefaultChainId(),
  policies,
  namespace: "full_starter_react",
  slot: "full-starter-react",
};

const cartridgeConnector = new ControllerConnector(options) as never as Connector;

export default cartridgeConnector;
