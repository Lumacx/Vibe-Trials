'use client';

import { dojoConfig } from "../dojo/dojoConfig";
import { setupWorld } from "../dojo/contracts.gen";
import { init } from "@dojoengine/sdk";
import type { SchemaType } from "../dojo/bindings";
import React, { useMemo } from "react";

export const DojoProviderClient = ({ children }: { children: React.ReactNode }) => {
  // ✅ Solo ejecutar en cliente
  const sdk = useMemo(() => init<SchemaType>({
    client: {
      toriiUrl: dojoConfig.toriiUrl,
      worldAddress: dojoConfig.manifest.world.address,
    },
    domain: {
      name: "Vibe_Trials",
      version: "1.0",
      chainId: "KATANA",
      revision: "1",
    },
  }), []);

  return <>{children}</>;
};
