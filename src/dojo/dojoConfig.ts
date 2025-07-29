import { createDojoConfig } from "@dojoengine/core";
import { manifest } from "@/dojo/config/manifest";

const {
  NEXT_PUBLIC_NODE_URL,
  NEXT_PUBLIC_TORII,
  NEXT_PUBLIC_MASTER_ADDRESS,
  NEXT_PUBLIC_MASTER_PRIVATE_KEY,
} = process.env;

export const dojoConfig = createDojoConfig({
  manifest,
  masterAddress: NEXT_PUBLIC_MASTER_ADDRESS ?? '',
  masterPrivateKey: NEXT_PUBLIC_MASTER_PRIVATE_KEY ?? '',
  rpcUrl: NEXT_PUBLIC_NODE_URL ?? '',
  toriiUrl: NEXT_PUBLIC_TORII ?? '',
});
