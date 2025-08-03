md
# Vibe Retro Game Jam - Technical Guide

This document provides a detailed technical overview of the Vibe Retro Game Jam project, covering its architecture, structure, deployment, and key technical implementations.

## 1. Architecture Overview

The project is built as a modern web application leveraging the following core technologies:

*   **Framework:** Next.js (React Framework)
    *   Utilizes the App Router for routing and server-side capabilities (though primarily used for client-side rendering in this project).
    *   Provides a structured approach to building pages and components.
*   **Frontend Library:** React
    *   Component-based architecture for building user interfaces.
    *   Leverages functional components and hooks for state management and side effects.
*   **Language:** TypeScript
    *   Provides static typing for improved code maintainability, readability, and reduced errors.
    *   Enhances developer productivity through better tooling and refactoring capabilities.
*   **3D Graphics:** Three.js
    *   A JavaScript library for rendering 3D graphics on the web using WebGL.
    *   Used for creating the interactive 3D homepage environment and the visuals within each game level.

The architecture follows a component-based structure with clear separation of concerns:

*   **Pages (`src/app/`)**: Define the main routes and structure of the application.
*   **Components (`src/components/`)**: Reusable UI elements and visual representations.
*   **State Management (`src/store/`)**: Handles application-wide data and state changes.
*   **Services (`src/services/`)**: Encapsulates business logic and interactions with external concerns (like a leaderboard).
*   **Utilities (`src/lib/`, `src/utils/`)**: Provide helper functions and constants.

## 2. Project Structure

The project follows a standard Next.js structure with additional directories for specific functionalities:

*   **`/` (Root)**:
    *   `next.config.ts`: Next.js configuration.
    *   `package.json`: Project dependencies and scripts.
    *   `tsconfig.json`: TypeScript configuration.
    *   `tailwind.config.ts`, `postcss.config.cjs`: Tailwind CSS configuration.
    *   `apphosting.yaml`, `firebase.json`: Deployment configuration files (Firebase/App Hosting).
    *   `docs/`: Project documentation files (including this guide and `user_guide.md`).
    *   `public/`: Static assets served directly (audio, html files).
        *   `music/`: Background music tracks (`.mp3`).
        *   `sfx/`: Sound effects (`.mp3`).
    *   `src/`: Application source code.
        *   `app/`: Next.js App Router pages and layouts.
            *   `layout.tsx`: Root layout for the application.
            *   `page.tsx`: Homepage.
            *   `[element]/page.tsx`: Dynamic routes for each elemental game (e.g., `fire/page.tsx`).
            *   `credits/page.tsx`, `leaderboard/page.tsx`: Static pages for credits and leaderboard.
        *   `assets/`: Static assets imported into components (e.g., 3D models, documentation source).
            *   `Documentation_Prompts/`: Source text/markdown used to generate documentation.
            *   `models/`: Placeholder for 3D model files (e.g., `.gltf`).
        *   `components/`: Reusable React components.
            *   `game/`: Components specific to game UI elements (e.g., `GameUI.tsx`).
            *   `icons/`: Icon components.
            *   `ui/`: A collection of standardized UI components (likely based on a library like Shadcn UI) (`accordion.tsx`, `button.tsx`, `card.tsx`, etc.).
            *   `AudioPlayer.tsx`: Component for managing audio playback.
            *   `CanvasScene.tsx`, `ThreeScene.tsx`, `StoneCanvasWrapper.tsx`: Components likely related to setting up and managing Three.js canvases.
        *   `hooks/`: Custom React hooks (`use-mobile.tsx`, `use-toast.ts`).
        *   `lib/`: Utility functions (`utils.ts`).
        *   `services/`: Business logic services (`LeaderboardService.ts`).
        *   `store/`: Application state management (`AppStore.ts`).
        *   `types/`: TypeScript custom type definitions.
        *   `utils/`: General utilities and constants (`constants.ts`).

## 3. Development and Deployment

The project is configured for development and deployment using standard web technologies and potentially Firebase/App Hosting.

*   **Development:** The project can be run locally using `npm run dev` (or the equivalent for pnpm/yarn) as defined in `package.json`. Next.js provides hot module replacement for a smooth development experience.
*   **Build:** The project is built for production using `npm run build`. This process compiles the TypeScript code, bundles assets, and optimizes the application.
*   **Deployment (Firebase/App Hosting):** The presence of `firebase.json` and `apphosting.yaml` indicates that the project is intended for deployment on Firebase, likely using Firebase App Hosting or a similar service.
    *   `firebase.json`: Configures Firebase services for the project, including hosting rules, redirects, and potentially other features like functions or database connections (though not explicitly evident in the provided files).
    *   `apphosting.yaml`: A configuration file specific to Firebase App Hosting, defining how the application should be built and served. This would specify the build command (`npm run build`) and the output directory (typically `.next` for Next.js).

