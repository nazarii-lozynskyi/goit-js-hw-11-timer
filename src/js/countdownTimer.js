const refs = {
  clockFace: document.querySelector('.timer'),
  startButton: document.querySelector('button[data-action-start]'),
  stopButton: document.querySelector('button[data-action-stop]'),
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
  inputDay: document.getElementById('day'),
  inputMonth: document.getElementById('month'),
  inputYear: document.getElementById('year'),
};

refs.inputDay.addEventListener('change', writesTheEnteredDay);
refs.inputMonth.addEventListener('change', writesTheEnteredMonth);
refs.inputYear.addEventListener('change', writesTheEnteredYear);

function writesTheEnteredDay() {
  return refs.inputDay.value;
  //console.log(inputDay);
}

function writesTheEnteredMonth() {
  return refs.inputMonth.value;
  //console.log(inputMonth);
}

function writesTheEnteredYear() {
  return refs.inputYear.value;
  //console.log(inputYear);
}

/* Добавление элементам свойства "ID" */
refs.days.id = 'days';
refs.hours.id = 'hours';
refs.mins.id = 'mins';
refs.secs.id = 'secs';

/* Добавление слушателя на кнопки "startButton" и "stopButton"*/
refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  countdownTimer.start();

  let inputDay = writesTheEnteredDay();
  let inputMonth = writesTheEnteredMonth();
  let inputYear = writesTheEnteredYear();

  let inputDate = `${inputMonth} ${inputDay}, ${inputYear}`;
  //console.log(`${inputMonth} ${inputDay}, ${inputYear}`);
  return inputDate;
}

function onStopButtonClick() {
  countdownTimer.stop();
}

/* Таймер */

class CountdownTimer {
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

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      let targetDate = new Date(onStartButtonClick());
      const deltaTime = targetDate - startTime;
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

const countdownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('June 14, 2022'),
  onTick: updateClockFace,
});

/* Обновление интерфейса таймера */
function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}
