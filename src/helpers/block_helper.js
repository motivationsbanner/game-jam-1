import { BackgroundBlock } from '../game_objects/blocks/background_block';
import { StartBlock } from '../game_objects/blocks/start_block';
import { WallBlock } from '../game_objects/blocks/wall_block';
import { EndBlock } from '../game_objects/blocks/end_block';

export const BLOCK_SIZE = 32;
export let blockClasses = [];

[BackgroundBlock, StartBlock, WallBlock, EndBlock]
  .forEach(blockClass => blockClasses[blockClass.ID] = blockClass);

export function isBlockSolid(id) {
  return blockClasses[id].SOLID;
}

export function createBlock(id, x, y) {
  if (blockClasses[id] === undefined) {
    throw new Error(`no block with id ${id} found`);
  }

  return new blockClasses[id](x, y);
}
