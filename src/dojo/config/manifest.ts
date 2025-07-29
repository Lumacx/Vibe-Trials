// src/dojo/config/manifest.ts

import localhost from "../contracts/target/manifest_dev.json"; // local development manifest
import sepolia from "./manifest_sepolia.json"; // sepolia manifest
import mainnet from "./manifest_sepolia.json"; // change for the right mainnet manifest
import slot from "./manifest_sepolia.json"; // change for the right slot manifest

// Define los tipos válidos
type DeployType = keyof typeof manifests;

const manifests = {
  localhost,
  mainnet,
  sepolia,
  slot,
};

const deployType = process.env.NEXT_PUBLIC_DEPLOY_TYPE as DeployType;

// Usa el manifest correspondiente o cae en sepolia por defecto
export const manifest = deployType in manifests
  ? manifests[deployType]
  : sepolia;

export type Manifest = typeof manifest;
