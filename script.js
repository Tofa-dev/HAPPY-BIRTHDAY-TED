/* ====== EDIT THESE ====== */
var NAME = "Ted";
var NAME2 = "Biggest";
var DOB = "24111994";            // DDMMYYYY, digits only
var SIGNED = "Tofa";     // how you sign off
var MESSAGE =
"Happy Birthday, " + NAME2 + "!\n\n" +
"i really do not Know where to start, You have really done so much for me. From putting me through school, providing for me, and even standing by me during my health issues and when i needed it the most.\n\n" +
"You are one of the  people I really look up to the most, and one of the reasons i know nothing is impossible if you stick to it.\n\n" +
"I really can never repay you for everything you have done for me, but I hope this year gives back to you everything you have given to others.\n\n" +
"Thank you for everything. I love you. i Hope you have a Very Event full BIRTHDAY!. Hope you enjoy your day, you deserve it! LIKE MAD 🫡22\n\n" +
"— " + SIGNED;
var JOKES = [
  
];
/* ======================== */

var $ = function(id){return document.getElementById(id)};
var pw = $("pw");

// auto-format as DD / MM / YYYY while typing
pw.addEventListener("input", function(){
  var d = pw.value.replace(/\D/g,"").slice(0,8), o = d;
  if (d.length > 4) o = d.slice(0,2)+" / "+d.slice(2,4)+" / "+d.slice(4);
  else if (d.length > 2) o = d.slice(0,2)+" / "+d.slice(2);
  pw.value = o;
});
pw.addEventListener("keydown", function(e){ if (e.key === "Enter") tryUnlock(); });
$("go").addEventListener("click", tryUnlock);

function tryUnlock(){
  var d = pw.value.replace(/\D/g,"");
  if (d === DOB){ unlock(); }
  else {
    $("err").textContent = "Hmm, that's not it. Try again 😏";
    var s = $("lock"); s.classList.remove("shake"); void s.offsetWidth; s.classList.add("shake");
  }
}

function unlock(){
  $("lock").classList.add("hidden");
  $("cardwrap").classList.remove("hidden");
  $("title").textContent = " Happy Birthday, " + NAME + "! 🙂‍↔️";
  burst(); typeOut(MESSAGE, $("msg"), function(){
    $("cur").classList.add("hidden");
    buildJokes(); $("jokes").classList.remove("hidden"); buildShow(); $("show").classList.remove("hidden"); $("again").classList.remove("hidden");
    burst();
  });
}

function typeOut(text, el, done){
  var i = 0;
  (function step(){
    el.textContent = text.slice(0, ++i);
    if (i < text.length) setTimeout(step, 10); else done();
  })();
}

function buildJokes(){
  var box = $("jokes");
  JOKES.forEach(function(j){
    var b = document.createElement("div"); b.className = "joke";
    var t = document.createElement("b"); t.textContent = j[0];
    var s = document.createElement("span"); s.textContent = j[1];
    b.appendChild(t); b.appendChild(s);
    b.addEventListener("click", function(){ b.classList.toggle("open"); });
    box.appendChild(b);
  });
}
$("more").addEventListener("click", burst);

// confetti
var cv = $("c"), cx = cv.getContext("2d"), parts = [], running = false;
function size(){ cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", size); size();
function burst(){
  var cols = ["#111111","#ffc857","#6bcB77","#4d96ff","#c77dff","#fff"];
  for (var i = 0; i < 140; i++){
    parts.push({x:cv.width/2, y:cv.height/3, vx:(Math.random()-.5)*14, vy:Math.random()*-12-2,
      r:Math.random()*6+3, c:cols[i%cols.length], rot:Math.random()*6, vr:(Math.random()-.5)*.3, life:0});
  }
  if (!running){ running = true; requestAnimationFrame(loop); }
}
function loop(){
  cx.clearRect(0,0,cv.width,cv.height);
  parts = parts.filter(function(p){ return p.y < cv.height + 20 && p.life < 260; });
  parts.forEach(function(p){
    p.vy += .25; p.x += p.vx; p.y += p.vy; p.vx *= .99; p.rot += p.vr; p.life++;
    cx.save(); cx.translate(p.x,p.y); cx.rotate(p.rot); cx.fillStyle = p.c;
    cx.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6); cx.restore();
  });
  if (parts.length) requestAnimationFrame(loop); else running = false;
}
var PHOTOS = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg",
  "images/9.jpg",
  "images/10.jpg",
  "images/11.jpg",
  "images/12.jpeg",
  "images/13.jpeg",
  "images/15.jpeg",
  "images/16.jpeg"
];
var cur = 0, timer = null, built = false;
function buildShow(){
  if (built) return; built = true;
  var fr = $("frame"), dots = $("dots");
  PHOTOS.forEach(function(src, i){
    var im = document.createElement("img"); im.src = src; im.alt = "Memory " + (i+1);
    if (i === 0) im.className = "on"; fr.insertBefore(im, $("prev"));
    var d = document.createElement("i"); if (i === 0) d.className = "on";
    d.addEventListener("click", function(){ go(i, true); }); dots.appendChild(d);
  });
  $("prev").addEventListener("click", function(){ go(cur-1, true); });
  $("next").addEventListener("click", function(){ go(cur+1, true); });
  fr.addEventListener("click", function(e){ if (e.target.closest(".nav")) return; openLB(); });
  var x0 = null;
  fr.addEventListener("touchstart", function(e){ x0 = e.touches[0].clientX; }, {passive:true});
  fr.addEventListener("touchend", function(e){
    if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1), true); x0 = null;
  });
  restart();
}
function go(n, manual){
  var ims = $("frame").querySelectorAll("img"), ds = $("dots").children;
  ims[cur].classList.remove("on"); ds[cur].classList.remove("on");
  cur = (n + PHOTOS.length) % PHOTOS.length;
  ims[cur].classList.add("on"); ds[cur].classList.add("on");
  if (manual) restart();
}
function openLB(){ clearInterval(timer); $("lbimg").src = PHOTOS[cur]; $("lb").classList.add("open"); }
function closeLB(){ $("lb").classList.remove("open"); restart(); }
function lbGo(n){ go(n); $("lbimg").src = PHOTOS[cur]; }
$("lbx").addEventListener("click", closeLB);
$("lbp").addEventListener("click", function(){ lbGo(cur-1); });
$("lbn").addEventListener("click", function(){ lbGo(cur+1); });
$("lb").addEventListener("click", function(e){ if (e.target === $("lb")) closeLB(); });
addEventListener("keydown", function(e){ if (!$("lb").classList.contains("open")) return; if (e.key === "Escape") closeLB(); if (e.key === "ArrowLeft") lbGo(cur-1); if (e.key === "ArrowRight") lbGo(cur+1); });
function restart(){ clearInterval(timer); timer = setInterval(function(){ go(cur+1); }, 3800); }
