import { getJSON, getTexture } from '../data';

import { END_ENTITY_ID, EndEntity } from '../game_objects/entities/end_entity';
import { LEVER_ENTITY_ID, LeverEntity } from '../game_objects/entities/lever_entity';
import { DOOR_ENTITY_ID, DoorEntity } from '../game_objects/entities/door_entity';

let entityArray = [];
let entityClasses = [];

entityClasses[END_ENTITY_ID] = EndEntity;
entityClasses[LEVER_ENTITY_ID] = LeverEntity;
entityClasses[DOOR_ENTITY_ID] = DoorEntity;

export function initializeEntities() {
  for (let entity of getJSON('entities')) {
    entityArray[entity.id] = {
      textures: entity.names.map(getTexture),
      solid: entity.solid
    };
  }
}

function getEntityTextures(id) {
  return entityArray[id].textures;
}

export function isEntitySolid(id) {
  return entityArray[id].solid;
}

export function createEntity(id, x, y, options = {}) {
  return new entityClasses[id](getEntityTextures(id), x, y, isEntitySolid(id), options);
}
