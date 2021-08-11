class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.selectorTimer = document.querySelector(selector);

    console.log(this.selectorTimer);

    this.daysText = this.selectorTimer.children[0].children[0];
    this.hoursText = this.selectorTimer.children[1].children[0];
    this.minsText = this.selectorTimer.children[2].children[0];
    this.secsText = this.selectorTimer.children[3].children[0];
  }

  timer() {
    const timeFromTheFuture = this.targetDate.getTime();

    setInterval(() => {
      const startTime = Date.now();
      const deltaTime = timeFromTheFuture - startTime;

      /*
   Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
    миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
   */
      const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));

      /*
    Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
    остатка % и делим его на количество миллисекунд в одном часе
    (1000 * 60 * 60 = миллисекунды * минуты * секунды)
   */
      const hours = Math.floor(
        (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      /*
    Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
    миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
   */
      const mins = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));

      /*
    Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
    миллисекунд в одной секунде (1000)
   */
      const secs = Math.floor((deltaTime % (1000 * 60)) / 1000);

      if (days < 10) {
        this.daysText.textContent = `0${days}`;
      }
      this.daysText.textContent = days;

      if (hours < 10) {
        this.hoursText.textContent = `0${hours}`;
      }
      this.hoursText.textContent = hours;

      if (mins < 10) {
        this.minsText.textContent = `0${mins}`;
      }
      this.minsText.textContent = mins;

      if (secs < 10) {
        this.secsText.textContent = `0${secs}`;
      }
      this.secsText.textContent = secs;

      return `${days}:${hours}:${mins}:${secs}`;
    }, 1000);
  }
}

const countdown = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('June 14, 2022'),
});

countdown.timer();
