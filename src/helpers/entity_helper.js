import { DIRECTION } from './direction_helper';

import { EndEntity } from '../game_objects/entities/end_entity';
import { LeverEntity } from '../game_objects/entities/lever_entity';
import { DoorEntity } from '../game_objects/entities/door_entity';
import { CanonEntity } from '../game_objects/entities/canon_entity';
import { CanonBallEntity } from '../game_objects/entities/canon_ball_entity';

export let entityClasses = [];

[EndEntity, LeverEntity, DoorEntity, CanonEntity, CanonBallEntity]
  .forEach(entityClass => entityClasses[entityClass.ID] = entityClass);

export function createEntity(id, x, y, direction = DIRECTION.UP, options = {}) {
  if (entityClasses[id] === undefined) {
    throw new Error(`no entity with id ${id} found`);
  }

  return new entityClasses[id](x, y, direction, options);
}
