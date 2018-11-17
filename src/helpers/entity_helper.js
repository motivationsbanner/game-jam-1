import { getJSON, getTexture } from '../data';
import { END_ENTITY_ID, EndEntity } from '../entities/end_entity';

let entityArray = [];
let entityClasses = [];

entityClasses[END_ENTITY_ID] = EndEntity;

export function initializeEntities() {
  for (let entity of Array.from(getJSON('entities'))) {
    entityArray[entity.id] = { texture: getTexture(entity.name), solid: entity.solid };
  }
}

function getBlockTexture(id) {
  return entityArray[id].texture;
}

function isBlockSolid(id) {
  return entityArray[id].solid;
}

export function createEntity(id, x, y) {
  return new entityClasses[id](getBlockTexture(id), x, y, isBlockSolid(id));
}
