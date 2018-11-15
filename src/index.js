import { settings, SCALE_MODES, utils } from 'pixi.js';
import { Game } from './game';
import { loadData } from './data';
import { Block } from './entities/block';

// adjust pixi.js settings
utils.sayHello('js-game-template');
settings.SCALE_MODE = SCALE_MODES.NEAREST;
settings.RESOLUTION = window.devicePixelRatio;

// load everything
loadData([
  'data/blocks.json',
  'data/map.json',
  'images/keggly.bmp',
  'images/blocks.bmp'
], () => {
  // initialize blocks
  Block.initializeBlocks();

  // start the game
  new Game();
});
