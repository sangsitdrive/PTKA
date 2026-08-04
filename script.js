// =========================
// FORUM KOMUNIKASI WARGA PTKA 2026
// Manual Presentation + Swipe
// =========================

const TOTAL_SLIDES=31;
let current=1;

const loading=document.getElementById("loading");
const cover=document.getElementById("cover");
const viewer=document.getElementById("viewer");
const slide=document.getElementById("slide");
const nomor=document.getElementById("nomor");
const music=document.getElementById("music");

window.onload=()=>{
 setTimeout(()=>{
   loading.style.display="none";
   cover.style.display="flex";
 },1200);
};

document.getElementById("startBtn").onclick=()=>{
 cover.style.display="none";
 viewer.style.display="block";
 loadSlide();
 music.play().catch(()=>{});
};

function loadSlide(){
 slide.classList.remove("fade");
 void slide.offsetWidth;
 slide.classList.add("fade");
 slide.src=`assets/images/slide${String(current).padStart(2,"0")}.jpg`;
 nomor.textContent=`${current} / ${TOTAL_SLIDES}`;
 preload();
}

function preload(){
 let n=current+1;
 if(n>TOTAL_SLIDES)n=1;
 const img=new Image();
 img.src=`assets/images/slide${String(n).padStart(2,"0")}.jpg`;
}

function nextSlide(){
 current=current<TOTAL_SLIDES?current+1:1;
 loadSlide();
}

function prevSlide(){
 current=current>1?current-1:TOTAL_SLIDES;
 loadSlide();
}

function toggleFullscreen(){
 if(!document.fullscreenElement){
   document.documentElement.requestFullscreen();
 }else{
   document.exitFullscreen();
 }
}

document.addEventListener("keydown",(e)=>{
 if(e.key==="ArrowRight")nextSlide();
 if(e.key==="ArrowLeft")prevSlide();
 if(e.key==="f"||e.key==="F")toggleFullscreen();
});

let sx=0,sy=0;
viewer.addEventListener("touchstart",(e)=>{
 sx=e.changedTouches[0].screenX;
 sy=e.changedTouches[0].screenY;
},{passive:true});

viewer.addEventListener("touchend",(e)=>{
 const dx=e.changedTouches[0].screenX-sx;
 const dy=e.changedTouches[0].screenY-sy;
 if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>50){
   if(dx<0)nextSlide();
   else prevSlide();
 }
},{passive:true});

let lastTap=0;
viewer.addEventListener("touchend",()=>{
 const now=Date.now();
 if(now-lastTap<300)toggleFullscreen();
 lastTap=now;
});
