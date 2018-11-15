import { Application, Container } from 'pixi.js';
import { Map } from './entities/map';
import { Player } from './entities/player';
import { getJSON } from './data';
import { keyEventHandler } from './utils/key_event_handler';
import { Touchpad } from './utils/touchpad';

export class Game extends Application {

  constructor() {
    super({ view: document.getElementById('canvas') });

    this.map = new Map(getJSON('map'));

    // save map dimensions because getters iterate through all the blocks every time
    this.mapHeight = this.map.height;
    this.mapWidth = this.map.width;

    this.player = new Player();

    // create container to move all entities at once
    this.container = new Container();
    this.stage.addChild(this.container);
    this.container.addChild(this.map, this.player);

    this.adjustSize();
    window.addEventListener('resize', () => this.adjustSize());

    // for touch input
    this.touchpad = new Touchpad(this.map);

    // create eventloop
    this.ticker.add(delta => this.update(delta));
  }

  update() {
    let k = keyEventHandler;

    let input = {
      up: k.isPressed('w') || k.isPressed('ArrowUp') || this.touchpad.up,
      left: k.isPressed('a') || k.isPressed('ArrowLeft') || this.touchpad.left,
      down: k.isPressed('s') || k.isPressed('ArrowDown') || this.touchpad.down,
      right: k.isPressed('d') || k.isPressed('ArrowRight') || this.touchpad.right
    };

    this.player.update(input);
    this.adjustPerspective();
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
