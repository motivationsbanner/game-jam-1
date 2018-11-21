import { settings, SCALE_MODES, utils } from 'pixi.js';
import { Game } from './game';
import { blockClasses } from './helpers/block_helper';
import { entityClasses } from './helpers/entity_helper';
import { loadData } from './data';

// adjust pixi.js settings
utils.sayHello('game-jam-1');
settings.SCALE_MODE = SCALE_MODES.NEAREST;
settings.RESOLUTION = window.devicePixelRatio;

// create list of level-names
const levelNames = [1, 2, 3, 4, 5, 6].map(i => `levels/level${i}`);

// load everything
loadData(levelNames, blockClasses, entityClasses).then(() => {
  // start the game
  new Game(levelNames);
});
