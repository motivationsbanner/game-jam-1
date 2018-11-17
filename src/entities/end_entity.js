import { Entity } from './entity';

export const END_ENTITY_ID = 0;

export class EndEntity extends Entity {
  constructor(texture, x, y, solid) {
    super(texture, x, y, solid);
  }

  /**
   * Updates the Position of the Element
   */
  update() {
    // TOOD
  }
}
