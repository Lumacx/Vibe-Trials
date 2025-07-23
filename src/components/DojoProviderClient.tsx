'use client';

import { useMemo } from "react";
import { dojoConfig } from "../dojo/dojoConfig";
import { setupWorld } from "../dojo/contracts.gen";
import { init } from "@dojoengine/sdk";
import type { SchemaType } from "../dojo/bindings";
import React from "react";

export const DojoProviderClient = ({ children }: { children: React.ReactNode }) => {
  const sdk = useMemo(() => {
    // Solo se inicializa en cliente
    if (typeof window === "undefined") return null;

    return init<SchemaType>({
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
    });
  }, []);

  // Puedes pasar el sdk por contexto si lo vas a usar globalmente

  return <>{children}</>;
};
