const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let angleInput = document.getElementById("angle");
let fireButton = document.getElementById("fireButton");
let rangeDisplay = document.getElementById("range");
let speedDisplay = document.getElementById("speedDisplay");
let scoreDisplay = document.getElementById("score");

// Game variables
const gravity = 9.8;
let projectile = { x: 100, y: 500, dx: 0, dy: 0, active: false };
let target = { x: Math.random() * 400 + 300, y: 500, radius: 20 };
let speed = Math.random() * 30 + 50; // Random speed between 50 and 80 m/s
let time = 0;
let score = 0;

function drawCannon(angle) {
  ctx.save();
  ctx.translate(100, 500);
  ctx.rotate(-angle);
  ctx.fillStyle = "black";
  ctx.fillRect(0, -5, 50, 10);
  ctx.restore();

  // Cannon base
  ctx.beginPath();
  ctx.arc(100, 500, 20, 0, Math.PI * 2);
  ctx.fillStyle = "gray";
  ctx.fill();
}

function drawProjectile() {
  ctx.beginPath();
  ctx.arc(projectile.x, projectile.y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

function drawTarget() {
  // Target outline
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Target center
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.radius / 2, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function updateProjectile() {
  if (projectile.active) {
    time += 0.05;
    projectile.x = 100 + projectile.dx * time;
    projectile.y = 500 - (projectile.dy * time - 0.5 * gravity * time ** 2);

    // Check if projectile hits the target
    const dist = Math.sqrt((projectile.x - target.x) ** 2 + (projectile.y - target.y) ** 2);
    if (dist <= target.radius) {
      projectile.active = false;
      alert("You hit the target! +10 points!");
      score += 10;
      resetGame();
      return;
    }

    // Check if projectile hits the ground
    if (projectile.y >= canvas.height) {
      projectile.active = false;
      alert("You missed! Try again.");
      resetGame();
    }
  }
}

function resetGame() {
  projectile.x = 100;
  projectile.y = 500;
  projectile.active = false;
  time = 0;
  target.x = Math.random() * 400 + 300; // Reposition target
  speed = Math.random() * 30 + 50; // Reset speed

  // Display the correct horizontal distance between cannon and target
  const distance = Math.abs(target.x - projectile.x).toFixed(2);
  rangeDisplay.textContent = `Distance: ${distance} m`;
  speedDisplay.textContent = speed.toFixed(1);
  scoreDisplay.textContent = score;
}

function fireProjectile() {
  if (!projectile.active) {
    const angleDeg = parseFloat(angleInput.value);
    const angleRad = (angleDeg * Math.PI) / 180;

    projectile.dx = speed * Math.cos(angleRad);
    projectile.dy = speed * Math.sin(angleRad);
    projectile.active = true;
    time = 0;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const angle = (parseFloat(angleInput.value) * Math.PI) / 180;
  drawCannon(angle);
  drawTarget();
  if (projectile.active) {
    drawProjectile();
    updateProjectile();
  }

  requestAnimationFrame(gameLoop);
}

fireButton.addEventListener("click", fireProjectile);

// Initialize game
const initialDistance = Math.abs(target.x - projectile.x).toFixed(2);
rangeDisplay.textContent = `Distance: ${initialDistance} m`;
speedDisplay.textContent = speed.toFixed(1);
scoreDisplay.textContent = score;
gameLoop();
