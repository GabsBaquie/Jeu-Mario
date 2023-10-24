const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const startButton = document.querySelector("#startButton");
const restartButton = document.querySelector("#restartButton");
let loop;

// Event listener for the "Start" button
startButton.addEventListener("click", () => {
  startButton.style.display = "none"; // Hide the start button
  gameStart(); // Start the game loop
});

// Event listener for the "Restart" button
restartButton.addEventListener("click", () => {
  restartButton.style.display = "none"; // Hide the restart button
  resetGame(); // Reset the game
});

const resetGame = () => {
  clearInterval(loop); // Clear the game loop

  // Restore the initial state of Mario and animations
  mario.style.bottom = "0";
  mario.src = "./images/mario.gif";
  mario.style.width = "150px";
  mario.style.marginLeft = "0";

  pipe.style.left = "";

  gameStart(); // Start the game loop again
};

const gameStart = () => {
  // Clear the previous loop, if any
  clearInterval(loop);

  pipe.style.animation = "pipe-animation 1.5s infinite linear";
  clouds.style.animation = "clouds-animation 20s infinite linear";

  // Loop to check the position
  loop = setInterval(() => {
    // Check the position
    const pipePosition = pipe.offsetLeft;
    const marginPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");
    const cloudsPosition = clouds.offsetLeft;

    if (pipePosition <= 120 && pipePosition > 0 && marginPosition < 100) {
      // Pipe and clouds animations stop on collision
      pipe.style.animation = "none";
      clouds.style.animation = "none";

      pipe.style.left = `${pipePosition}px`;

      // Update Mario's appearance and position
      mario.style.bottom = `${marginPosition}px`;
      mario.src = "./images/game-over.png";
      mario.style.width = "75px";
      mario.style.marginLeft = "50px";

      clearInterval(loop);
      restartButton.style.display = "block";
    }
  }, 10);
};

// Function for Mario's jump
const jump = () => {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
};

document.addEventListener("keydown", jump);
