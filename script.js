// Elements

const randomColorDisplay = document.getElementById('random-color-display');

const randomColorCode = document.getElementById('random-color-code');

const randomColorBtn = document.getElementById('random-color-btn');

const gradientDisplay = document.getElementById('gradient-display');

const gradientTypeSelect = document.getElementById('gradient-type');

const colorCountInput = document.getElementById('color-count');

const gradientCodeInput = document.getElementById('gradient-code');

const copyGradientBtn = document.getElementById('copy-gradient-btn');

const generateGradientBtn = document.getElementById('generate-gradient-btn');

const animateGradientBtn = document.getElementById('animate-gradient-btn');

const downloadGradientBtn = document.getElementById('download-gradient-btn');

let animationInterval;

let isAnimating = false;

// Helper: Generate Random Hex Color

function getRandomColor() {

  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

}

// Random Color Generator

function generateRandomColor() {

  const randomColor = getRandomColor();

  randomColorDisplay.style.backgroundColor = randomColor;

  randomColorCode.value = randomColor;

}

randomColorBtn.addEventListener('click', generateRandomColor);

// Gradient Generator

function generateGradient() {

  const colorCount = parseInt(colorCountInput.value, 10);

  const gradientType = gradientTypeSelect.value;

  const colors = Array.from({ length: colorCount }, getRandomColor).join(', ');

  const angle = Math.floor(Math.random() * 360);

  let gradient;

  if (gradientType === 'linear') {

    gradient = `linear-gradient(${angle}deg, ${colors})`;

  } else if (gradientType === 'radial') {

    gradient = `radial-gradient(circle, ${colors})`;

  } else if (gradientType === 'conic') {

    gradient = `conic-gradient(from ${angle}deg, ${colors})`;

  }

  gradientDisplay.style.background = gradient;

  gradientCodeInput.value = `background: ${gradient};`;

}

generateGradientBtn.addEventListener('click', generateGradient);

// Copy Gradient Code

function copyGradientCode() {

  gradientCodeInput.select();

  document.execCommand('copy');

  alert('Gradient CSS copied to clipboard!');

}

copyGradientBtn.addEventListener('click', copyGradientCode);

// Animate Gradient

function toggleAnimation() {

  if (isAnimating) {

    clearInterval(animationInterval);

    animateGradientBtn.textContent = "Start Animation";

    animateGradientBtn.classList.remove('active');

  } else {

    animationInterval = setInterval(generateGradient, 500);

    animateGradientBtn.textContent = "Stop Animation";

    animateGradientBtn.classList.add('active');

  }

  isAnimating = !isAnimating;

}

animateGradientBtn.addEventListener('click', toggleAnimation);

// Download Gradient

function downloadGradient() {

  const canvas = document.createElement('canvas');

  const ctx = canvas.getContext('2d');

  const width = 300;

  const height = 150;

  canvas.width = width;

  canvas.height = height;

  const gradient = ctx.createLinearGradient(0, 0, width, height);

  gradient.addColorStop(0, getRandomColor());

  gradient.addColorStop(1, getRandomColor());

  ctx.fillStyle = gradient;

  ctx.fillRect(0, 0, width, height);

  const link = document.createElement('a');

  link.download = 'gradient.png';

  link.href = canvas.toDataURL('image/png');

  link.click();

}

downloadGradientBtn.addEventListener('click', downloadGradient);

// Initial Display

generateRandomColor();

generateGradient();