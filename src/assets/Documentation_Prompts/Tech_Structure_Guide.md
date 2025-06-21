# Project Technical Structure

This document outlines the technical structure of the Vibe Retro Game Jam project, detailing the purpose of key directories and files based on the current project layout. The project utilizes Next.js for the application framework, React and TypeScript for the frontend, and incorporates Three.js for 3D rendering.

## Root Directory (`/`)

The root directory contains project-level configuration files and documentation.

*   **`.idx/`**: (Not a standard Next.js directory) May contain configuration specific to the development environment or platform being used (e.g., Nix configuration).
*   **`.vscode/`**: Contains configuration files for the VS Code editor, such as settings.json for workspace-specific preferences.
*   **`docs/`**: Houses project documentation.
    *   `blueprint.md`: Likely contains high-level project plans or blueprints.
*   **`public/`**: Serves static assets. Files in this directory are accessible directly from the root of the application's URL.
    *   `music/`**: Contains music audio files for the game.
        *   `*.mp3`: Individual music tracks.
        *   `placeholder.txt`: A placeholder file.
    *   `sfx/`**: Contains sound effect audio files for the game.
        *   `*.mp3`: Individual sound effect files.
        *   `placeholder.txt`: A placeholder file.
*   **`src/`**: Contains the main application source code. This is where most development work will occur.
    *   `ai/`**: (Not a standard Next.js directory) May contain files related to AI integration or tooling.
        *   `dev.ts`: Likely a development-specific AI script.
        *   `genkit.ts`: Possibly related to AI generation tools or kits.
    *   `app/`**: This is the core of the Next.js App Router. It handles routing and layout for the application. Each subdirectory within `app` represents a route segment.
        *   `[route]/page.tsx`: Files named `page.tsx` define the UI for a route segment and are rendered when that route is accessed. Examples include `fire/page.tsx`, `stone/page.tsx`, etc., representing individual game pages.
        *   `favicon.ico`: The favicon for the application.
        *   `globals.css`: Global CSS styles for the application. Often used for importing Tailwind CSS or other global styles.
        *   `layout.tsx`: Defines the shared UI for a route segment and its children. The root `layout.tsx` defines the main application layout.
        *   `page.tsx`: The root page of the application (the homepage).
    *   `assets/`**: Stores static assets that are imported into the application code (unlike `public`, which serves files directly).
        *   `Documentation_Prompts/`**: Contains documentation prompts or source for documentation.
            *   `Audio_Overview.txt`: Document outlining audio requirements.
            *   `Game_Design_Document.txt`: The main game design document.
            *   `Images_Overview.txt`: Document outlining image and asset requirements.
            *   `Look_and_Feel_Guide.md`: Documentation describing the project's visual style.
        *   `models/`**: Placeholder for 3D models (e.g., .gltf, .obj) to be used with Three.js.
            *   `placeholder.txt`: A placeholder file.
    *   `components/`**: Contains reusable React components.
        *   `game/`**: Components specifically related to game UI elements.
            *   `GameUI.tsx`: Likely a component for displaying in-game UI like score, timer, etc.
        *   `icons/`**: Components for icons.
            *   `GameIcons.tsx`: Likely contains icon components specific to the game.
        *   `ui/`**: Contains a collection of pre-built or custom UI components (likely based on a UI library like Shadcn UI, judging by the file names) for consistent styling.
            *   `accordion.tsx`, `alert-dialog.tsx`, `alert.tsx`, `avatar.tsx`, `badge.tsx`, `button.tsx`, `calendar.tsx`, `card.tsx`, `chart.tsx`, `checkbox.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `form.tsx`, `input.tsx`, `label.tsx`, `menubar.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `scroll-area.tsx`, `select.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `slider.tsx`, `switch.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`, `toast.tsx`, `toaster.tsx`, `tooltip.tsx`: Individual UI components.
        *   `AudioPlayer.tsx`: A component for handling audio playback.
    *   `hooks/`**: Contains custom React hooks.
        *   `use-mobile.tsx`: A hook for detecting if the user is on a mobile device.
        *   `use-toast.ts`: A hook for displaying toast notifications.
    *   `lib/`**: Contains utility functions or libraries.
        *   `utils.ts`: General utility functions.
    *   `services/`**: Contains services or modules that handle specific logic, often interacting with external data or APIs.
        *   `LeaderboardService.ts`: Handles logic related to the game leaderboard (e.g., submitting scores, fetching scores).
    *   `store/`**: Contains files related to application state management.
        *   `GameStore.ts`: Likely implements a state management solution (e.g., Zustand, Jotai, or React Context) to manage global game state.
    *   `utils/`**: Contains general utility functions or constants.
        *   `constants.ts`: Defines application-wide constants.
*   **`apphosting.yaml`**: Configuration file likely related to application hosting or deployment setup.
*   **`components.json`**: Configuration file, possibly related to a UI component library or setup.
*   **`next.config.ts`**: Configuration file for Next.js, allowing customization of its build process and behavior.
*   **`package-lock.json`**: Records the exact versions of dependencies used in the project, ensuring reproducible builds.
*   **`package.json`**: Contains project metadata, scripts for running tasks (like `npm start`, `npm build`), and lists project dependencies.
*   **`postcss.config.mjs`**: Configuration file for PostCSS, often used with Tailwind CSS for processing CSS.
*   **`README.md`**: The main README file for the project, providing an overview and instructions.
*   **`tailwind.config.ts`**: Configuration file for Tailwind CSS, customizing the utility classes and design system.
*   **`tsconfig.json`**: Configuration file for TypeScript, defining compiler options and project settings.

## How the Pieces Fit Together

The project structure is built around **Next.js as the application framework**. The `src/app` directory leverages Next.js's App Router for **routing**, where each subdirectory and `page.tsx` file defines a distinct route (homepage, individual games, leaderboard, credits).

**React components** are organized within the `src/components` directory, promoting reusability across different pages. These components range from general UI elements (`src/components/ui`) to game-specific displays (`src/components/game`).

**TypeScript** (`tsconfig.json`) provides static typing, enhancing code maintainability and reducing errors.

**Tailwind CSS** (`tailwind.config.ts`, `postcss.config.mjs`, `src/app/globals.css`, `src/components/ui`) is used for styling, enabling rapid UI development with utility classes and a consistent design system. The `Look_and_Feel_Guide.md` in `src/assets/Documentation_Prompts` aims to document this style.

**Three.js (dependencies listed in `package.json`)** will be integrated into the game components within `src/app` or potentially in dedicated components within `src/components` to handle the 3D rendering aspects of each game.

**State management** is handled by files in `src/store` (`GameStore.ts`), allowing different parts of the application to share and update game data.

**Services** (`src/services/LeaderboardService.ts`) encapsulate specific logic, like interacting with a leaderboard, keeping concerns separated.

**Utility functions and constants** are stored in `src/lib` and `src/utils`, providing helper functions and centralized configuration values.

**Static assets** like audio (`public/music`, `public/sfx`) and 3D models (`src/assets/models`) are stored in designated directories for easy access.

The build process and project configuration are managed by files like `package.json`, `next.config.ts`, `tailwind.config.ts`, and `tsconfig.json`, ensuring the project can be built, run, and deployed consistently.

This structure provides a solid foundation for building a modular, maintainable, and scalable web application using modern frontend technologies.