import { GameObject } from '../game_object';

export class BaseBlock extends GameObject {
  constructor(texture, x, y, solid) {
    super(`blocks/${texture}`, x, y, solid);
  }
}
