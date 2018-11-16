class KeyEventHandler {
  constructor() {
    // keep track of pressed keys
    this.keysUp = [];
    
    window.addEventListener('keyup', event => this.handkleKeyUp(event));
  }

  handkleKeyUp(event) {
    this.keysUp[event.key] = true;
  }

  isKeyUp(key) {
    return this.keysUp[key] === true;
  }

  keysHandled() {
    // the keys got handled
    this.keysUp.forEach((_, index) => {
      // reset them
      keysUp[index] = false;
    });
  }
}

// create and export single instance
export const keyEventHandler = new KeyEventHandler();
