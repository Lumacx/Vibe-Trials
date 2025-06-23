"use client";

import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  jsonRpcProvider,
  StarknetConfig,
  starkscan,
  Connector,
} from "@starknet-react/core";

export default function StarknetProvider({ children }: PropsWithChildren) {
  const [cartridgeConnector, setCartridgeConnector] = useState<Connector | null>(null);

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

  const chains = NEXT_PUBLIC_DEPLOY_TYPE === "mainnet" ? [mainnet] : [sepolia];

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("./config/cartridgeConnector").then((mod) => {
        setCartridgeConnector(mod.default);
      });
    }
  }, []);

  if (!cartridgeConnector) return null; // o un loader/spinner

  return (
    <StarknetConfig
      autoConnect
      chains={chains}
      connectors={[cartridgeConnector]}
      explorer={starkscan}
      provider={provider}
    >
      {children}
    </StarknetConfig>
  );
}
