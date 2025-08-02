import { createDojoConfig } from "@dojoengine/core";

export const fallbackConfig = createDojoConfig({
  manifest: {
    world: {
      address: "0x0000000000000000000000000000000000000000000000000000000000000000",
      class_hash: "0x0"
    },
    contracts: []
  },
  rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
  toriiUrl: "https://api.cartridge.gg/x/torii/sepolia",
  masterAddress: "",
  masterPrivateKey: ""
});
