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

const images = imageFiles.map(src => {
  if (!src) return null;
  const img = new Image();
  img.src = src;
  return img;
});

let angle = 0;
let spinning = false;

function drawWheel() {
  const arc = (2 * Math.PI) / items.length;

  ctx.clearRect(0, 0, 500, 500);

  for (let i = 0; i < items.length; i++) {
    const sliceAngle = angle + i * arc;

    ctx.beginPath();
    ctx.fillStyle = colors[i];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 250, sliceAngle, sliceAngle + arc);
    ctx.fill();

    ctx.save();
    ctx.translate(250, 250);
    ctx.rotate(sliceAngle + arc / 2);

    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = "bold 14px Arial";

    if (images[i]) {
      ctx.drawImage(images[i], -35, -70, 70, 70);
    }

    ctx.fillText(items[i], 0, 20);

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

function spinWheel() {
  if (spinning) return;

  const email = document.getElementById("email").value;
  if (!email) {
    alert("Enter email first");
    return;
  }

  spinning = true;

  const arcDeg = 360 / items.length;
  const winner = Math.floor(Math.random() * items.length);

  const stopAngle = 360 - (winner * arcDeg + arcDeg / 2);
  const totalRotation = 360 * 6 + stopAngle;

  let start = null;
  const duration = 4000;

  function animate(timestamp) {
    if (!start) start = timestamp;

    const progress = timestamp - start;
    const percent = Math.min(progress / duration, 1);

    const eased = 1 - Math.pow(1 - percent, 3);
    angle = (totalRotation * eased) * Math.PI / 180;

    drawWheel();

    if (percent < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      document.getElementById("result").innerText =
        "You won: " + items[winner];
    }
  }

  requestAnimationFrame(animate);
}
