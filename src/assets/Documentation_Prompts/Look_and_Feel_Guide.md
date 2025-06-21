# Vibe Retro Game Jam - UI/UX Look and Feel Standards

This document outlines the visual and interaction design principles for the "Vibe Retro Game Jam" project, based on the existing components and styles within the codebase. The goal is to create a cohesive and appealing retro-inspired aesthetic with modern usability.

## Overall Aesthetic

The project aims for a **low-poly 3D retro-inspired aesthetic** with vibrant color palettes. The user interface (UI) should complement this by being **clean, readable, and intuitive**, using elements that evoke a nostalgic arcade feel while maintaining modern usability standards.

## Font Styles

*   **Primary Content Font:** `Inter`. This is used for general text, paragraphs, and body copy, providing good readability.
*   **UI/Heading Font (Retro-Inspired Placeholder):** While not explicitly defined by a custom font file in the provided structure, the intention is to use a pixelated or retro-futuristic font for UI elements like headings, scores, timers, and buttons to enhance the retro theme. The current components might use `Inter` as a default, but this is an area for implementing a dedicated retro font (e.g., "Press Start 2P" from Google Fonts as mentioned in the GDD).

## Color Palette

The project utilizes a palette that balances vibrant, retro arcade colors with more muted backgrounds for readability. Specific game themes will have dominant colors, but the overall UI elements should maintain a consistent, harmonious scheme.

*   **Primary/Accent Colors:** Bright, saturated colors for interactive elements, highlights, and key information (e.g., bright blues, greens, reds, yellows).
*   **Background Colors:** Darker, more subdued colors for panels, containers, and overall screen backgrounds to make UI elements pop and reduce eye strain.
*   **Text Colors:** High contrast text colors against backgrounds for maximum readability (e.g., white or light grey on dark backgrounds, black or dark grey on light backgrounds).
*   **Themed Colors:** Each game level will incorporate a dominant color palette related to its element (Fire - reds/oranges, Stone - greys/browns, Wind - blues/whites, Water - blues/greens, Nature - greens/browns).

## UI Element Design

Based on the `src/components/ui` directory, the UI elements favor a clean, modern approach with subtle retro touches.

*   **Buttons:**
    *   Typically have rounded corners (`rounded-md` or similar Tailwind classes).
    *   Feature clear background colors and contrasting text.
    *   Hover and active states should provide clear visual feedback (e.g., slight color change, subtle shadow).
    *   Variants exist for different purposes (e.g., primary, secondary, outline, ghost) as suggested by the common UI component patterns.
*   **Cards:**
    *   Used to group related information or act as containers for interactive elements.
    *   Likely have rounded corners and a subtle background color or border to distinguish them from the main background.
    *   Padding is used to provide internal spacing.
*   **Input Fields:**
    *   Clean design with clear borders or backgrounds.
    *   Focus states are important for usability.
    *   Rounded corners are likely applied consistently with other elements.
*   **Dialogs/Alerts:**
    *   Modal windows for important information or actions.
    *   Likely centered on the screen with an overlay background to draw focus.
    *   Consistent styling with rounded corners and clear calls to action.
*   **Other Components (Accordion, Checkbox, Slider, etc.):**
    *   Adhere to the general principles of rounded corners, clear visual states, and consistent spacing.
    *   Functionality should be straightforward and intuitive.

## Layout and Spacing

*   **Grid-Based Layouts:** Games like Stone Labyrinth and Forest Crossing will use a grid-based structure for gameplay, but general UI layouts should also consider alignment and consistent spacing.
*   **Padding and Margins:** Consistent use of padding within components and margins between components to ensure visual hierarchy and prevent elements from feeling cramped.
*   **Responsiveness:** The UI should adapt to different screen sizes (mobile, tablet, desktop) to provide a good experience across devices.

## Interaction Design Principles

*   **Clear Feedback:** User actions (hovering, clicking, interacting with game objects) should provide immediate and clear visual and audio feedback.
*   **Intuitive Navigation:** Transitioning between the homepage and different game levels should be simple and obvious.
*   **Consistency:** UI elements and interactions should behave consistently throughout the application.
*   **Performance:** The UI should feel responsive, even when rendering 3D elements. Asset loading should ideally include indicators.

This document serves as a guide for maintaining a consistent and effective look and feel throughout the Vibe Retro Game Jam project.