# Cartridge Controller and Dojo Integration in Next.js

This document summarizes the integration of the Cartridge Controller and Dojo SDK into the Next.js project, focusing on the files migrated and their purpose in this environment.

**Purpose of Integration:**

The primary goal of this integration is to enable Web3 functionalities within the Next.js application, specifically for user authentication via Starknet wallet addresses and the optional ability to save game scores on the blockchain. Free gameplay is a core requirement, with blockchain interaction being opt-in for features like leaderboards, prizes, and NFTs.

**Migrated Files and Folders:**

Several files related to the Dojo and Starknet setup were migrated from the original `src/app/Vibe_Trials/client/src/` directory into the main Next.js `src/` folder. These files are now organized within the following directories:

*   **`/home/user/studio/src/dojo`:** This directory serves as the central location for core Dojo and Starknet related files in the Next.js project. It contains:
    *   `bindings.ts`: Defines TypeScript types for Dojo models and events, providing type safety when interacting with contract data.
    *   `contracts.gen.ts`: Contains generated code for interacting with Dojo smart contracts. While the interaction functions within this file are not used for the core free gameplay, the file itself is necessary for defining the contract interfaces and types used elsewhere in the Web3 integration.
    *   `dojoConfig.ts`: Configures the Dojo environment, including Torii URL, world address, and master account details. It now uses `process.env.NEXT_PUBLIC_` for environment variables to be compatible with Next.js.
    *   `starknet-provider.tsx`: Sets up the `@starknet-react/core` context, which is essential for using Starknet-related hooks like `useConnect`, `useAccount`, and `useDisconnect`. It configures the Starknet network (Sepolia, Mainnet, etc.) and uses the `cartridgeConnector`. This component is marked as a client component (`"use client";`).
    *   `useStarknetConnect.tsx`: A custom React hook that encapsulates the logic for connecting, disconnecting, and managing the connected Starknet account using `@starknet-react/core` hooks. This hook is used in client components (like the homepage) to provide a simplified interface for wallet interaction.

*   **`/home/user/studio/src/dojo/config`:** This subdirectory within `src/dojo` holds configuration files specifically related to the Cartridge connector and contract manifests. It contains:
    *   `cartridgeConnector.tsx`: Defines and configures the Cartridge connector, which is used by `starknet-provider.tsx` to enable wallet connections through Cartridge. This file accesses environment variables using `process.env.NEXT_PUBLIC_` and needs to be handled carefully in the Next.js environment due to its reliance on browser-specific objects (`window`).
    *   `manifest.ts`: Defines the deployment manifests for different environments (development, Sepolia, Mainnet, etc.) by importing the relevant JSON manifest files. It determines the active manifest based on the `NEXT_PUBLIC_DEPLOY_TYPE` environment variable.
    *   `manifest_sepolia.json`: The contract deployment manifest for the Sepolia network.

*   **`/home/user/studio/src/dojo/contracts`:** This directory (or a similar structure) is intended to hold the compiled contract artifacts and possibly other contract-related files. Based on the file listing, it contains:
    *   `target/dev/`: This subdirectory within `contracts` holds the compiled contract class JSON files (e.g., `full_starter_react_game.contract_class.json`) and other build artifacts (`full_starter_react.starknet_artifacts.json`). These files are necessary for the backend to deploy and interact with the contracts.
    *   `manifest_dev.json`: The contract deployment manifest for the development environment.

**Cartridge Controller Configuration and Usage:**

The Cartridge Controller is configured within `src/dojo/config/cartridgeConnector.tsx`. It uses the `ControllerConnector` class from the `@cartridge/connector` library. The configuration involves specifying:

*   **Chains and RPC URL:** The network(s) to connect to and the corresponding RPC endpoint, determined by the `NEXT_PUBLIC_DEPLOY_TYPE` environment variable.
*   **Default Chain ID:** The default chain to use.
*   **Policies:** Defines which contract methods are allowed to be called through the connector.
*   **Namespace and Slot:** Identifiers for the application and the deployment slot.

The `cartridgeConnector` instance is then used within `src/dojo/starknet-provider.tsx` to set up the `StarknetConfig`. The `StarknetConfig` component from `@starknet-react/core` provides the necessary context for using Starknet hooks throughout the application.

In client components (like `src/app/page.tsx`), the `useStarknetConnect` hook from `src/dojo/useStarknetConnect.tsx` is used to easily access the wallet connection status, connected address, and functions to initiate connection and disconnection. This hook relies on the `StarknetProvider` being available in the component tree.

**Handling Next.js Specifics:**

Integrating the Web3 components into Next.js's App Router requires careful handling of Server and Client Components. Components that use browser-specific APIs or React hooks that rely on client-side context (like those from `@starknet-react/core`) must be marked with the `"use client";` directive. Providers like `StarknetProvider` are typically placed in the root layout (`src/app/layout.tsx`) to make the context available to all client components. Environment variables are accessed using `process.env.NEXT_PUBLIC_` for client-side code and `process.env.` for server-side code, with a consistent `NEXT_PUBLIC_` prefix recommended for variables needed on the client.

This documentation provides a high-level overview of the integrated Web3 setup. For detailed implementation, refer to the code files mentioned above.
