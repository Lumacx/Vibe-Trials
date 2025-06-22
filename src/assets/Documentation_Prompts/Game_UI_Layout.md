# Standard Game UI Layout

This document describes the standard user interface (UI) layout for all individual game screens in the Vibe Retro Game Jam project, based on the provided image layout. The layout aims for consistency and provides essential information and controls to the player.

## Layout Structure

The standard UI layout divides the screen into several distinct sections, designed for clarity and ease of use.

-   **Header Area:** Occupies the top portion of the screen, containing global controls and information.
    -   Back to Hub Button: Allows the player to return to the main game selection hub.
    -   Sound Controls UI: Provides controls for adjusting music and sound effect volumes.
    -   Score and Time UI: Displays the player's current score and the remaining time for the game round.
-   **Central Game Area:** The primary focus area of the screen, dedicated to the game's visual representation and interaction.
    -   Game Area: The main rendering canvas for the game world, centered on the screen with a 5% padding around it to provide visual separation from the UI elements.
-   **Information and Instruction Area:** Located below the game area, providing guidance and context for the player.
    -   Goal of Game: Briefly explains the objective of the current game.
    -   GIF / Image: A visual aid (either an animated GIF or a static image) demonstrating the core gameplay or movement mechanic.
    -   Movement Instructions: Describes how the player controls their character or actions within the game.
    

## Section Details

### Header Area

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
