import { settings, SCALE_MODES, utils } from 'pixi.js';
import { Game } from './game';
import { loadData, getJSON } from './data';
import { initializeBlocks } from './helpers/block_helper';
import { initializeEntities } from './helpers/entity_helper';

// adjust pixi.js settings
utils.sayHello('js-game-template');
settings.SCALE_MODE = SCALE_MODES.NEAREST;
settings.RESOLUTION = window.devicePixelRatio;

// load everything
loadData([
  'data/blocks.json',
  'data/map.json',
  'data/entities.json',
  'images/frog.png'
]).then(
  () => loadData(getJSON('blocks').map(block => 'images/' + block.name))
).then(
  () =>loadData(getJSON('entities').map(entity => 'images/' + entity.name ))
).then(() => {
  // initialize blocks
  initializeBlocks();
  initializeEntities();

  // start the game
  new Game();
});
