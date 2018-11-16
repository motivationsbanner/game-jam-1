import { getJSON, getTexture } from '../data';
import { BackgroundBlock, BACKGROUND_BLOCK_ID } from '../entities/blocks/background_block';
import { StartBlock, START_BLOCK_ID } from '../entities/blocks/start_block';
import { EndBlock, END_BLOCK_ID } from '../entities/blocks/end_block';
import { WallBlock, WALL_BLOCK_ID } from '../entities/blocks/wall_block';

let blockTextures = [];
let blockClasses = [];

export const BLOCK_SIZE = 32;

blockClasses[BACKGROUND_BLOCK_ID] = BackgroundBlock;
blockClasses[START_BLOCK_ID] = StartBlock;
blockClasses[END_BLOCK_ID] = EndBlock;
blockClasses[WALL_BLOCK_ID] = WallBlock;

export function initializeBlocks() {
  for (let block of Array.from(getJSON('blocks'))) {
    blockTextures[block.id] = getTexture(block.name);
  }
}

export function getBlockTexture(id) {
  return blockTextures[id];
}

export function createBlock(id, x, y) {
  return new blockClasses[id](x, y);
}
