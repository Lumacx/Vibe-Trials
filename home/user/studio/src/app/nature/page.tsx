// Assuming camera is your Three.js camera object
// Assuming GRID_WIDTH and GRID_HEIGHT are the dimensions of your grid
// Assuming TILE_SIZE is the size of each grid tile
// Assuming scene is your Three.js scene object

// Calculate the distance needed to view the entire grid
const aspectRatio = window.innerWidth / window.innerHeight;
const gridDiagonal = Math.sqrt(GRID_WIDTH * GRID_WIDTH + GRID_HEIGHT * GRID_HEIGHT) * TILE_SIZE;
const fov = camera.fov * Math.PI / 180; // Convert FOV to radians
const distance = gridDiagonal / (2 * Math.tan(fov / 2)) / Math.min(aspectRatio, 1); // Adjust distance based on aspect ratio

// Set the camera position to be above the center of the grid
camera.position.set((GRID_WIDTH * TILE_SIZE) / 2, distance, (GRID_HEIGHT * TILE_SIZE) / 2);

// Make the camera look at the center of the grid
camera.lookAt((GRID_WIDTH * TILE_SIZE) / 2, 0, (GRID_HEIGHT * TILE_SIZE) / 2);

// Optional: Adjust camera near and far planes if needed
// camera.near = distance / 2;
// camera.far = distance * 2;
// camera.updateProjectionMatrix();

// Optional: Add an orbit control or similar to allow user interaction with the camera
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set((GRID_WIDTH * TILE_SIZE) / 2, 0, (GRID_HEIGHT * TILE_SIZE) / 2);
// controls.update();