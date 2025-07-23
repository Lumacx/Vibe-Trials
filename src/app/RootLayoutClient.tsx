'use client';

import { Toaster } from "@/components/ui/toaster";
import StarknetProvider from "../dojo/starknet-provider";
import { DojoProviderClient } from "@/components/DojoProviderClient";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <StarknetProvider>
      <DojoProviderClient>
        <div className="flex-grow">{children}</div>
      </DojoProviderClient>
      <Toaster />
    </StarknetProvider>
  );
}
