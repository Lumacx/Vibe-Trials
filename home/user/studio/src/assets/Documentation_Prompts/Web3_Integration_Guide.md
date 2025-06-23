# Web3 Integration Guide

## Purpose of Integration

The primary purpose of the Web3 integration in the RetroVibe Arcade project is to enable user **authentication** via their Starknet wallet address. This allows for a unique user identifier within the application. Additionally, it provides the functionality for users to **optionally save their game scores to the blockchain**, enabling participation in leaderboards, competitions, prize distributions, and NFT rewards. The core gameplay will remain free and accessible without requiring a wallet connection, ensuring a smooth onboarding experience. Blockchain interaction is only required for score persistence for competitive features.

## Technologies Used

*   **Dojo Engine:** A framework for building onchain games and autonomous worlds on Starknet. It provides the core infrastructure for the game's state and logic on the blockchain.
*   **Starknet:** A Validity Rollup on Ethereum that provides a secure and scalable environment for decentralized applications.
*   **`@starknet-react/core`:** A React hook library for interacting with Starknet wallets and contracts in a React application.
*   **Cartridge:** A platform that provides tools and infrastructure for building and deploying onchain games on Starknet, including a wallet connector used in this project.

## Wallet-Related Files and SDK Integration

The following files work together to manage the Web3 connection and interaction:

*   **`src/app/Vibe_Trials/client/src/main.tsx`:**
    *   This is the primary entry point for the React client application (specifically the part interacting with Dojo/Starknet).
    *   It initializes the Dojo SDK using `init` from `@dojoengine/sdk`.
    *   It sets up the main React context providers:
        *   `DojoSdkProvider`: Provides the Dojo SDK instance and configuration to the application.
        *   `StarknetProvider`: Provides the `@starknet-react/core` context, enabling the use of Starknet wallet hooks.
        *   `BrowserRouter`: (While intended for routing within the React part, in the context of integrating with Next.js, this will be managed by Next.js's routing).
    *   It includes error handling for Dojo initialization failure.

*   **`src/app/Vibe_Trials/client/src/dojo/starknet-provider.tsx`:**
    *   This component wraps the `@starknet-react/core`'s `StarknetConfig`.
    *   It configures the connection to the Starknet network.
    *   It uses `jsonRpcProvider` to connect to a Starknet RPC endpoint, dynamically determining the URL based on the `VITE_PUBLIC_DEPLOY_TYPE` environment variable (sepolia or mainnet) via Cartridge's gateway.
    *   It specifies the chains to be used (`sepolia` or `mainnet`).
    *   Crucially, it includes `cartridgeConnector` in the `connectors` array, enabling connection through the Cartridge wallet.
    *   `autoConnect` is enabled, attempting to automatically connect to a previously used wallet.

*   **`src/app/Vibe_Trials/client/src/dojo/dojoConfig.ts`:**
    *   This file defines the core configuration for the Dojo SDK.
    *   It uses `createDojoConfig` from `@dojoengine/core`.
    *   Configuration values such as `masterAddress`, `masterPrivateKey`, `rpcUrl`, and `toriiUrl` are loaded from environment variables prefixed with `VITE_PUBLIC_`, which are expected to be exposed by the build process (e.g., Vite).
    *   It imports the `manifest` file (likely containing the world address and contract details).

*   **`src/app/Vibe_Trials/client/src/dojo/bindings.ts`:**
    *   This file contains TypeScript type definitions generated for your Dojo smart contract models and events.
    *   It defines interfaces like `Player`, `TrophyCreation`, `Task`, etc., providing type safety when interacting with data from the Dojo World.
    *   It includes a `SchemaType` interface that extends the base SDK schema type and maps model names to their corresponding TypeScript interfaces.
    *   An enum `ModelsMapping` is provided to map model names to their fully qualified names for queries.

*   **`src/app/Vibe_Trials/client/src/dojo/contracts.gen.ts`:**
    *   This file contains auto-generated code for interacting with your Dojo smart contracts.
    *   The `setupWorld` function takes a `DojoProvider` and returns an object with functions to interact with your contracts (e.g., `game.mine`, `game.rest`, `game.spawnPlayer`, `game.train`).
    *   Each function provides a way to build the necessary calldata for a specific contract entrypoint (`build...Calldata`) and to execute the transaction (`...`).
    *   These functions use the `provider.execute` method, which sends the transaction via the connected Starknet account.

These files collectively provide the necessary infrastructure to initialize the Dojo SDK, connect to the Starknet network using the Cartridge wallet, access type definitions for onchain data, and generate functions for executing transactions (though the transaction execution part is not needed for the initial wallet connection for authentication). The `StarknetProvider` and `DojoSdkProvider` are crucial for making the hooks and SDK instances available throughout the React component tree.

## Planned Tasks for Next.js Homepage Integration

To integrate the wallet connection functionality into the Next.js homepage (`src/app/page.tsx`), the following tasks will be performed:

1.  **Modify `src/app/layout.tsx`:**
    *   Import `DojoSdkProvider`, `StarknetProvider`, `dojoConfig`, `setupWorld`, `init`, and `SchemaType`.
    *   Wrap the `children` prop within `<DojoSdkProvider>` which in turn wraps `<StarknetProvider>`.
    *   The initialization of the Dojo SDK (`init`) will need to be handled appropriately within a Client Component or a higher-order component that runs client-side to provide the `sdk` prop to `DojoSdkProvider`. A common pattern in Next.js is to create a client-side provider component in the layout.

2.  **Create `src/components/WalletConnect.tsx`:**
    *   Create a new file `src/components/WalletConnect.tsx`.
    *   Add `"use client";` at the top to mark it as a Client Component.
    *   Import necessary hooks from `@starknet-react/core` (`useConnect`, `useDisconnect`, `useAccount`).
    *   Import the `Button` component and the `Wallet` icon.
    *   Implement the `connectWallet` asynchronous function using `useConnect`. This function will iterate through available connectors (provided by `StarknetProvider`) and attempt to connect using the Cartridge connector.
    *   Implement a disconnection function using `useDisconnect`.
    *   Use the `useAccount` hook to get the connected account details (address, status).
    *   Render the "Connect Wallet" button when `!isConnected`.
    *   Render the Wallet icon and truncated account address when `isConnected`.
    *   Handle the `isConnecting` state to show a loading indicator.

3.  **Integrate `WalletConnect.tsx` into `src/app/page.tsx`:**
    *   Import the `WalletConnect` component into `src/app/page.tsx`.
    *   Place the `<WalletConnect />` component within the desired section of your homepage layout.

This approach separates the client-side wallet interaction logic into its own component, which is then rendered by the server-side homepage, adhering to the Next.js App Router structure and enabling the use of Starknet/Dojo hooks within that client component.