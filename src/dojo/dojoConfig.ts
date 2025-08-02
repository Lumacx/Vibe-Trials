import { createDojoConfig } from "@dojoengine/core";
import defaultManifest from "@/dojo/config/manifest_dev.json"; // 👈 Renombramos esta importación
import { fallbackConfig } from "@/dojo/config/fallbackConfig";

// Determina el entorno desde la variable pública
const deployType = process.env.NEXT_PUBLIC_DEPLOY_TYPE ?? "sepolia";

// Carga dinámica del manifest según el entorno
let manifest: any;

try {
  switch (deployType) {
    case "localhost":
      manifest = require("@/dojo/config/manifest_localhost.json");
      break;
    case "mainnet":
      manifest = require("@/dojo/config/manifest_mainnet.json");
      break;
    default:
      manifest = require("@/dojo/config/manifest_dev.json");
  }

  if (!manifest?.world?.address) throw new Error("Manifest incompleto");
} catch (err) {
  console.warn("⚠️ Cargando fallback Dojo config:", err);
  manifest = null;
}

// Variables de entorno adicionales
const {
  NEXT_PUBLIC_NODE_URL,
  NEXT_PUBLIC_TORII,
  NEXT_PUBLIC_MASTER_ADDRESS,
  NEXT_PUBLIC_MASTER_PRIVATE_KEY,
} = process.env;

// Exporta la configuración Dojo final
export const dojoConfig = manifest
  ? createDojoConfig({
      manifest,
      rpcUrl: NEXT_PUBLIC_NODE_URL ?? "https://api.cartridge.gg/x/starknet/sepolia",
      toriiUrl: NEXT_PUBLIC_TORII ?? "https://api.cartridge.gg/x/torii/sepolia",
      masterAddress: NEXT_PUBLIC_MASTER_ADDRESS ?? "",
      masterPrivateKey: NEXT_PUBLIC_MASTER_PRIVATE_KEY ?? "",
    })
  : fallbackConfig;
