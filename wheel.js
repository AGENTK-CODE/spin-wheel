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

const images = imageFiles.map(src=>{
if(!src) return null;
let img=new Image();
img.src=src;
return img;
});

let rotation = 0;
let spinning = false;

function drawWheel(){

ctx.clearRect(0,0,500,500);

let arc = 2*Math.PI/items.length;

for(let i=0;i<items.length;i++){

let angle = rotation + i*arc;

ctx.beginPath();
ctx.fillStyle=colors[i];

ctx.moveTo(250,250);
ctx.arc(250,250,250,angle,angle+arc);
ctx.fill();

ctx.save();

ctx.translate(250,250);
ctx.rotate(angle + arc/2);

ctx.textAlign="center";
ctx.fillStyle="black";
ctx.font="bold 14px Arial";

if(images[i]){
ctx.drawImage(images[i],-35,-90,70,70);
}

ctx.fillText(items[i],0,10);

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

function spinWheel(){

if(spinning) return;

let email=document.getElementById("email").value;

if(!email){
alert("Enter email first");
return;
}

spinning=true;

let arc = 360/items.length;
let winner = Math.floor(Math.random()*items.length);

let stopAngle = 360 - (winner*arc + arc/2);
let finalRotation = rotation + (360*6 + stopAngle)*(Math.PI/180);

let start=null;
let duration=4000;

function animate(ts){

if(!start) start=ts;

let progress = ts-start;
let percent = Math.min(progress/duration,1);

let ease = 1-Math.pow(1-percent,3);

rotation = ease*finalRotation;

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
