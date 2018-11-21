import { DIRECTION } from "../helpers/direction_helper";

/**
 * handle touch and keyboard input
 */
export class InputHandler {
  constructor(callback) {
    this.callback = callback;

    window.addEventListener('click', event => this.handleTouch(event));
    window.addEventListener('keydown', event => this.handleKeyDown(event));
  }

  handleKeyDown(event) {
    switch (event.key) {
      case 'w':
      case 'ArrowUp':
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.UP });
        break;
      case 'a':
      case 'ArrowLeft':
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.LEFT });
        break;
      case 's':
      case 'ArrowDown':
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.DOWN });
        break;
      case 'd':
      case 'ArrowRight':
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.RIGHT });
        break;
      case 'r':
      case 'Escape':
        this.callback({ action: ACTION.RESET_LEVEL });
        break;
      case 'n':
        this.callback({ action: ACTION.LOAD_NEXT_LEVEL });
        break;
    }
  }

  handleTouch(event) {
    const { screenX, screenY } = event;
    const { innerWidth, innerHeight } = window;

    const upperLeft = innerHeight * (1 - 1 / innerWidth * screenX) > screenY;
    const upperRight = innerHeight / innerWidth * screenX > screenY;

    if (upperLeft) {
      if (upperRight) {
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.UP });
      } else {
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.LEFT });
      }
    } else {
      if (upperRight) {
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.RIGHT });
      } else {
        this.callback({ action: ACTION.MOVE, direction: DIRECTION.DOWN });
      }
    }
  }
}

export const ACTION = {
  MOVE: 0,
  RESET_LEVEL: 1,
  LOAD_NEXT_LEVEL: 2
};
