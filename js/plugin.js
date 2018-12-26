const timer = (function () {

  let countdown,
      timerDisplay,
      endTime,
      alarmSound;


  // ініціалізація модуля
  function init(settings) {
    timerDisplay = document.querySelector(settings.timerDisplaySelector);
    endTime = document.querySelector(settings.endTimeSelector);
    alarmSound = new Audio(settings.alarmSound);
    return this;
  }
  // Функція початку відліку 
  function start(seconds) {
    if(typeof seconds !== "number") return new Error('Please provide seconds!');

    const now = Date.now();
    const then = now + seconds * 1000;
    stop();
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
      const secondsLeft = Math.round( (then - Date.now()) / 1000 );
      if (secondsLeft < 0) {
        clearInterval(countdown);
        alarmSound.play();
        return;
      }
      displayTimeLeft(secondsLeft);
    }, 1000);
  }
  
  function displayTimeLeft(seconds) {
    const reminderSeconds = seconds % 60;
    const minutes = Math.floor(seconds / 60);
    const reminderMinutes = minutes % 60;
    const hours = Math.floor(minutes / 60);
    const reminderHours = hours % 24;
    const days = Math.floor(hours / 24);
    const reminderDays = days % 24;
    const month = Math.floor(days / 30)

    const display = month ? `${month}:${reminderDays}:${reminderHours < 10 ? '0' : ''}${reminderHours}:${reminderMinutes < 10 ? '0' : ''}${reminderMinutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`
            :reminderDays ? `${reminderDays}:${reminderHours < 10 ? '0' : ''}${reminderHours}:${reminderMinutes < 10 ? '0' : ''}${reminderMinutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`
            : reminderHours ? `${reminderHours}:${reminderMinutes < 10 ? '0' : ''}${reminderMinutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`
            : reminderMinutes ? `${reminderMinutes}:${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`
            :`${reminderSeconds < 10 ? '0' : ''}${reminderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
  }

  function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const date = end.getDate();
    const month = end.getMonth() + 1;
    const year = end.getFullYear();
    endTime.textContent = `Be back at ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes} ${date}/${month < 10 ? '0' : ''}${month}/${year}`;
  }

  function stop() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
    clearInterval(countdown);
    displayTimeLeft(0);
    endTime.textContent = '';
  }

  return {
    init,
    startTimer,
    start,
    stop
  }
})();

const buttons = document.querySelectorAll('[data-time]');

timer.init({
  timerDisplaySelector: '.display__time-left',
  endTimeSelector :'.display__end-time',
  alarmSound: 'audio/bell.mp3'
  }).start(4000);
// Start timer on click
function startTimer(e) {
  const seconds = Number(this.dataset.time);
  timer.start(seconds);
}
const stop_btn = document.querySelector('.stop_button');
buttons.forEach(btn => btn.addEventListener('click', startTimer));
stop_btn.addEventListener('click', function () {
    timer.stop();
});

const seconds_input = document.querySelector('input');
const seconds_form = document.querySelector('form');
seconds_form.addEventListener('submit', function(e) {
    e.preventDefault();
    if ((seconds_input.value.length > 0) && ( Number(seconds_input.value))){
        timer.start(Number(seconds_input.value));
        console.log(seconds_input.value);
    }
    else
        alert('Please provide seconds!');
});



























