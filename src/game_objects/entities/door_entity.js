import { BaseEntity } from './base_entity';

export const DOOR_ENTITY_ID = 2;

export class DoorEntity extends BaseEntity {
  constructor(textures, x, y, solid, options) {
    super(textures, x, y, solid);
    this.colors = options.colors; // undefined means all colors
    this.setOpen(options.open === true);
  }

  setOpen(value) {
    this.open = value;
    this.solid = !this.open;
    this.texture = this.textures[this.open ? 1 : 0];
  }

  onMessage(message) {
    if (message.type === 'toggle-doors') {
      if (this.colors === undefined || this.colors.indexOf(message.color) !== -1) {
        this.setOpen(!this.open);
      }
    }
  }
}
