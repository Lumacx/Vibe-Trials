import { createDojoConfig } from "@dojoengine/core";

import { manifest } from "../dojo/config/manifest";

const {
    NEXT_PUBLIC_NODE_URL,
    NEXT_PUBLIC_TORII,
    NEXT_PUBLIC_MASTER_ADDRESS,
    NEXT_PUBLIC_MASTER_PRIVATE_KEY,
  } = process.env;

  export const dojoConfig = createDojoConfig({
    manifest,
    masterAddress: process.env.NEXT_PUBLIC_MASTER_ADDRESS ?? '',
    masterPrivateKey: process.env.NEXT_PUBLIC_MASTER_PRIVATE_KEY ?? '',
    rpcUrl: process.env.NEXT_PUBLIC_NODE_URL ?? '',
    toriiUrl: process.env.NEXT_PUBLIC_TORII ?? '',
});
