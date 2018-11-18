import { BaseEntity } from './base_entity';

export class CanonBallEntity extends BaseEntity {
  constructor(x, y, direction) {
    super(CanonBallEntity.TEXTURES, x, y, direction, false);
  }

  update(x, y, gameCallbacks) {
    this.moveForward();

    if (this.xPos === x && this.yPos === y) {
      gameCallbacks.killPlayer();
    }

    if (gameCallbacks.isSolid(this.xPos, this.yPos)) {
      gameCallbacks.remove(this);
    }
  }
}

CanonBallEntity.ID = 4;
CanonBallEntity.TEXTURES = ['canon_ball'];
