# Web3 Integration Plan: Dojo Engine & Starknet

## Project Overview

This document outlines the technical plan for integrating Web3 elements into the Vibe Retro Game Jam project, utilizing the Dojo Engine and Starknet. The integration will be limited to specific, core functionalities, with real-time game logic primarily handled on the frontend using Next.js and Three.js.

**Key Technologies:**

*   **Frontend:** Next.js, React, TypeScript, Three.js
*   **Backend (Web3):** Dojo Engine (Rust), Starknet (Layer 2 ZK-Rollup)
*   **Starknet Interaction:** Starknet SDK (e.g., `starknet.js`)

## Overall Architecture

The architecture follows a client-server model where the frontend (Next.js application) interacts with the Starknet blockchain through a Starknet SDK. The game logic and state relevant to persistence, scoring, and future NFT allocation will be managed by Dojo smart contracts deployed on Starknet.
```
mermaid
graph LR
    A[Frontend - Next.js / Three.js] --> B(Starknet SDK);
    B --> C[Starknet Blockchain];
    C --> D[Dojo Engine / Smart Contracts];
    D --> C;
    C --> B;
    B --> A;
    E[Argent Wallet] --> B;
```
*   The **Frontend** handles rendering the game world (Three.js), user input, real-time game mechanics, and the user interface.
*   The **Starknet SDK** acts as the bridge between the frontend and the Starknet blockchain, enabling reading data and sending transactions.
*   **Starknet** is the network where the Dojo smart contracts are deployed and executed, ensuring verifiability and decentralization of core game state and interactions.
*   The **Dojo Engine** provides the framework for building the on-chain game logic as smart contracts. It manages the game state using an Entity-Component-System (ECS) architecture on Starknet.
*   The **Argent Wallet** (or other compatible Starknet wallets) will be used by players to authenticate and sign transactions.

Real-time game simulation (e.g., object movement, collision detection, scoring updates during gameplay) will occur on the frontend for a smooth player experience. Only key events, like game start (potentially for initial state), game end (for scoring), and future NFT claims, will involve interaction with the blockchain.

## Web3 Interaction Points

### 1. User Authentication / Login with Argent Wallet

**Role of Dojo/Starknet:** While the primary authentication mechanism for a web application might be handled off-chain, connecting with a Starknet wallet serves to identify the player on the blockchain for features like leaderboards and NFT ownership. The Dojo contracts can store information linked to the player's Starknet address.

**Frontend Interaction:**

*   The frontend will provide a "Connect Wallet" button or similar UI element.
*   Clicking the button will initiate a connection request using the Starknet SDK, prompting the user to connect their Argent wallet (or another installed Starknet wallet).
*   The frontend will obtain the player's Starknet account address upon successful connection.
*   This address can be stored locally in the frontend's state or context to identify the player for subsequent interactions.

**Implementation Steps:**

1.  Install a Starknet SDK (e.g., `starknet.js`).
2.  Add a "Connect Wallet" button component to the homepage or a persistent UI element.
3.  Implement an asynchronous function to handle wallet connection using the SDK's connection methods.
4.  Handle potential errors during connection (e.g., no wallet installed).
5.  Store the connected account address in the application's state.
6.  Display the connected wallet address or a truncated version in the UI.

### 2. Game Score Recording for Leaderboard Tracking

**Role of Dojo/Starknet:** Dojo smart contracts will be responsible for receiving and storing game scores associated with player addresses. This ensures that the leaderboard data is verifiable and resistant to tampering, residing on the blockchain.

**Frontend Interaction:**

*   When a game ends, the frontend will determine the final score based on the game's logic.
*   If the player is connected with a Starknet wallet, the frontend will construct a transaction to submit this score to the appropriate function in the Dojo smart contract.
*   The Starknet SDK will be used to sign and send this transaction to the Starknet network.
*   The frontend might display a loading indicator while waiting for the transaction to be confirmed on the blockchain.

**Implementation Steps:**

1.  Define a component and system in your Dojo contract to handle score submission and storage (e.g., a `ScoreComponent` associated with a `PlayerEntity`, and a `submit_score` dispatcher function).
2.  In each game's end-game logic on the frontend, retrieve the final score.
3.  If a wallet is connected, create a function to prepare the transaction data, including the game identifier and the player's score.
4.  Use the Starknet SDK to sign the transaction with the connected wallet.
5.  Send the signed transaction to Starknet.
6.  Implement logic to handle the transaction status (pending, accepted, failed).
7.  Implement logic to read the leaderboard data from the Dojo contract (likely by querying the `ScoreComponent` for multiple players) to display the leaderboard in the frontend. This reading can be done directly via the SDK or through a data indexer.

### 3. NFT Allocation at the End (Future Development)

**Role of Dojo/Starknet:** Dojo contracts or other Starknet contracts will manage the logic for determining if a player qualifies for an NFT based on their performance (e.g., achieving a certain score threshold) and will handle the minting or allocation of these NFTs to the player's Starknet address.

**Frontend Interaction:**

*   After a game ends and potentially after the score is recorded, the frontend can check if the player is eligible for an NFT (this check could happen on-chain in the Dojo contract or off-chain based on the recorded score).
*   If eligible, the frontend will provide a UI element for the player to claim or receive the NFT.
*   Clicking the claim button will trigger a transaction using the Starknet SDK to interact with the NFT contract or a specific function in the Dojo contract responsible for NFT allocation.

**Implementation Steps (Future):**

1.  Develop or integrate with an NFT smart contract on Starknet (e.g., using the ERC-721 standard).
2.  Implement logic in your Dojo contract (or a separate contract) to determine NFT eligibility based on game performance metrics recorded on-chain.
3.  Create a function in the relevant contract for players to claim or be allocated their NFTs.
4.  In the frontend's end-game or results screen, check for NFT eligibility.
5.  If eligible, display a "Claim NFT" button.
6.  Implement a function to send the NFT claim transaction using the Starknet SDK.
7.  Handle transaction signing and confirmation.

By limiting the Web3 interactions to these specific points, the project can leverage the benefits of blockchain for critical aspects like ownership and verifiable records without sacrificing the performance required for engaging retro gameplay on the frontend.