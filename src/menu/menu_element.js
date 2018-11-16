import { Rectangle, Sprite } from 'pixi.js';
import { getTexture } from '../data';
import { Map } from '../entities/map';
import { Game } from '../game';



class MenuElement extends Sprite {

  constructor(imgfile, mapfile = null, game) {
    super(getTexture(imgfile));
    this.interactive = true;
    if(mapfile !== null) {
      this.on('click', (event) => {
        this.map = new Map(getJSON(mapfile));

      });
    }
  }
}
