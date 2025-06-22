'use client';

import { ReactNode } from 'react';
import { setup } from '@dojoengine/core';
import { DojoProvider } from '@dojoengine/react';
import { GraphQLClient } from 'graphql-request'; // You might need to install graphql-request

// TODO: Configure the RPC URL and Manifest based on your Dojo deployment
const rpcUrl = 'http://localhost:5050'; // Replace with your Katana RPC URL
const manifest = {}; // Replace with your Dojo World Manifest

const graphQLEndpoint = ''; // TODO: Add your GraphQL endpoint if you use one

const client = new GraphQLClient(graphQLEndpoint); // Initialize GraphQL client if needed

interface Props {
  children: ReactNode;
}

// TODO: Implement the setup function based on your Dojo project's setup
async function createSetup() {
  // This is a placeholder setup. You will need to adapt this based on
  // how your specific Dojo world is set up and how you obtain the manifest.
  // Refer to the Dojo-Game-Starter's setup function for guidance.
  return setup({
    // Replace with your actual Dojo world address
    worldAddress: 'YOUR_WORLD_ADDRESS',
    // Replace with your actual Dojo environment configuration
    withExternalWorks: false,
    rpcUrl,
  });
}

// Memoize the setup promise to avoid re-initializing on every render
const setupPromise = createSetup();

export function Providers({ children }: Props) {
  return (
    <DojoProvider value={{ setup: setupPromise, graphQLClient: client }}>
      {children}
    </DojoProvider>
  );
}
