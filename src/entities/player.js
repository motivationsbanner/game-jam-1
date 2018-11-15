import { Rectangle, Sprite } from 'pixi.js';
import { getTexture } from '../data';
import { Throttler } from '../utils/throttler';

// enums
const DIRECTION = {
  DOWN: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3
};
const DIRECTIONS = 4;

const WALKING_STATE = {
  STANDING_STILL: 0,
  WALKING_1: 1,
  WALKING_2: 2
};
const WALKING_STATES = 3;

const SPEED = 2;

export class Player extends Sprite {
  constructor() {
    super(getTexture('keggly'));

    let height = this.texture.height / WALKING_STATES;
    let width = this.texture.width / DIRECTIONS;

    this.texture.frame = new Rectangle(0, 0, width, height);

    this.direction = DIRECTION.DOWN;
    this.walkingState = WALKING_STATE.STANDING_STILL;

    this.walkingStateThrottler = new Throttler(() => this.updateWalkingState(), 10);
  }

  update({ up, left, down, right }) {
    let old = {
      walkingState: this.walkingState,
      direction: this.direction,
      x: this.x,
      y: this.y
    };

    if (up && !down) {
      this.moveUp();
    }

    if (left && !right) {
      this.moveLeft();
    }

    if (down && !up) {
      this.moveDown();
    }

    if (right && !left) {
      this.moveRight();
    }

    if (this.x !== old.x || this.y !== old.y) {
      if (this.walkingState === WALKING_STATE.STANDING_STILL) {
        this.walkingStateThrottler.reset();
      }

      this.walkingStateThrottler.run();
    } else {
      this.walkingState = WALKING_STATE.STANDING_STILL;
    }

    if (this.direction !== old.direction || this.walkingState !== old.walkingState) {
      this.updateTexture();
    }
  }

  moveUp() {
    this.y -= SPEED;
    this.direction = DIRECTION.UP;
  }

  moveLeft() {
    this.x -= SPEED;
    this.direction = DIRECTION.LEFT;
  }

  moveDown() {
    this.y += SPEED;
    this.direction = DIRECTION.DOWN;
  }

  moveRight() {
    this.x += SPEED;
    this.direction = DIRECTION.RIGHT;
  }

  updateWalkingState() {
    const W = WALKING_STATE;
    this.walkingState = this.walkingState === W.WALKING_1 ? W.WALKING_2 : W.WALKING_1;
  }

  updateTexture() {
    this.texture.frame.x = this.direction * this.width;
    this.texture.frame.y = this.walkingState * this.height;
    this.texture._updateUvs(); // tell pixi.js that the frame changed
  }
}
