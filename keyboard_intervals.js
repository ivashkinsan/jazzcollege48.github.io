let monitor_header = document.querySelector('.monitor_header');
let monitor_footer = document.querySelector('.monitor_footer');
let user_answer = [];
let comp_answer = [];
let right_answer = 0;
let all_answer = [];
let meter = 0;
let interval_marker = '';
let result = document.querySelector('.result');

let interval_massive = ['м2', 'Б2', 'м3', 'Б3', 'ч4', 'ТТТ', 'ч5', 'м6', 'Б6', 'м7', 'Б7'];
let interval_massive_length =  Object.keys(interval_massive).length;

let two_sound;
//воспроизведение семплов
document.addEventListener('DOMContentLoaded', init);
        //звуки
const SOUNDS = {};
let allSrcSound = document.querySelectorAll('.key');

//воспроизведение семплов продолжение

for(let i=0; i < allSrcSound.length; i++){
  SOUNDS[allSrcSound[i].dataset.file] = null;
  }        
  let allowSound = true; //разрешить звуки  
  
  function init(){//создание функции init - обработчик тегов
              for (let i = 0; i < allSrcSound.length; i++){
              allSrcSound[i].addEventListener('click', play);     
            };
          }
          // console.log(allSrcSound[1]);
  function play(ev,firstSound){//создание функции play
    console.log(ev);
              let p;
              if(ev){
                p = ev.currentTarget;//текущая цель
                ev.preventDefault();//предотвратить дефолт
              }
              if (firstSound){
                p = firstSound;
              }             
              
              let fn = p.getAttribute('data-file');//получить аттрибут дата-файл от параграфа
              let src = './media/' + fn + '.mp3';//описать путь к файлу
              if( SOUNDS[fn] ){
                  SOUNDS[fn].pause();
                  SOUNDS[fn] = null;
              }
              // console.log(src);
              //let audio = document.getElementById("a");
              let audio = document.createElement('audio'); //создать элемент аудио
              //audio.removeAttribute('controls');
              //document.body.appendChild(audio);
              audio.src = src; // добавить аудио элементу аттрибут src
              audio.volume = 1; //установить громкость элемента
              //change the starting position in the file
              audio.currentTime = 0.2;
              if(allowSound){
                  SOUNDS[fn] = audio; //записать в саунд по имени переменную аудио
                  audio.setAttribute('data-file', fn);//установить аттрибут
                  if(firstSound){
                  two_sound = audio;
                  console.log('второй добавлен = ' + two_sound);
                  }
                  if(ev){
                    two_sound.play();
                    // two_sound.play();
                  }

                  // console.log(play() + '');
                  audio.play(); //воспроизвести элемент
                  
              }       
              /**********************
              Event list for <audio> and <video>
              https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events
              ***********************/
              //listen for the event that ends sound
              audio.addEventListener('playing', goAudio);
              audio.addEventListener('ended', doneAudio);
  }
  
  
  function goAudio(ev){
    // console.log(ev.target.src, 'has started playing');
  }
  
  function doneAudio(ev){
    // console.log(ev.target.src, 'has finished playing');
    let fn = ev.target.getAttribute('data-file');
     SOUNDS[fn] = null;
  }

//************* функция найди интервал
let find_interval = function(mass){
  //очистка класса с подсветкой
  for(let i = 0; i < allSrcSound.length; i++){
    allSrcSound[i].classList.remove('active_one_key');
  }
  
    let allSrcSound_length = Object.keys(mass).length;
    let random_key_number = Math.floor(Math.random()*allSrcSound_length);
    let random_int_number = Math.floor(Math.random()*interval_massive_length);
    
    if ((random_key_number + 1) + random_int_number >= allSrcSound_length){
      random_key_number -= random_int_number + 1;
    }
    let random_key = mass[random_key_number];
    random_key.classList.add('active_one_key');
    // console.log(allSrcSound[random_key_number].dataset.file);
   play('',random_key)
  
     
    interval_marker = interval_massive[random_int_number];
    monitor_header.textContent = interval_massive[random_int_number];
    comp_answer = random_key_number + random_int_number;
  }
  
//******************* слушаем события
for (let i = 0; i < allSrcSound.length; i++){
  //событие тач
  allSrcSound[i].addEventListener('touchstart', function () {
    allSrcSound[i].classList.add('active_one_key');
      user_answer = i-1;
          });
//событие мауз даун
allSrcSound[i].addEventListener('mousedown', function () {  
  allSrcSound[i].classList.add('active_one_key');
        user_answer = i-1;
              
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
        // console.log(all_answer);
setTimeout(find_interval, 700, allSrcSound);
          });  
};

find_interval(allSrcSound);

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

//****************** */ ориентация экрана
// var previousOrientation = window.orientation;
// var checkOrientation = function(){
//     if(window.orientation !== previousOrientation){
//         previousOrientation = window.orientation;
//         // orientation changed, do your magic here
//     }
// };
// window.addEventListener("resize", checkOrientation, false);
// window.addEventListener("orientationchange", checkOrientation, false);
// (optional) Android doesn't always fire orientationChange on 180 degree turns
// setInterval(checkOrientation, 2000);


var context = new AudioContext(); // создаем аудио контекст - объект
var source = context.createBufferSource(); // создаем аудио буффер - объект
console.log('context' + context);
console.log(context);
console.log('source' + source);
console.log(source);

console.log('context.destination' + context.destination);
console.log(context.destination);

source.connect(context.destination); // объект аудио дестинешн нода

var xhr = new XMLHttpRequest();
xhr.open("GET", "audio.mp3", true); // забираем с сервера аудио файл
xhr.responseType = "arraybuffer";
xhr.onload = function(e) {
  context.decodeAudioData(this.response, function(buffer){
    source.buffer = buffer;
    source.play();
  })
}