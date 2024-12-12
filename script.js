const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let angleInput = document.getElementById("angle");
let speedInput = document.getElementById("speed");
let fireButton = document.getElementById("fireButton");
let targetDistanceDisplay = document.getElementById("targetDistance");
let scoreDisplay = document.getElementById("score");
let missesDisplay = document.getElementById("misses");

const gravity = 9.8;
let projectile = { x: 100, y: 500, vx: 0, vy: 0, active: false };
let target = { x: Math.random() * 400 + 300, y: 500, radius: 20 };
let score = 0;
let misses = 0;

function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#87ceeb");
  gradient.addColorStop(1, "#f0e68c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawCannon(angle) {
  ctx.save();
  ctx.translate(100, 500);
  ctx.rotate(-angle);
  ctx.fillStyle = "black";
  ctx.fillRect(0, -5, 50, 10);
  ctx.restore();

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
  ctx.beginPath();
  ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
  ctx.fillStyle = "blue";
  ctx.fill();
}

function updateProjectile() {
  if (projectile.active) {
    const dt = 0.05;
    projectile.x += projectile.vx * dt;
    projectile.y -= projectile.vy * dt - 0.5 * gravity * dt ** 2;
    projectile.vy -= gravity * dt;

    const distToTarget = Math.sqrt((projectile.x - target.x) ** 2 + (projectile.y - target.y) ** 2);
    if (distToTarget < target.radius) {
      alert("Hit! +10 Points");
      score += 10;
      resetGame();
    } else if (projectile.y > canvas.height) {
      misses++;
      if (misses >= 3) {
        alert("Game Over! Final Score: " + score);
        score = 0;
        misses = 0;
      }
      resetGame();
    }
  }
}

function resetGame() {
  projectile.active = false;
  target.x = Math.random() * 400 + 300;
  targetDistanceDisplay.textContent = Math.abs(target.x - 100).toFixed(2);
  scoreDisplay.textContent = score;
  missesDisplay.textContent = misses;
}

function fireProjectile() {
  if (!projectile.active) {
    const angleDeg = parseFloat(angleInput.value);
    const speed = parseFloat(speedInput.value);

    const angleRad = (angleDeg * Math.PI) / 180;
    projectile.vx = speed * Math.cos(angleRad);
    projectile.vy = speed * Math.sin(angleRad);
    projectile.x = 100;
    projectile.y = 500;
    projectile.active = true;
  }
}

function gameLoop() {
  drawBackground();
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

resetGame();
gameLoop();
