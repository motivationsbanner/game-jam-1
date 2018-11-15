class KeyEventHandler {
  constructor() {
    // keep track of pressed keys
    this.pressedKeys = [];

    window.addEventListener('keydown', event => this.handleKeydown(event));
    window.addEventListener('keyup', event => this.handleKeyup(event));
  }

  handleKeydown(event) {
    this.pressedKeys[event.key] = true;
  }

  handleKeyup(event) {
    this.pressedKeys[event.key] = false;
  }

  isPressed(key) {
    return this.pressedKeys[key] === true;
  }
}

// create and export single instance
export const keyEventHandler = new KeyEventHandler();
