let keys = document.querySelectorAll(".key");
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

//воспроизведение семплов
document.addEventListener('DOMContentLoaded', init);
        //звуки
        const SOUNDS = {
            'clear-throat':null,
            'doorbell':null,
            'static':null
        };
        let allSrcSound = document.querySelectorAll('.key');
        console.log(allSrcSound[0].dataset.file);
        for(let i=0; i < allSrcSound.length; i++){
        SOUNDS[allSrcSound[i].dataset.file] = null;
        }        
        // console.log(SOUNDS);
        let allowSound = true; //разрешить звуки  

        function init(){//создание функции init - обработчик тегов
            for (let i = 0; i < allSrcSound.length; i++){
            allSrcSound[i].addEventListener('click', play);

            
          };
        }
        
        function play(ev){//создание функции play
            let p = ev.currentTarget;//текущая цель
            ev.preventDefault();//предотвратить дефолт
            
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
            audio.volume = 0.2; //установить громкость элемента
            //change the starting position in the file
            //audio.currentTime = 0.8;
            if(allowSound){
                SOUNDS[fn] = audio; //записать в саунд по имени переменную аудио
                audio.setAttribute('data-file', fn);//установить аттрибут
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

//******************* слушаем события
for (let i = 0; i < keys.length; i++){
  //событие тач
    keys[i].addEventListener('touchstart', function () {
      keys[i].classList.add('active_one_key');
      user_answer = i-1;
          });
//событие мауз даун
    keys[i].addEventListener('mousedown', function () {  
        keys[i].classList.add('active_one_key');
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
        console.log(all_answer);

setTimeout(find_interval, 700, keys);
          });  
};


//************* функция найди интервал
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
  random_key.classList.add('active_one_key');
   
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


