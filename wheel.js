const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const items = [
  "AC",
  "WASHING MACHINE",
  "TABLET",
  "LAPTOP",
  "OVEN",
  "NOTHING"
];

const probabilities = [
  0.01,
  0.05,
  0.14,
  0.20,
  0.10,
  0.50
];

const imageFiles = [
  "ac.jpg",
  "washingmachine.jpg",
  "tablet.jpg",
  "laptop.jpg",
  "oven.jpg",
  null
];

const colors = [
  "#FF5733",
  "#33B5FF",
  "#9B59B6",
  "#2ECC71",
  "#F1C40F",
  "#95A5A6"
];

let startAngle = 0;
let spinning = false;

// preload images
const images = imageFiles.map(src => {
  if (!src) return null;
  const img = new Image();
  img.src = src;
  return img;
});

function drawWheel() {
  const arc = (2 * Math.PI) / items.length;

  for (let i = 0; i < items.length; i++) {
    const angle = startAngle + i * arc;

    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, angle, angle + arc);
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(angle + arc / 2);

    ctx.fillStyle = "black";
    ctx.font = "bold 14px Arial";

    if (images[i]) {
      ctx.drawImage(images[i], 60, -50, 80, 80);
    }

    ctx.fillText(items[i], 60, 40);

    ctx.restore();
  }

  drawPointer();
}

function drawPointer() {
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.moveTo(250, 5);
  ctx.lineTo(280, 50);
  ctx.lineTo(220, 50);
  ctx.fill();
}

drawWheel();

function pickPrize() {
  let rand = Math.random();
  let sum = 0;

  for (let i = 0; i < probabilities.length; i++) {
    sum += probabilities[i];
    if (rand < sum) return i;
  }
}

function spinWheel() {
  if (spinning) return;

  const email = document.getElementById("email").value;
  if (!email) {
    alert("Enter email first");
    return;
  }

  spinning = true;

  const winnerIndex = pickPrize();
  const arc = 360 / items.length;

  // pointer is at top (0°). We rotate wheel so the CENTER of the slice lands there
  const stopAngle = 360 - (winnerIndex * arc + arc / 2);

  const finalAngle = 360 * 5 + stopAngle;

  const duration = 4000;
  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;

    const progress = timestamp - start;
    const angle = easeOut(progress, 0, finalAngle, duration);

    startAngle = (angle * Math.PI) / 180;

    ctx.clearRect(0, 0, 500, 500);
    drawWheel();

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      document.getElementById("result").innerText =
        "You won: " + items[winnerIndex];
    }
  }

  requestAnimationFrame(animate);
}

function easeOut(t, b, c, d) {
  t /= d;
  return -c * t * (t - 2) + b;
}
