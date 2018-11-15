import { Sprite, Container } from 'pixi.js';
import { Block } from './block';

export class Map extends Container {
  constructor(data) {
    super();

    // populate container
    for (let y = 0; y < data.length; y++) {
      let row = data[y];

      for (let x = 0; x < row.length; x++) {
        let blockId = row[x];
        let block = Block.getBlockById(blockId);

        let sprite = new Sprite(block.texture);
        sprite.x = Block.BLOCK_SIZE * x;
        sprite.y = Block.BLOCK_SIZE * y;

        this.addChild(sprite);
      }
    }
  }
}
