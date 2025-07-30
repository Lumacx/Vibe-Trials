'use client';

import dynamic from 'next/dynamic';
import { Toaster } from '@/components/ui/toaster';
import StarknetProvider from '../dojo/starknet-provider';

// ✅ Solo importar en cliente
const DojoProviderClient = dynamic(
  () => import('@/components/DojoProviderClient').then(mod => mod.DojoProviderClient),
  { ssr: false }
);

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
