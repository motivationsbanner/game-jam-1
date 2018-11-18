import { loader } from 'pixi.js';

export function loadData(paths) {
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
export function getBaseTexture(name) {
  return getTexture(name).baseTexture;
}
