# Standard Game UI Layout

This document describes the standard user interface (UI) layout for all individual game screens in the Vibe Retro Game Jam project. This layout is enforced by the reusable `GameLayout` component located at `/home/user/studio/src/components/game/GameLayout.tsx`. The layout aims for consistency and provides essential information and controls to the player.

## Layout Structure

The `GameLayout` component divides the screen into three main sections using CSS (Tailwind classes), designed for clarity and ease of use and to prevent overlapping issues on different screen sizes.

-   **Header Section:**
    -   Occupies the top `15%` of the screen height.
    -   Contains the "Back to Hub" button, "Sound Controls UI" (represented by the `AudioPlayer` component), and "Score and Time UI" (represented by the `GameUI` component).
    -   Uses flexbox (`flex justify-between items-center`) to arrange these elements horizontally with space between them.
    -   Includes 5% padding on the left and right edges (`p-4` in the current implementation provides padding on all sides, which works with flex justification).

-   **Game Area Section:**
    -   Occupies the central `70%` of the screen height.
    -   This is the primary area for rendering the game world.
    -   It is centered vertically (`items-center justify-center` in flex parent) and has 5% padding from the left and right edges (`p-[5%]` or similar Tailwind class) to provide visual separation.

-   **Bottom Section:**
    -   Occupies the bottom `15%` of the screen height.
    -   Contains the "Goal of Game" text, a GIF/Image, and "Movement Instructions" text.
    -   Uses flexbox (`flex justify-between items-center`) to arrange these elements horizontally with space between them.
    -   Includes 5% padding on the left and right edges (`p-4`). This section also includes responsiveness classes (`flex-wrap md:flex-nowrap`) to adjust the layout on smaller screens.

## Section Details

The `GameLayout` component accepts the following props:

-   `header`: A React node containing the elements for the header section (Back button, AudioPlayer, GameUI).
-   `gameArea`: A React node containing the main game rendering area (e.g., the canvas).
-   `bottomSection`: A React node containing the elements for the bottom section (Goal, GIF/Image, Movement Instructions).

*   **Back to Hub Button:**
    *   **Purpose:** Provides a clear and accessible way for players to exit the current game and return to the main menu.
    *   **Expected Content:** A button element, likely styled with a retro-inspired icon or text indicating "Back" or "Hub".

*   **Sound Controls UI:**
    *   **Purpose:** Allows players to customize their audio experience by adjusting the volume of background music and sound effects.
    *   **Expected Content:** Slider controls or toggle buttons for Music Volume and SFX Volume.

*   **Score and Time UI:**
    *   **Purpose:** Provides players with real-time feedback on their performance and the progress of the game round.
    *   **Expected Content:** Text elements or digital displays showing the current Score (e.g., "SCORE: 1250") and the remaining Time (e.g., "TIME: 0:45").

### Central Game Area

This section is where the core game content is displayed. The individual game components manage the Three.js scene, camera, and rendering logic using `useRef` and `useEffect` hooks. The canvas element, which is the output of the Three.js rendering, is passed into the `gameArea` prop of the `GameLayout`.

*   **Game Canvas:**
    *   **Purpose:** The dedicated area for rendering the 3D game world using Three.js.
    *   **Implementation:** A `<canvas>` element whose reference is managed by the individual game component (e.g., `threeCanvasRef` in `stone/page.tsx`) and rendered within a container passed to the `gameArea` prop.

*   **Game Area:**
    *   **Purpose:** This is where the main game action is visually rendered. It will contain the Three.js scene for the respective game, including the player character, enemies, obstacles, and environment.
    *   **Expected Content:** The interactive 3D game world. It should be responsive and maintain its aspect ratio within the padded area.

### Information and Instruction Area

*   **Goal of Game:**
    *   **Purpose:** To quickly inform the player of what they need to achieve to succeed in the game.
    *   **Expected Content:** A concise sentence or short bullet point list explaining the primary objective (e.g., "Reach the forest," "Destroy all aliens," "Put out all fires").

*   **GIF / Image:**
    *   **Purpose:** To visually demonstrate the core gameplay mechanic or control scheme, making it easier for players to understand how to play.
    *   **Expected Content:** A short animated GIF or a representative static image showing the player character moving, performing an action, or demonstrating the game's perspective.

*   **Movement Instructions:**
    *   **Purpose:** To clearly explain the controls the player uses to interact with the game.
    *   **Expected Content:** A list or description of the key bindings or touch controls for player movement and actions (e.g., "Use Arrow Keys to Move," "Swipe to Cut," "Press Space to Shoot").

## Implementation Details

Individual game pages (like `src/app/stone/page.tsx`) utilize the `GameLayout` component by importing it and passing the necessary UI elements as props to the `header`, `gameArea`, and `bottomSection` slots. The game-specific logic, state management (score, time, lives, player position), and Three.js rendering are handled within the individual game page components, which then render the canvas and other UI elements to be placed by `GameLayout`. This separation of concerns allows for consistent layout while keeping game-specific logic encapsulated.

The layout within the `GameLayout` and the components passed to it is primarily controlled by Tailwind CSS classes for flexbox, padding, and sizing, ensuring responsiveness across different devices.

