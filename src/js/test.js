const refs = {
  clockFace: document.querySelector('.timer'),
  startButton: document.querySelector('button[data-action-start]'),
  stopButton: document.querySelector('button[data-action-stop]'),
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  mins: document.querySelector('[data-value="mins"]'),
  secs: document.querySelector('[data-value="secs"]'),
};

refs.days.id = 'days';
refs.hours.id = 'hours';
refs.mins.id = 'mins';
refs.secs.id = 'secs';

setInterval(() => {
  const targetDate = new Date('June 14, 2022');
  const start = Date.now();
  const deltaTime = targetDate - start;

  const time = getTimeComponents(deltaTime);

  updateClockFace(time);

  //console.log(deltaTime);
}, 1000);

function getTimeComponents(time) {
  /*
   Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
    миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));

  /*
    Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
    остатка % и делим его на количество миллисекунд в одном часе
    (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );

  /*
    Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
    миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

  /*
    Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
    миллисекунд в одной секунде (1000)
   */
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

/* Обновление интерфейса таймера */
function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}
