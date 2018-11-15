import { Rectangle, Texture } from 'pixi.js';
import { getBaseTexture, getJSON } from '../data';

export class Block {
  constructor(name, texture) {
    this.name = name;
    this.texture = texture;
  }

  static initializeBlocks() {
    let baseTexture = getBaseTexture('blocks');

    // create textures for all the blocks
    for (let block of Array.from(getJSON('blocks'))) {
      const B = Block.BLOCK_SIZE;
      let frame = new Rectangle(block.xpos * B, block.ypos * B, B, B);
      let texture = new Texture(baseTexture, frame);

      Block.blocks.push(new Block(block.name, texture));
    }
  }

  static getBlockById(id) {
    return Block.blocks[id];
  }
}

Block.BLOCK_SIZE = 20;
Block.blocks = [];
