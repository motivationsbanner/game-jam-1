export class Throttler {
  constructor(callback, interval) {
    this.callback = callback;
    this.interval = interval;
    this.cooldown = 0;
  }

  run(params = {}) {
    // only run callback every interval-th time
    if (this.cooldown === 0) {
      this.callback(params);
      this.cooldown = this.interval;
    }

    this.cooldown -= 1;
  }

  reset() {
    this.cooldown = 0;
  }
}
