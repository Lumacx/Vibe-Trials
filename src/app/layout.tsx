import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Import necessary modules for Dojo and Starknet
import { dojoConfig } from "../dojo/dojoConfig"; // Adjusted import path
import { setupWorld } from "../dojo/contracts.gen"; // Adjusted import path
import StarknetProvider from "../dojo/starknet-provider"; // Adjusted import path
import { init } from "@dojoengine/sdk";
import type { SchemaType } from "../dojo/bindings"; // Adjusted import path

export const metadata: Metadata = {
  title: "RetroVibe Arcade",
  description: "A collection of five distinct retro-inspired mini-games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize Dojo SDK (This will be called on the server during SSR)
  const sdk = init<SchemaType>({
    client: {
      toriiUrl: dojoConfig.toriiUrl,
      worldAddress: dojoConfig.manifest.world.address,
    },
    domain: {
      name: "Vibe_Trials",
      version: "1.0",
      chainId: "KATANA", // Or your actual chain ID
      revision: "1",
    },
  });

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@700&family=Source+Code+Pro&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        {/* Wrap with Starknet and Dojo providers */}
 <StarknetProvider>
 <div className="flex-grow">{children}</div>
 </StarknetProvider>
        <Toaster />
      </body>
    </html>
  );
}
