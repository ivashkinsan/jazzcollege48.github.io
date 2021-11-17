let keys = document.querySelectorAll(".key");
let audioArr = document.querySelectorAll("audio");
const audioAll = document.querySelectorAll('audio');
let monitor_header = document.querySelector('.monitor_header');


    
//заполнить буфер
let mySoundBuffer = new AudioContext();
mySoundBuffer.createBuffer(2, 22050, 44100);
// mySoundBuffer = audioAll[1];
// console.log(mySoundBuffer);
// for(i = 0; i < audioAll.length; i++){
//   audioAll[i].createBuffer(2*30);
// }


for (let i = 0; i < keys.length; i++){
    keys[i].addEventListener('touchstart', function () {
        console.log('KLICK');
        let sound = audioAll[i];
        sound.play();
          });
    keys[i].addEventListener('mousedown', function () {
        console.log('KLICK mousedown');
        let sound = audioAll[i];
        sound.play();
          });  
};

window.AudioContext = window.AudioContext || window.webkitAudioContext;
 
 function play( snd ) {
   var audioCtx = new AudioContext();
  
   var request = new XMLHttpRequest();
   request.open( "GET", snd, true );
   request.responseType = "arraybuffer";
   request.onload = function () {
     var audioData = request.response;
  
     audioCtx.decodeAudioData(
       audioData,
       function ( buffer ) {
         var smp = audioCtx.createBufferSource();
         smp.buffer = buffer;
         smp.connect( audioCtx.destination );
         smp.start( 0 );
       },
       function ( e ) {
         alert( "Error with decoding audio data" + e.err );
       }
     );
   };
   request.send();
 }
  
 

let interval_massive = {м2: 1, Б2: 2, м3: 3, Б3: 4, ч4: 5, ТТТ: 6, ч5: 7, м6: 8, Б6: 9, м7: 10, Б7: 11};

let find_interval = function(mass, step){
  console.log(Object.keys(mass));
  console.log(Math.floor(Math.random()*mass.length));
  let random_key = mass[Math.floor(Math.random()*mass.length)]
  console.log(random_key);
  keys[random_key].classList.add('active_one_key');
  // console.log(interval_massive);
  let key_step = random_key + interval_massive[step];
  monitor_header.textContent = step;
  keys[key_step].classList.add('active_one_key');
}
find_interval(interval_massive,'ч5')
console.log();
