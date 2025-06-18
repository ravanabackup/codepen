const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('game-container').appendChild(renderer.domElement);

const fullTextureWidth = 521;
const fullTextureHeight = 1021;
const subTextureWidth = 64;
const subTextureHeight = 64;

const textureLoader = new THREE.TextureLoader();

// Load Wall Texture
const wallTexture = textureLoader.load(
  'https://raw.githubusercontent.com/tommykho/tommykho.github.io/master/assets/images/MS-DOS_Wolfenstein3D_Walls.png', 
  (texture) => {
  texture.offset.set(131 / fullTextureWidth, 1 - (16 + subTextureHeight) / fullTextureHeight); // Flip Y-axis
  texture.repeat.set(subTextureWidth / fullTextureWidth, subTextureHeight / fullTextureHeight);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  // Apply to material
    const wallMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const wallGeometry = new THREE.PlaneGeometry(1, 1);
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);

    // Add wall to scene
    scene.add(wallMesh);
  },
  undefined,
  (error) => {
    console.error('Error loading texture:', error);
  }
);

// Load Exit Texture
const exitTexture = textureLoader.load(
  'https://raw.githubusercontent.com/tommykho/tommykho.github.io/master/assets/images/MS-DOS_Wolfenstein3D_Walls.png', 
  (texture) => {
  //texture.offset.set(393 / fullTextureWidth, 1 - (471 + subTextureHeight) / fullTextureHeight); // Flip Y-axis
  texture.offset.set(393 / fullTextureWidth, 1 - (471 + subTextureHeight) / fullTextureHeight); // Flip Y-axis
  texture.repeat.set(subTextureWidth / fullTextureWidth, subTextureHeight / fullTextureHeight);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  // Apply to material
    const wallMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const wallGeometry = new THREE.PlaneGeometry(1, 1);
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);

    // Add wall to scene
    scene.add(wallMesh);
  },
  undefined,
  (error) => {
    console.error('Error loading texture:', error);
  }
);

let canShoot = true;
function autoShoot() {
    if (canShoot) {
        const weapon = document.getElementById('weapon');
       //weapon.classList.add('firing');
        weapon.style.backgroundPosition = '-524px -1650px';
        canShoot = false;

        setTimeout(() => {
            //weapon.classList.remove('firing');
            weapon.style.backgroundPosition = '-264px -1664px';
            canShoot = true;
        }, 200);
    }
}

setInterval(autoShoot, 2000);

const mazeSize = 15;
const wallHeight = 2;
const cellSize = 2;

let maze = null;
let waypoints = [];

function findPath(maze, startX, startY, endX, endY) {
  const visited = Array(mazeSize).fill().map(() => Array(mazeSize).fill(false));
  const queue = [{x: startX, y: startY, path: []}];
  visited[startY][startX] = true;

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.x === endX && current.y === endY) {
      return current.path;
    }

    [[0,1], [1,0], [0,-1], [-1,0]].forEach(([dx, dy]) => {
      const newX = current.x + dx;
      const newY = current.y + dy;

      if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && 
          (maze[newY][newX] === 0 || maze[newY][newX] === 2) && 
          !visited[newY][newX]) {
        visited[newY][newX] = true;
        const newPath = [...current.path, {x: newX, y: newY}];
        queue.push({x: newX, y: newY, path: newPath});
      }
    });
  }
  return [];
}

function generateMaze() {
  const newMaze = Array(mazeSize).fill().map(() => Array(mazeSize).fill(1));
  const stack = [{x: 1, y: 1}];
  newMaze[1][1] = 0;

  function getUnvisitedNeighbors(x, y) {
    const neighbors = [];
    [[0,2], [2,0], [0,-2], [-2,0]].forEach(([dx, dy]) => {
      if (x+dx > 0 && x+dx < mazeSize-1 && y+dy > 0 && y+dy < mazeSize-1 && newMaze[y+dy][x+dx] === 1) {
        neighbors.push({x: x+dx, y: y+dy, wx: x+dx/2, wy: y+dy/2});
      }
    });
    return neighbors;
  }

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(current.x, current.y);

    if (neighbors.length === 0) {
      stack.pop();
    } else {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      newMaze[next.wy][next.wx] = 0;
      newMaze[next.y][next.x] = 0;
      stack.push({x: next.x, y: next.y});
    }
  }

  const exitX = mazeSize - 2;
  const exitY = mazeSize - 2;
  newMaze[exitY][exitX] = 2;

  // Generate waypoints after maze creation
  const path = findPath(newMaze, 1, 1, exitX, exitY);
  waypoints = path.map(point => ({
    x: point.x * cellSize - mazeSize * cellSize/2,
    z: point.y * cellSize - mazeSize * cellSize/2
  }));

  return newMaze;
}

