import { Application, Container } from 'pixi.js';
import { Level } from './game_objects/level';
import { Player } from './game_objects/player';
import { getJSON } from './data';
import { Touchpad } from './utils/touchpad';
import { GameCallbacks } from './game_callbacks';

export class Game extends Application {

  constructor(levelNames) {
    super({ view: document.getElementById('canvas') });

    // create player
    this.player = new Player();

    // create container to move all entities at once
    this.container = new Container();
    this.stage.addChild(this.container);
    this.container.addChild(this.player);

    // load first level
    this.levelNames = levelNames;
    this.loadNextLevel();

    // adjust the size of the game on resize
    this.adjustSize();
    window.addEventListener('resize', () => this.adjustSize());

    // create gameCallbacks object
    this.gameCallbacks = new GameCallbacks(this);

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
      this.restartLevel();
      return;
    }

    const input = {
      up: k == 'w' || k == 'ArrowUp',
      left: k == 'a' || k == 'ArrowLeft',
      down: k == 's' || k == 'ArrowDown',
      right: k == 'd' || k == 'ArrowRight'
    };

    const { newPosX, newPosY } = this.player.newPosition(input);

    let solid = this.level.isSolid(newPosX, newPosY);

    if (solid) {
      return;
    }

    // move the position
    this.player.update(newPosX, newPosY);

    for (let entity of this.level.entities) {
      entity.update(newPosX, newPosY, this.gameCallbacks);
    }
  }

  adjustSize() {
    // save map dimensions because getters iterate through all the blocks every time
    this.levelHeight = this.level.height;
    this.levelWidth = this.level.width;

    this.width = window.innerWidth / window.devicePixelRatio;
    this.height = window.innerHeight / window.devicePixelRatio;

    // for adjustPerspective
    this.halfWidth = Math.floor(this.width / 2);
    this.halfHeight = Math.floor(this.height / 2);

    this.renderer.resize(this.width, this.height);

    // set initial perspective
    this.container.x = Math.floor((this.width - this.levelWidth) / 2);
    this.container.y = Math.floor((this.height - this.levelHeight) / 2);
  }

  /**
   * updates the position of the container so
   * the player is visible
   * !! THIS NEEDS TO GET ADJUSTED
   */
  adjustPerspective() {
    // adjust y-axis
    if (this.levelWidth > this.width) {
      let nearTop = this.player.y <= this.halfHeight;
      let nearBottom = this.player.y >= this.levelHeight - this.halfHeight;

      if (nearTop) {
        this.container.y = 0;
      } else if (nearBottom) {
        this.container.y = this.height - this.levelHeight;
      } else {
        this.container.y = this.halfHeight - this.player.y;
      }
    }

    // adjust x-axis
    if (this.levelHeight > this.height) {
      let nearLeft = this.player.x <= this.halfWidth;
      let nearRight = this.player.x >= this.levelWidth - this.halfWidth;

      if (nearLeft) {
        this.container.x = 0;
      } else if (nearRight) {
        this.container.x = this.width - this.levelWidth;
      } else {
        this.container.x = this.halfWidth - this.player.x;
      }
    }
  }

  loadNextLevel() {
    // update the levelIndex
    if (this._levelIndex === undefined) {
      this._levelIndex = 0;
    } else {
      this._levelIndex += 1;
    }

    // show a message if the player won
    if (this._levelIndex >= this.levelNames.length) {
      alert('you won!');
      return;
    }

    // load the next level
    this.loadLevel();
  }

  loadLevel() {
    // remove the old level
    if (this.level !== undefined) {
      this.container.removeChild(this.level);
    }

    let levelData = getJSON(this.levelNames[this._levelIndex]);
    this.level = new Level(levelData);

    this.container.addChildAt(this.level, 0); // behind the player

    // set the position of the player
    let { x, y } = this.level.getStartPosition();
    this.player.setPosition(x, y);
  }

  restartLevel() {
    this.loadLevel();
  }
}
