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
0.10,
0.40,
0.30
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

const images = [];

for(let i=0;i<imageFiles.length;i++){

if(imageFiles[i]){
let img = new Image();
img.src = imageFiles[i];
images.push(img);
}else{
images.push(null);
}

}

function drawWheel(){

let arc = 2 * Math.PI / items.length;

for(let i=0;i<items.length;i++){

let angle = startAngle + i * arc;

ctx.beginPath();
ctx.fillStyle = colors[i];

ctx.moveTo(250,250);
ctx.arc(250,250,250,angle,angle+arc);
ctx.fill();

ctx.save();

ctx.translate(250,250);
ctx.rotate(angle + arc/2);

ctx.fillStyle="black";
ctx.font="bold 14px Arial";

if(images[i]){
ctx.drawImage(images[i],60,-50,80,80);
}

ctx.fillText(items[i],60,40);

ctx.restore();

}

drawPointer();

}

function drawPointer(){

ctx.beginPath();
ctx.fillStyle="black";

ctx.moveTo(250,5);
ctx.lineTo(280,50);
ctx.lineTo(220,50);

ctx.fill();

}

drawWheel();

function pickPrize(){

let rand = Math.random();
let sum = 0;

for(let i=0;i<probabilities.length;i++){

sum += probabilities[i];

if(rand < sum){
return i;
}

}

}

function spinWheel(){

if(spinning) return;

let email = document.getElementById("email").value;

if(!email){
alert("Enter email first");
return;
}

spinning = true;

let winnerIndex = pickPrize();

let arc = 360/items.length;

let finalAngle = (360*5) + ((items.length - winnerIndex) * arc);

let duration = 4000;
let start = null;

function animate(timestamp){

if(!start) start = timestamp;

let progress = timestamp - start;

let angle = easeOut(progress,0,finalAngle,duration);

startAngle = angle * Math.PI / 180;

ctx.clearRect(0,0,500,500);

drawWheel();

if(progress < duration){
requestAnimationFrame(animate);
}else{

spinning=false;

document.getElementById("result").innerText =
"You won: " + items[winnerIndex];

}

}

requestAnimationFrame(animate);

}

function easeOut(t,b,c,d){

t/=d;
return -c * t*(t-2) + b;

}
