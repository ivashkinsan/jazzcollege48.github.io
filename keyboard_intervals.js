let keys = document.querySelectorAll(".key");
let audioArr = document.querySelectorAll("audio");
const audioAll = document.querySelectorAll('audio');
let monitor_header = document.querySelector('.monitor_header');
let monitor_footer = document.querySelector('.monitor_footer');
let user_answer = [];
let comp_answer = [];
let right_answer = 0;
let all_answer = [];
let meter = 0;
let interval_marker = '';
let result = document.querySelector('.result');



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
       
        let sound = audioAll[i];
        sound.play();
          });
    keys[i].addEventListener('mousedown', function () {
     
        let sound = audioAll[i];
        keys[i].classList.add('active_one_key');
        user_answer = i-1;
        
        sound.play();

        all_answer[meter] = {
          int_marker: interval_marker,
          comp: comp_answer,
          user: user_answer
          
        }

        if(comp_answer == user_answer){
          right_answer += 1;
          all_answer[meter].answer = true;
        } else {all_answer[meter].answer = false;}

        meter += 1;
        console.log(all_answer);

setTimeout(find_interval, 700, keys);

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
//очистка класса с подсветкой
for(let i = 0; i < keys.length; i++){
  keys[i].classList.remove('active_one_key');
}

  let keys_length = Object.keys(mass).length;
  let random_key_number = Math.floor(Math.random()*keys_length);
  let random_int_number = Math.floor(Math.random()*interval_massive_length);
  
  if ((random_key_number + 1) + random_int_number >= keys_length){
    random_key_number -= random_int_number + 1;
    
  }
  let random_key = mass[random_key_number];
  let random_int = interval_massive[random_int_number];
  random_key.classList.add('active_one_key');
  let sound = audioAll[random_key_number];
  sound.play();
  interval_marker = interval_massive[random_int_number];
  monitor_header.textContent = interval_massive[random_int_number];
  comp_answer = random_key_number + random_int_number;
}
find_interval(keys);

//таймер
let timeMinut = 2 * 60;

timer = setInterval(function () {
  seconds = timeMinut%60 // Получаем секунды
  minutes = timeMinut/60%60 // Получаем минуты
 // Условие если время закончилось то...
  if (timeMinut <= 0) {
      // Таймер удаляется
      clearInterval(timer);
      // Выводит сообщение что время закончилось
      alert("Время закончилось");
      result.style.display = 'flex';
      print_result();

  } else { // Иначе
      // Создаём строку с выводом времени
      if(seconds <= 9){
        seconds = '0' + seconds;
      }
      let strTimer = `0${Math.trunc(minutes)} : ${seconds}`;
      // Выводим строку в блок для показа таймера
      monitor_footer.innerHTML = strTimer;
    
  }
  --timeMinut; // Уменьшаем таймер
}, 1000)

let print_result = function(){
  console.log(all_answer.length);
  
  result.innerHTML += '<br>' + `из ${all_answer.length} ответов`;
  result.innerHTML += '<br>' + `правильно - ${right_answer}`;
  result.innerHTML += '<br>';
  
}

// ориентация экрана
var previousOrientation = window.orientation;
var checkOrientation = function(){
    if(window.orientation !== previousOrientation){
        previousOrientation = window.orientation;
        // orientation changed, do your magic here
    }
};

window.addEventListener("resize", checkOrientation, false);
window.addEventListener("orientationchange", checkOrientation, false);

// (optional) Android doesn't always fire orientationChange on 180 degree turns
setInterval(checkOrientation, 2000);