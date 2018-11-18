import { GameObject } from '../game_object';
import { getTexture } from '../../data';
import { directionToCoordinates } from '../../helpers/direction_helper';

export class BaseEntity extends GameObject {
  constructor(textures, x, y, direction, solid) {
    super(`entities/${textures[0]}`, x, y, solid);
    this.textures = textures.map(texture => getTexture(`entities/${texture}.png`));
    this.direction = direction;
  }

  set direction(direction) {
    this._direction = direction;
    this.rotation = direction * (Math.PI / 2);
  }

  get direction() {
    return this._direction;
  }

  moveForward() {
    let { x, y } = directionToCoordinates(this.direction);
    this.setPosition(this.xPos + x, this.yPos + y);
  }

  /**
   * this function gets called every turn
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   * @param {GameCallbacks} gameCallbacks callbacks to alter the game
   */
  update(x, y, gameCallbacks) {
    // can get implemented by child classes
  }

  /**
   * this gets called whenever an entity sends a message
   * @param {object} message the message which got sent
   */
  onMessage(message) {
    // can get implemented by child classes
  }
}
