const frameCount = 180; // Total number of frames
let currentFrame = 1;   // Start from frame 1
const images = [];
let isLoaded = false;
const imgElement = document.getElementById("sequence");
const preloader = document.getElementById("preloader");
const content = document.getElementById("content");

// 📌 Preload all images
function preloadImages() {
  let loadedImages = 0;

  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `./video/logoanimation/${i}.png`; // Adjust path
    img.onload = () => {
      loadedImages++;
      if (loadedImages === frameCount) {
        isLoaded = true;
        startAnimation();
      }
    };
    images.push(img);
  }
}

// 📌 Start the sequence animation
function startAnimation() {
  let fps = 60; // Adjust FPS (frames per second)
  let interval = 1000 / fps; // Convert to milliseconds

  function updateFrame() {
    imgElement.src = images[currentFrame - 1].src; // Fix indexing (arrays start from 0)
    currentFrame = (currentFrame % frameCount) + 1; // Loop animation
  }

  // Run animation at controlled FPS
  setInterval(updateFrame, interval);

  // 📌 Smoothly fade out preloader instead of hiding it instantly
  setTimeout(() => {
    preloader.classList.add("opacity-0", "pointer-events-none", "transition-opacity", "duration-1000");
  }, 3700); // Adjust duration as needed
}

// Start preloading images
preloadImages();
