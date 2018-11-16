import { Sprite, Container } from 'pixi.js';
import { createBlock } from '../helpers/block_helper';

export class Map extends Container {
  constructor(data) {
    super();

    // populate container
    for (let y = 0; y < data.length; y++) {
      let row = data[y];

      for (let x = 0; x < row.length; x++) {
        this.addChild(createBlock(row[x], x, y));
      }
    }
  }
}
