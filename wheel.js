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

let startAngle = 0;
let spinning = false;

const images = imageFiles.map(src=>{
if(!src) return null;
let img = new Image();
img.src = src;
return img;
});

function drawWheel(){

let arc = 2*Math.PI/items.length;

for(let i=0;i<items.length;i++){

let angle = startAngle + i*arc;

ctx.beginPath();
ctx.fillStyle = colors[i];

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
ctx.drawImage(images[i],-35,-70,70,70);
}

ctx.fillText(items[i],0,20);

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

let email = document.getElementById("email").value;

if(!email){
alert("Enter email first");
return;
}

spinning=true;

let duration = 4000;
let start=null;

let finalAngle = 360*5 + Math.random()*360;

function animate(timestamp){

if(!start) start=timestamp;

let progress = timestamp-start;

let angle = easeOut(progress,0,finalAngle,duration);

startAngle = angle*Math.PI/180;

ctx.clearRect(0,0,500,500);

drawWheel();

if(progress < duration){

requestAnimationFrame(animate);

}else{

spinning=false;

let degrees = (startAngle*180/Math.PI)%360;
let arc = 360/items.length;

let index = Math.floor((360-degrees+arc/2)/arc)%items.length;

document.getElementById("result").innerText =
"You won: "+items[index];

}

}

requestAnimationFrame(animate);

}

function easeOut(t,b,c,d){

t/=d;
return -c*t*(t-2)+b;

}
