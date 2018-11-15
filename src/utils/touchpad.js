export class Touchpad {
  constructor(eventEmitter) {
    // add touch-eventlisteners for primitive touchpad
    eventEmitter.interactive = true;
    eventEmitter.on('touchstart', event => this.handleTouchStart(event));
    eventEmitter.on('touchmove', event => this.handleTouchMove(event));
    eventEmitter.on('touchend', event => this.handleTouchEnd(event));
    eventEmitter.on('touchendoutside', event => this.handleTouchEnd(event));
  }

  handleTouchStart(event) {
    // save initial position
    this.initialPosition = event.data.global.clone();
  }

  handleTouchMove(event) {
    // calculate angle and update directions accordingly
    this.resetDirections();

    let deltaY = event.data.global.y - this.initialPosition.y;
    let deltaX = event.data.global.x - this.initialPosition.x;
    this.rad = Math.atan2(deltaY, deltaX);
    let index = Math.floor((this.rad + Math.PI / 8) / (Math.PI / 4));

    switch (index) {
      case -4:
      case 4:
        this.left = true;
        break;
      case -3:
        this.left = this.up = true;
        break;
      case -2:
        this.up = true;
        break;
      case -1:
        this.up = this.right = true;
        break;
      case 0:
        this.right = true;
        break;
      case 1:
        this.right = this.down = true;
        break;
      case 2:
        this.down = true;
        break;
      case 3:
        this.down = this.left = true;
    }
  }

  handleTouchEnd(event) {
    this.resetDirections();
  }

  resetDirections() {
    this.up = this.left = this.down = this.right = false;
  }
}
