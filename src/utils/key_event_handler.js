class KeyEventHandler {
  constructor() {
    // keep track of pressed keys
    this.keysUp = [];
  }

  handkleKeyUp(event) {
    this.keysUp[event.key] = true;
  }

  isKeyUp(key) {
    return this.keysUp[key] === true;
  }

  keysHandled() {
    // the keys got handled    
    this.keysUp.forEach(function (valuem, index, array) {
      console.log("what");
    });

    this.keysUp.forEach((_, index, l) => {
      // reset them
      console.log(index);
      this.keysUp[index] = false;
    });
  }
}

// create and export single instance
export const keyEventHandler = new KeyEventHandler();
