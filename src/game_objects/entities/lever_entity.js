import { BaseEntity } from './base_entity';

export class LeverEntity extends BaseEntity {
  constructor(x, y, direction, options) {
    super(LeverEntity.TEXTURES, x, y, direction, false);

    this.isActive = false;
    this.color = options.color; // undefined is allowed
  }

  update(x, y, gameCallbacks) {
    if (x === this.xPos && y === this.yPos) {
      this.isActive = !this.isActive;

      this.texture = this.textures[this.isActive ? 1 : 0];
      gameCallbacks.sendMessage({ type: 'toggle-doors', color: this.color });
    }
  }
}

LeverEntity.ID = 1;
LeverEntity.TEXTURES = ['lever_deactivated', 'lever_activated'];
