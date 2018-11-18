import { BaseEntity } from './base_entity';

export class DoorEntity extends BaseEntity {
  constructor(x, y, direction, options) {
    super(DoorEntity.TEXTURES, x, y, direction, true);
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

DoorEntity.ID = 2;
DoorEntity.TEXTURES = ['door_closed', 'door_open'];
