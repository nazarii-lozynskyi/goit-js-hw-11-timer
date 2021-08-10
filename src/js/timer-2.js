class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    // this.selector = selector;
    this.selectorTimer = document.querySelector(selector);

    console.log(this.selectorTimer);

    this.daysText = this.selectorTimer.children[0].children[0];
    this.hoursText = this.selectorTimer.children[1].children[0];
    this.minsText = this.selectorTimer.children[2].children[0];
    this.secsText = this.selectorTimer.children[3].children[0];
  }

  timer() {
    const futureTime = this.targetDate.getTime();

    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = futureTime - currentTime;
      // console.log(deltaTime);
      const days = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (deltaTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((deltaTime % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((deltaTime % (1000 * 60)) / 1000);

      this.daysText.textContent = days < 10 ? `0${days}` : days;
      this.hoursText.textContent = hours < 10 ? `0${hours}` : hours;
      this.minsText.textContent = mins < 10 ? `0${mins}` : mins;
      this.secsText.textContent = secs < 10 ? `0${secs}` : secs;

      return `${days}:${hours}:${mins}:${secs}`;
    }, 1000);
  }
}

const countdown = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 5, 2022'),
  // targetDate: Date.now(),
});

countdown.timer();