The deployment process would generally involve:

1.  Building the project (`npm run build`).
2.  Authenticating with Firebase (`firebase login`).
3.  Deploying to Firebase (`firebase deploy`).

## 4. Core Technical Implementations

### 4.1. Three.js Integration

Three.js is integrated for rendering 3D graphics. Components like `CanvasScene.tsx` and `ThreeScene.tsx` are likely responsible for:

*   Setting up the WebGL renderer, camera, and scene.
*   Loading and positioning 3D models (potentially from `src/assets/models/` using loaders like `GLTFLoader`).
*   Handling lighting and materials.
*   Implementing rendering loops and animations.
*   Integrating with React's component lifecycle to manage the Three.js scene.

The homepage (`src/app/page.tsx`) uses Three.js to render the interactive 3D elemental symbols and treasure chest as described in `src/assets/Documentation_Prompts/Game_Design_Document.txt`. Each game page (`src/app/[element]/page.tsx`) will have its own dedicated Three.js scene tailored to the game's visual requirements and assets.

### 4.2. State Management

Application state is managed using a central store, likely implemented in `src/store/AppStore.ts`. This store is responsible for holding data that needs to be accessed and modified across different components and pages, such as:

*   Current game being played.
*   Player score and health.
*   Game timer state.
*   Leaderboard data.
*   Audio settings.

The store might utilize a state management library like Zustand, Jotai, or even React Context to provide a structured and efficient way to update and subscribe to state changes.

### 4.3. Service Layer

The `src/services/` directory contains modules for handling specific business logic. Currently, `LeaderboardService.ts` is present, suggesting:

*   Functions for submitting new scores.
*   Functions for fetching existing scores.
*   Logic for sorting and maintaining leaderboard data.

This service layer helps to decouple the data fetching and manipulation logic from the UI components, making the code more organized and testable. The service might interact with a backend API or use browser storage (like `localStorage` for a simple jam project) to persist scores.

### 4.4. UI Componentry and Styling

The project leverages a component library approach, with reusable UI components organized in `src/components/ui/`. These components adhere to the "Look and Feel Standards" outlined in `src/assets/Documentation_Prompts/Look_and_Feel_Guide.md`, ensuring a consistent visual style across the application.

*   **Tailwind CSS:** Used for styling, providing utility classes for rapid UI development and consistent design. The configuration files (`tailwind.config.ts`, `postcss.config.cjs`) allow for customization of the design system.
*   **Consistent Design:** Components like buttons, cards, inputs, and dialogs follow a defined style guide (rounded corners, specific color palettes, typography) to maintain a cohesive look and feel.

### 4.5. Audio Management

Audio assets (`public/music/`, `public/sfx/`) are managed and played using the `src/components/AudioPlayer.tsx` component. This component likely provides functionality for:

*   Loading and playing background music and sound effects.
*   Controlling volume.
*   Handling audio looping.
*   Ensuring audio is played at appropriate times during gameplay or navigation.

The "Audio Standards" section in `src/assets/Documentation_Prompts/Game_Design_Document.txt` provides the requirements for the types and timing of audio within each game.

## 5. Game-Specific Implementations

Each game level (`src/app/[element]/page.tsx`) implements the core mechanics described in `src/assets/Documentation_Prompts/Game_Design_Document.txt`, leveraging the shared architecture and components.

*   **Flame Frenzy (Fire):** Implements collision detection between a virtual "flame sword" (controlled by mouse/touch) and spawned 3D objects (Gems, Ice Cubes, Explosives). Manages a health system and a freeze mechanic.
*   **Stone Labyrinth (Stone):** Utilizes a grid-based movement system and collision detection within a 3D maze to prevent the player from falling into holes.
*   **Sky Guardian (Wind):** Implements horizontal player movement, projectile firing, enemy spawning with movement patterns, and collision detection for a top-down 3D shooter.
*   **Hydro Heroes (Water):** Features grid-based movement in a 3D town maze, fire extinguishing mechanics using a "water blast," simple AI for flame monsters, and collision detection for interactions and damage.
*   **Forest Crossing (Nature):** Implements grid-based movement across multiple lanes with varying speed vehicles and collision detection to avoid being hit.

Each game integrates the common UI elements (score, timer, health) and interacts with the state management and service layer for updating scores and game state.

This technical guide provides a comprehensive overview of the Vibe Retro Game Jam project's technical foundation. For more detailed information on specific game mechanics or visual design principles, refer to the `Game_Design_Document.txt` and `Look_and_Feel_Guide.md` files.