let wallPositions = [];
let exitPosition = null;
let currentWaypointIndex = 0;

function createMazeGeometry() {
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
  }

  wallPositions.length = 0;
  const wallGeometry = new THREE.BoxGeometry(cellSize, wallHeight, cellSize);
  const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
  const exitMaterial = new THREE.MeshBasicMaterial({ map: exitTexture });

  for (let y = 0; y < mazeSize; y++) {
    for (let x = 0; x < mazeSize; x++) {
      if (maze[y][x] === 1) {
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        const wallX = x * cellSize - mazeSize * cellSize/2;
        const wallZ = y * cellSize - mazeSize * cellSize/2;
        wall.position.set(wallX, wallHeight/2, wallZ);
        scene.add(wall);
        wallPositions.push({
          minX: wallX - cellSize/2,
          maxX: wallX + cellSize/2,
          minZ: wallZ - cellSize/2,
          maxZ: wallZ + cellSize/2
        });
      } else if (maze[y][x] === 2) {
        const exit = new THREE.Mesh(wallGeometry, exitMaterial);
        const exitX = x * cellSize - mazeSize * cellSize/2;
        const exitZ = y * cellSize - mazeSize * cellSize/2;
        exit.position.set(exitX, wallHeight/2, exitZ);
        scene.add(exit);
        exitPosition = { x: exitX, z: exitZ };
      }
    }
  }

  const floorGeometry = new THREE.PlaneGeometry(mazeSize * cellSize, mazeSize * cellSize);
  const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x404040 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Reset waypoint index when creating new maze
  currentWaypointIndex = 0;
}

maze = generateMaze();
createMazeGeometry();
camera.position.set(-mazeSize * cellSize/2 + cellSize, 1, -mazeSize * cellSize/2 + cellSize);

let autoRotationSpeed = 0.02;
let autoMoveSpeed = 0.05;
let currentDirection = new THREE.Vector3(1, 0, 0);
let collisionCount = 0;
const maxCollisions = 3;
const playerRadius = 0.5;

function moveTowardsWaypoint() {
  if (currentWaypointIndex >= waypoints.length) return;

  const targetWaypoint = waypoints[currentWaypointIndex];
  const targetPosition = new THREE.Vector3(targetWaypoint.x, camera.position.y, targetWaypoint.z);
  const directionToWaypoint = targetPosition.clone().sub(camera.position).normalize();

  // Update current direction smoothly
  currentDirection.lerp(directionToWaypoint, 0.1);
  currentDirection.normalize();

  // Update camera rotation to face the direction of movement
  const targetRotation = Math.atan2(-currentDirection.x, -currentDirection.z); 
  camera.rotation.y = targetRotation;

  // Check if we've reached the current waypoint
  const distanceToWaypoint = camera.position.distanceTo(targetPosition);
  if (distanceToWaypoint < 0.5) {
    currentWaypointIndex++;
  }
}

function checkCollision(position) {
  const halfMazeSize = (mazeSize * cellSize) / 2;
  if (Math.abs(position.x) > halfMazeSize || Math.abs(position.z) > halfMazeSize) {
    return true;
  }

  for (const wall of wallPositions) {
    const buffer = 0.2;
    if (position.x + playerRadius > wall.minX - buffer &&
        position.x - playerRadius < wall.maxX + buffer &&
        position.z + playerRadius > wall.minZ - buffer &&
        position.z - playerRadius < wall.maxZ + buffer) {
      return true;
    }
  }

  if (exitPosition && 
      Math.abs(position.x - exitPosition.x) < cellSize/2 &&
      Math.abs(position.z - exitPosition.z) < cellSize/2) {
    document.getElementById('win-message').style.display = 'block';
    setTimeout(() => {
      document.getElementById('win-message').style.display = 'none';
      maze = generateMaze();
      createMazeGeometry();
      camera.position.set(-mazeSize * cellSize/2 + cellSize, 1, -mazeSize * cellSize/2 + cellSize);
      collisionCount = 0;
    }, 1000);
  }

  return false;
}

function animate() {
  requestAnimationFrame(animate);

  moveTowardsWaypoint();

  const moveStep = currentDirection.clone().multiplyScalar(autoMoveSpeed);
  const newPosition = camera.position.clone().add(moveStep);

  if (!checkCollision(newPosition)) {
    camera.position.copy(newPosition);
    collisionCount = 0;
  } else {
    camera.position.sub(moveStep.multiplyScalar(0.5));
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});