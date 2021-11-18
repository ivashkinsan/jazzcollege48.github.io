let keys = document.querySelectorAll(".key");
let audioArr = document.querySelectorAll("audio");
const audioAll = document.querySelectorAll('audio');
let monitor_header = document.querySelector('.monitor_header');
let monitor_footer = document.querySelector('.monitor_footer');

    
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
        keys[i].classList.add('active_one_key');
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
  
 

let interval_massive = ['м2', 'Б2', 'м3', 'Б3', 'ч4', 'ТТТ', 'ч5', 'м6', 'Б6', 'м7', 'Б7'];
let interval_massive_length =  Object.keys(interval_massive).length;


let find_interval = function(mass){
  let keys_length = Object.keys(mass).length;
  let random_key_number = Math.floor(Math.random()*keys_length);
  let random_int_number = Math.floor(Math.random()*interval_massive_length);
  console.log('Общая сумма = ' + random_key_number + ' + ' + random_int_number + ' = ' + (random_key_number+random_int_number));
  if ((random_key_number + 1) + random_int_number >= keys_length){
    random_key_number -= random_int_number + 1;
    console.log('random_key_number' + random_key_number);
  }
  let random_key = mass[random_key_number];
  let random_int = interval_massive[random_int_number];
  random_key.classList.add('active_one_key');

  // console.log(random_int);
  // console.log(random_int_number);
  // let key_step = random_key_number + interval_massive[step];
  monitor_header.textContent = interval_massive[random_int_number];
  // keys[key_step].classList.add('active_one_key');
}
find_interval(keys);
console.log();

monitor_footer.addEventListener('mousedown', function () {
  for(let i = 0; i < keys.length; i++){
    keys[i].classList.remove('active_one_key');
  }
  
  find_interval(keys);
});