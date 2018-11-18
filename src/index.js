import { settings, SCALE_MODES, utils } from 'pixi.js';
import { Game } from './game';
import { loadData, getJSON } from './data';
import { initializeBlocks } from './helpers/block_helper';
import { initializeEntities } from './helpers/entity_helper';

// adjust pixi.js settings
utils.sayHello('js-game-template');
settings.SCALE_MODE = SCALE_MODES.NEAREST;
settings.RESOLUTION = window.devicePixelRatio;

// create list of level-names
const levelNames = [1, 2, 3].map(i => `levels/level${i}`);

// load everything
let data = [
  'data/blocks.json',
  'data/entities.json',
  'images/frog.png'
];
for (let name of levelNames) {
  data.push(`data/${name}.json`);
}

loadData(data).then(
  () => loadData(getJSON('blocks').map(block => 'images/' + block.name))
).then(
  () => loadData(getJSON('entities').map(entity => entity.names
    .map(name => 'images/' + name))
    .reduce((acc, val) => acc.concat(val), []))
).then(() => {
  // initialize blocks
  initializeBlocks();
  initializeEntities();

  // start the game
  new Game(levelNames);
});
