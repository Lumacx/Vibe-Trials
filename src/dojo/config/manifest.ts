import localhost from "../contracts/target/manifest_dev.json"; // local development manifest
import sepolia from "./manifest_sepolia.json"; // sepolia manifest
import mainnet from "./manifest_sepolia.json"; // change for the right mainnet manifest
import slot from "./manifest_sepolia.json"; // change for the right slot manifest

// Define valid deploy types
type DeployType = keyof typeof manifests;

// Create the manifests object
const manifests = {
  localhost,
  mainnet,
  sepolia,
  slot,
};

// Get deployment type from environment with fallback
const deployType = process.env.NEXT_PUBLIC_DEPLOY_TYPE as string;

// Export the appropriate manifest with a fallback
export const manifest = deployType in manifests
  ? manifests[deployType as DeployType]
  : sepolia;

export type Manifest = typeof manifest;
