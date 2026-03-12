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

const images = [
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

let angle = 0;
let spinning = false;

const loadedImages = images.map(src=>{
if(!src) return null;
let img = new Image();
img.src = src;
return img;
});

function drawWheel(){

ctx.clearRect(0,0,500,500);

ctx.save();
ctx.translate(250,250);
ctx.rotate(angle);

let arc = 2*Math.PI/items.length;

for(let i=0;i<items.length;i++){

let start = i*arc;
let end = start + arc;

ctx.beginPath();
ctx.fillStyle = colors[i];
ctx.moveTo(0,0);
ctx.arc(0,0,250,start,end);
ctx.fill();

ctx.save();

ctx.rotate(start + arc/2);

ctx.textAlign="center";
ctx.fillStyle="black";
ctx.font="bold 14px Arial";

if(loadedImages[i]){
ctx.drawImage(loadedImages[i],-35,-110,70,70);
}

ctx.fillText(items[i],0,-60);

ctx.restore();

}

ctx.restore();

drawPointer();

}

function drawPointer(){

ctx.beginPath();
ctx.fillStyle="black";
ctx.moveTo(250,10);
ctx.lineTo(280,60);
ctx.lineTo(220,60);
ctx.fill();

}

drawWheel();

function spinWheel(){

if(spinning) return;

let email=document.getElementById("email").value;

if(!email){
alert("Enter email first");
return;
}

spinning=true;

let arcDeg = 360/items.length;
let winner = Math.floor(Math.random()*items.length);

let stopAngle = 360 - (winner*arcDeg + arcDeg/2);

let finalAngle = (360*6 + stopAngle)*Math.PI/180;

let startAngle = angle;
let startTime=null;
let duration=4000;

function animate(time){

if(!startTime) startTime=time;

let progress = time-startTime;
let percent = Math.min(progress/duration,1);

let ease = 1-Math.pow(1-percent,3);

angle = startAngle + ease*(finalAngle-startAngle);

drawWheel();

if(percent<1){
requestAnimationFrame(animate);
}
else{

spinning=false;

document.getElementById("result").innerText =
"You won: "+items[winner];

}

}

requestAnimationFrame(animate);

}

