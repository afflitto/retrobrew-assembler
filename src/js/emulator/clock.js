class Clock {
  constructor({ frequency, tick = ()=>{} }) {
    this.period = 1000/frequency;
    this.tick = tick;
  }

  start() {
    this.interval = setInterval(this.tick, this.period);
  }

  stop() {
    if(this.interval) {
      clearInterval(this.interval);
    }
  }

  step() {
    if(!this.interval) {
      this.tick();
    }
  }

  setTickFunction(fn) {
    this.tick = fn;
  }
}

export { Clock };
