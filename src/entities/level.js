import { Container } from 'pixi.js';
import { createBlock, isBlockSolid } from '../helpers/block_helper';
import { createEntity } from '../helpers/entity_helper';
import { START_BLOCK_ID } from './blocks/start_block';

export class Level extends Container {
  constructor(level) {
    super();

    const data = level.level;

    // populate container
    for (let y = 0; y < data.length; y++) {
      let row = data[y];

      for (let x = 0; x < row.length; x++) {
        let block = row[x];
        this.addChild(createBlock(block, x, y));
        if (block === START_BLOCK_ID) {
          this.startPosition = { x, y };
        }
      }
    }

    this.data = data;

    this.entities = [];

    let entities = level.entities;
    entities.map(value => {
      const entity = createEntity(value.id, value.x, value.y);
      this.entities.push(entity);
      this.addChild(entity);
    });

  }

  /**
   * returns true if the player can't visit the tile at (x, y)
   * @param {number} x 
   * @param {number} y 
   */
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

  /**
   * returns the position of the start-block or throws an error
   */
  getStartPosition() {
    if (this.startPosition === undefined) {
      throw new Error('there is no start-entity');
    }

    return this.startPosition;
  }
}
