class Clock {
  constructor({ frequency, tick = ()=>{} }) {
    this.period = 1000/frequency;
    this.tick = tick;
  }

  start() {
    if(!this.interval) {
      this.interval = setInterval(this.tick, this.period);
    }
  }

  stop() {
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  step() {
    if(!this.interval) {
      this.tick();
    }
  }

  updateFrequency(frequency) {
    this.period = 1000/frequency;
    if(this.interval) {
      clearInterval(this.interval);
      this.interval = setInterval(this.tick, this.period);
    }
  }

  get isRunning() {
    return !!this.interval;
  }
}

export { Clock };
