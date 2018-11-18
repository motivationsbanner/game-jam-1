import { loader } from 'pixi.js';

export function loadData(levelNames, blockClasses, entityClasses) {
  // player
  let paths = ['images/frog.png'];

  // levels
  for (let levelName of levelNames) {
    paths.push(`data/${levelName}.json`);
  }

  // blocks
  for (let blockClass of blockClasses) {
    paths.push(`images/blocks/${blockClass.TEXTURE}.png`);
  }

  // entities
  for (let entityClass of entityClasses) {
    for (let texture of entityClass.TEXTURES) {
      paths.push(`images/entities/${texture}.png`);
    }
  }

  return new Promise(resolve => {
    loader.add(paths).load(resolve);
  });
}

function getResource(name) {
  let resource = loader.resources[name];

  if (resource === undefined) {
    throw new Error(`resource ${name} not found!`);
  }

  return resource;
}

export function getJSON(name) {
  return getResource(`data/${name}.json`).data;
}

export function getTexture(name) {
  return getResource(`images/${name}`).texture;
}
