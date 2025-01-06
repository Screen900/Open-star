const gameArea = document.getElementById("game-area");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const clickSound = document.getElementById("click-sound");
const bombSound = document.getElementById("bomb-sound");

let score = 0;
let timeLeft = 30;

// Function to create a star
function createStar() {
  const star = document.createElement("div");
  star.classList.add("star");
  
  // Random position
  const x = Math.random() * (gameArea.clientWidth - 30);
  const y = Math.random() * (gameArea.clientHeight - 30);
  star.style.left = `${x}px`;
  star.style.top = `${y}px`;
  
  // Add star to the game area
  gameArea.appendChild(star);
  
  // Remove star after animation ends
  star.addEventListener("animationend", () => {
    star.remove();
  });
  
  // Add click event to increase score
  star.addEventListener("click", () => {
    score++;
    scoreElement.textContent = score;
    clickSound.play();
    star.remove();
  });
}

// Function to create a bomb
function createBomb() {
  const bomb = document.createElement("div");
  bomb.classList.add("bomb");
  
  // Random position
  const x = Math.random() * (gameArea.clientWidth - 30);
  const y = Math.random() * (gameArea.clientHeight - 30);
  bomb.style.left = `${x}px`;
  bomb.style.top = `${y}px`;
  
  // Add bomb to the game area
  gameArea.appendChild(bomb);
  
  // Remove bomb after animation ends
  bomb.addEventListener("animationend", () => {
    bomb.remove();
  });
  
  // Add click event to decrease score
  bomb.addEventListener("click", () => {
    score -= 2; // Decrease score
    scoreElement.textContent = score;
    bombSound.play();
    bomb.remove();
  });
}

// Timer function
function startTimer() {
  const timer = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;
    
    if (timeLeft === 0) {
      clearInterval(timer);
      alert(`Time's up! Your final score is: ${score}`);
    }
  }, 1000);
}

// Generate stars and bombs
function startGame() {
  setInterval(createStar, 1000);
  setInterval(createBomb, 3000); // Bombs appear every 3 seconds
  startTimer();
}

startGame();