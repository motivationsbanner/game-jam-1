import { BaseEntity } from './base_entity';
import { CanonBallEntity } from './canon_ball_entity';
import { Throttler } from '../../utils/throttler';

export class CanonEntity extends BaseEntity {
  constructor(x, y, direction, options) {
    super(CanonEntity.TEXTURES, x, y, direction, true);

    if (options.interval === undefined) {
      options.interval = 5; // default value
    }

    this.throttler = new Throttler((params) =>
      this.spawnCanonBall(params), options.interval);
  }

  update(x, y, gameCallbacks) {
    this.throttler.run({ gameCallbacks });
  }

  spawnCanonBall({ gameCallbacks }) {
    gameCallbacks.spawnEntity(new CanonBallEntity(this.xPos, this.yPos, this.direction));
  }
}

CanonEntity.ID = 3;
CanonEntity.TEXTURES = ['canon'];
