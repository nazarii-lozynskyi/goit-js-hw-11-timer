class CountdownTimer {
  constructor({ selector, targetDate, onTick }) {
    this.onTick = onTick;
    this.isActive = false;
    this.intervalId = null;

    this.targetDate = targetDate;
    this.selectorTimer = document.querySelector(selector);

    console.log(this.selectorTimer);

    this.days = this.selectorTimer.children[0].children[0];
    this.hours = this.selectorTimer.children[1].children[0];
    this.mins = this.selectorTimer.children[2].children[0];
    this.secs = this.selectorTimer.children[3].children[0];
  }

  timer() {
    if (this.isActive) {
      return;
    }
    const timeFromTheFuture = this.targetDate.getTime();

    this.intervalId = setInterval(() => {
      const startTime = Date.now();
      const deltaTime = timeFromTheFuture - startTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
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

function updateClockFace({ days, hours, mins, secs }) {
  this.days.textContent = `${days}`;
  this.hours.textContent = `${hours}`;
  this.mins.textContent = `${mins}`;
  this.secs.textContent = `${secs}`;
}

const countdown = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 1, 2022'),
  onTick: updateClockFace,
});

countdown.timer();
