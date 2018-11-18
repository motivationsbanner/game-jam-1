import { getJSON, getTexture } from '../data';

import { BackgroundBlock, BACKGROUND_BLOCK_ID } from '../game_objects/blocks/background_block';
import { StartBlock, START_BLOCK_ID } from '../game_objects/blocks/start_block';
import { WallBlock, WALL_BLOCK_ID } from '../game_objects/blocks/wall_block';

let blocksArray = [];
let blockClasses = [];

export const BLOCK_SIZE = 32;

blockClasses[BACKGROUND_BLOCK_ID] = BackgroundBlock;
blockClasses[START_BLOCK_ID] = StartBlock;
blockClasses[WALL_BLOCK_ID] = WallBlock;

export function initializeBlocks() {
  for (let block of getJSON('blocks')) {
    blocksArray[block.id] = { texture: getTexture(block.name), solid: block.solid };
  }
}

export function getBlockTexture(id) {
  return blocksArray[id].texture;
}

export function isBlockSolid(id) {
  return blocksArray[id].solid;
}

export function createBlock(id, x, y) {
  return new blockClasses[id](x, y);
}
