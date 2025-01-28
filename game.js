console.log("Game started!"); 
// انتخاب المان‌های بازی
const dino = document.getElementById("dino");
const gameArea = document.getElementById("gameArea");
let cactusCounter = 0;
let fireAvailable = false;
let season = "summer"; // فصل اولیه

// شروع بازی
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" || event.code === "ArrowUp") {
    jump();
  }
  if (event.code === "KeyF" && fireAvailable) {
    shootFire();
  }
});

// تابع پرش داینو
function jump() {
  if (!dino.classList.contains("jump")) {
    dino.classList.add("jump");
    setTimeout(() => {
      dino.classList.remove("jump");
    }, 500);
  }
}

// ایجاد کاکتوس‌های تصادفی
function spawnCactus() {
  const cactus = document.createElement("div");
  cactus.classList.add("cactus");
  gameArea.appendChild(cactus);
  cactus.style.left = "100%";

  let moveCactus = setInterval(() => {
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
    
    // بررسی برخورد
    if (cactusLeft < 50 && cactusLeft > 0 && !dino.classList.contains("jump")) {
      alert("Game Over");
      clearInterval(moveCactus);
      cactus.remove();
    }

    // حرکت کاکتوس
    if (cactusLeft <= 0) {
      cactus.remove();
      cactusCounter++;
      handleGameMechanics();
      clearInterval(moveCactus);
    } else {
      cactus.style.left = `${cactusLeft - 10}px`;
    }
  }, 50);
}

// مکانیزم‌های بازی
function handleGameMechanics() {
  if (cactusCounter === 100) {
    alert("قدرت آتش فعال شد!");
    fireAvailable = true;
  }

  if (cactusCounter >= 150) {
    spawnRandomObstacles();
  }

  if (cactusCounter === 200 && season === "summer") {
    alert("فصل بازی به زمستان تغییر کرد!");
    changeSeasonToWinter();
  }
}

// شلیک آتش
function shootFire() {
  const fireball = document.createElement("div");
  fireball.classList.add("fireball");
  gameArea.appendChild(fireball);

  fireball.style.left = "50px";
  fireball.style.bottom = "50px";

  let moveFireball = setInterval(() => {
    let fireballLeft = parseInt(fireball.style.left);

    if (fireballLeft > window.innerWidth) {
      fireball.remove();
      clearInterval(moveFireball);
    } else {
      fireball.style.left = `${fireballLeft + 15}px`;
    }
  }, 30);
}

// ایجاد موانع تصادفی
function spawnRandomObstacles() {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameArea.appendChild(obstacle);
  obstacle.style.left = "100%";

  let moveObstacle = setInterval(() => {
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft < 50 && obstacleLeft > 0 && !dino.classList.contains("jump")) {
      alert("برخورد با مانع تصادفی!");
      clearInterval(moveObstacle);
      obstacle.remove();
    }

    if (obstacleLeft <= 0) {
      obstacle.remove();
      clearInterval(moveObstacle);
    } else {
      obstacle.style.left = `${obstacleLeft - 10}px`;
    }
  }, 50);
}

// تغییر فصل به زمستان
function changeSeasonToWinter() {
  season = "winter";
  gameArea.style.backgroundColor = "lightblue";
  // اضافه کردن برف یا چالش‌های جدید اینجا می‌تواند انجام شود
}

// تولید کاکتوس‌ها به صورت مداوم
setInterval(spawnCactus, 2000);
