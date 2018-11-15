import { loader } from 'pixi.js';

export function loadData(paths, callback) {
  loader.add(paths).load(callback);
}

export function getJSON(name) {
  return loader.resources[`data/${name}.json`].data;
}

export function getTexture(name) {
  return loader.resources[`images/${name}.bmp`].texture;
}
export function getBaseTexture(name) {
  return getTexture(name).baseTexture;
}
