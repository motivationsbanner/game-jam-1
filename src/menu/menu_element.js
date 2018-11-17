import { Rectangle, Sprite } from 'pixi.js';
import { getTexture } from '../data';
import { Map } from '../entities/map';


export class MenuElement extends Sprite {

  constructor(x, y, imgfile, game, mapfile = null) {
    super(getTexture(imgfile));
    this.x = x;
    this.y = y;
    this.interactive = true;
    if (mapfile !== null) {
      this.on('click', (event) => {
        this.map = new Map(getJSON(mapfile));
      });
    }
  }
}
