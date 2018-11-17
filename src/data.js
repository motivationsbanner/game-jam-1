import { loader } from 'pixi.js';

export function loadData(paths) {
  return new Promise(resolve => {
    loader.add(paths).load(resolve);
  });
}

export function getJSON(name) {
  return loader.resources[`data/${name}.json`].data;
}

export function getTexture(name) {
  return loader.resources[`images/${name}`].texture;
}
export function getBaseTexture(name) {
  return getTexture(name).baseTexture;
}
