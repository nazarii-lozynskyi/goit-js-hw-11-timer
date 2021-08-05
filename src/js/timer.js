const refs = {
  clockFace: document.querySelector('.timer'),
  startButton: document.querySelector('button[data-action-start]'),
  stopButton: document.querySelector('button[data-action-stop]'),
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.isActive = false;
    this.onTick = onTick;

    //this.init();
  }

  /* Инициализация таймера */
  // init() {
  //   const time = this.getTimeComponents(0);
  //   this.onTick(time);
  // }

  start() {
    if (this.isActive) {
      return;
    }
    /* Кнопка "stopButton" активна */
    refs.stopButton.removeAttribute('disabled');

    /* Кнопка "startButton" неактивна */
    refs.startButton.setAttribute('disabled', true);

    const startTime = Date.now();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = currentTime - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  stop() {
    /* Кнопка "startButton" активна */
    refs.startButton.removeAttribute('disabled');
    /* Кнопка "stopButton" неактивна */
    refs.stopButton.setAttribute('disabled', true);

    clearInterval(this.intervalId);
    this.isActive = false;

    const time = this.getTimeComponents(0);
    this.onTick(time);
    // refs.days.textContent = '00';
    // refs.hours.textContent = '00';
    // refs.mins.textContent = '00';
    // refs.secs.textContent = '00';
  }

  getTimeComponents(time) {
    /*
   Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
    миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
    Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
    остатка % и делим его на количество миллисекунд в одном часе
    (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );

    /*
    Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
    миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
    Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
    миллисекунд в одной секунде (1000)
   */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new Timer({
  onTick: updateClockFace,
});

/* Добавление элементам свойства "ID" */
refs.days.id = 'days';
refs.hours.id = 'hours';
refs.mins.id = 'mins';
refs.secs.id = 'secs';

/* Добавление слушателя на кнопки "startButton" и "stopButton"*/
refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  timer.start();
}

function onStopButtonClick() {
  timer.stop();
}

//timer.start();

/* Обновление интерфейса таймера */
function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}
