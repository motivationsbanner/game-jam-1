import { Application, Container, UPDATE_PRIORITY } from 'pixi.js';
import { Level } from './entities/level';
import { Player } from './entities/player';
import { getJSON } from './data';
import { Touchpad } from './utils/touchpad';

export class Game extends Application {

  constructor() {
    super({ view: document.getElementById('canvas') });

    this.level = new Level(getJSON('map'));

    // save map dimensions because getters iterate through all the blocks every time
    this.mapHeight = this.level.height;
    this.mapWidth = this.level.width;

    this.player = new Player();

    // create container to move all entities at once
    this.container = new Container();
    this.stage.addChild(this.container);
    this.container.addChild(this.level, this.player);

    this.adjustSize();
    window.addEventListener('resize', () => this.adjustSize());

    // add listener for key up event
    window.addEventListener('keydown', event => this.doTurn(event));

    // for touch input
    this.touchpad = new Touchpad(this.level);

    // create eventloop
    this.ticker.add(delta => this.update(delta));
  }

  update() {
    // handle the perspective
    this.adjustPerspective();
  }

  doTurn(event) {
    const k = event.key;

    // check if the game should be restarted 
    if (k == "Escape" || k == "r") {
      this.resetGame();
      return;
    }

    const input = {
      up: k == 'w' || k == 'ArrowUp',
      left: k == 'a' || k == 'ArrowLeft',
      down: k == 's' || k == 'ArrowDown',
      right: k == 'd' || k == 'ArrowRight'
    };

    const { newPosX, newPosY } = this.player.newPosition(input);

    let solid = this.level.isNextMoveSolid(newPosX, newPosY);

    if (solid) {
      return;
    }

    // move the position
    this.player.update(newPosX, newPosY );

    for (let i = 0; i < this.level.entities.length; i++) {
      this.level.entities[i].update(newPosX, newPosY);
    } 

  }

  /**
   * Resets the Game
   */
  resetGame() {
    this.player.reset();
  }

  adjustSize() {
    this.width = window.innerWidth / window.devicePixelRatio;
    this.height = window.innerHeight / window.devicePixelRatio;

    // for adjustPerspective
    this.halfWidth = Math.floor(this.width / 2);
    this.halfHeight = Math.floor(this.height / 2);

    this.renderer.resize(this.width, this.height);

    // set initial perspective
    this.container.x = Math.floor((this.width - this.mapWidth) / 2);
    this.container.y = Math.floor((this.height - this.mapHeight) / 2);
  }

  adjustPerspective() {
    // adjust y-axis
    if (this.mapWidth > this.width) {
      let nearTop = this.player.y <= this.halfHeight;
      let nearBottom = this.player.y >= this.mapHeight - this.halfHeight;

      if (nearTop) {
        this.container.y = 0;
      } else if (nearBottom) {
        this.container.y = this.height - this.mapHeight;
      } else {
        this.container.y = this.halfHeight - this.player.y;
      }
    }

    // adjust x-axis
    if (this.mapHeight > this.height) {
      let nearLeft = this.player.x <= this.halfWidth;
      let nearRight = this.player.x >= this.mapWidth - this.halfWidth;

      if (nearLeft) {
        this.container.x = 0;
      } else if (nearRight) {
        this.container.x = this.width - this.mapWidth;
      } else {
        this.container.x = this.halfWidth - this.player.x;
      }
    }
  }
}
