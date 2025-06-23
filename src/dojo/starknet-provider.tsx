"use client";

import type { PropsWithChildren } from "react";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  jsonRpcProvider,
  StarknetConfig,
  starkscan,
} from "@starknet-react/core";
import cartridgeConnector from "./config/cartridgeConnector"; // ✅ Import directo del conector

export default function StarknetProvider({ children }: PropsWithChildren) {
  const NEXT_PUBLIC_DEPLOY_TYPE = process.env.NEXT_PUBLIC_DEPLOY_TYPE;

  const getRpcUrl = () => {
    switch (NEXT_PUBLIC_DEPLOY_TYPE) {
      case "mainnet":
        return "https://api.cartridge.gg/x/starknet/mainnet";
      case "sepolia":
        return "https://api.cartridge.gg/x/starknet/sepolia";
      case "localhost":
        return "http://localhost:5050";
      default:
        return "https://api.cartridge.gg/x/starknet/sepolia";
    }
  };

  const provider = jsonRpcProvider({
    rpc: () => ({ nodeUrl: getRpcUrl() }),
  });

  const chains = NEXT_PUBLIC_DEPLOY_TYPE === "mainnet"
    ? [mainnet]
    : [sepolia];

  return (
    <StarknetConfig
      autoConnect
      chains={chains}
      connectors={[cartridgeConnector]} // ✅ Usas el conector directamente
      explorer={starkscan}
      provider={provider}
    >
      {children}
    </StarknetConfig>
  );
}
