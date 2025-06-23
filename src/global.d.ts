// global.d.ts
namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NODE_URL: string;
      NEXT_PUBLIC_TORII: string;
      NEXT_PUBLIC_MASTER_ADDRESS: string;
      NEXT_PUBLIC_MASTER_PRIVATE_KEY: string;
      NEXT_PUBLIC_SLOT_ADDRESS: string;
    }
  }
  