import { Container } from 'pixi.js';
import { createBlock, isBlockSolid } from '../helpers/block_helper';
import { createEntity } from '../helpers/entity_helper';

export class Level extends Container {
  constructor(level) {
    super();

    const data = level.level;

    // populate container
    for (let y = 0; y < data.length; y++) {
      let row = data[y];

      for (let x = 0; x < row.length; x++) {
        this.addChild(createBlock(row[x], x, y));
      }
    }

    this.data = data;

    this.entities = [];

    let entities = level.entities;
    entities.map(value => {
      this.entities[value.id] = createEntity(value.id, value.x, value.y);
    });

  }

  isNextMoveSolid(x, y) {

    if (x < 0 || y < 0 || x >= this.data[0].length || y >= this.data.length) {
      return true;
    }

    // get block id 
    const blockId = this.data[y][x];

    // check if the entities that collide are solid
    const isEntitySolid = this.entities
      .filter(value => value.x == x && value.y == y)
      .some(value => value.solid);

    // check if the block is solid
    return isEntitySolid || isBlockSolid(blockId);
  }
}
