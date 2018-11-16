import { Entity } from '../entities/entity.js';

export class Player extends Entity {

  constructor() {
    super("frog.png");
  }

  update({ up, left, down, right }) {
    super.update({ up, left, down, right });
  }
}
