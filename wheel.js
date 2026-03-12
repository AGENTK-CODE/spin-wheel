const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const items = [
"Phone",
"Headphones",
"Gift Card",
"Coupon",
"Nothing"
];

const probabilities = [
0.01,
0.05,
0.14,
0.30,
0.50
];

let startAngle = 0;

function drawWheel(){

let arc = 2 * Math.PI / items.length;

for(let i=0;i<items.length;i++){

let angle = startAngle + i * arc;

ctx.beginPath();
ctx.fillStyle = i%2==0 ? "#f4b400" : "#4285f4";

ctx.moveTo(250,250);

ctx.arc(250,250,250,angle,angle+arc);

ctx.fill();

ctx.save();

ctx.fillStyle="black";
ctx.translate(250,250);
ctx.rotate(angle + arc/2);

ctx.fillText(items[i],100,10);

ctx.restore();

}

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

let email = document.getElementById("email").value;

if(!email){
alert("Enter email first");
return;
}

let winnerIndex = pickPrize();

document.getElementById("result").innerText =
"You won: " + items[winnerIndex];

}