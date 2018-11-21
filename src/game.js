import { Application, Container } from 'pixi.js';
import { Level } from './game_objects/level';
import { Player } from './game_objects/player';
import { getJSON } from './data';
import { InputHandler, ACTION } from './utils/input_handler';
import { GameCallbacks } from './game_callbacks';
import { EndBlock } from './game_objects/blocks/end_block';
import { DIRECTION, directionToCoordinates } from './helpers/direction_helper';

export class Game extends Application {

  constructor(levelNames) {
    super({ view: document.getElementById('canvas'), backgroundColor: 0x555555 });

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

    // add listener to handle input
    this.inputHandler = new InputHandler(data => this.update(data));
  }

  update({ action, direction }) {

    if (action === ACTION.RESET_LEVEL) {
      this.restartLevel();
      return;
    }

    if (action === ACTION.LOAD_NEXT_LEVEL) {
      this.loadNextLevel();
      return;
    }

    if (action !== ACTION.MOVE) {
      return;
    }
    const { xPos, yPos } = this.player;
    const diff = directionToCoordinates(direction);
    const newXPos = xPos + diff.x, newYPos = yPos + diff.y;

    if (this.level.isSolid(newXPos, newYPos)) {
      return;
    }

    // move the position
    this.player.update(newXPos, newYPos);

    for (let entity of this.level.entities) {
      entity.update(newXPos, newYPos, this.gameCallbacks);
    }

    if (this.level.data[newYPos][newXPos] === EndBlock.ID) {
      this.loadNextLevel();
    }

    // update perspective
    this.adjustPerspective();
  }

  /**
   * adapt to the current screen-size
   */
  adjustSize() {
    this.width = window.innerWidth / window.devicePixelRatio;
    this.height = window.innerHeight / window.devicePixelRatio;

    // for adjustPerspective
    this.halfWidth = Math.floor(this.width / 2);
    this.halfHeight = Math.floor(this.height / 2);

    this.renderer.resize(this.width, this.height);

    this.adjustPerspective();
  }

  /**
   * adjusts the position of the container
   */
  adjustPerspective() {
    // adjust y-axis
    if (this.levelHeight > this.height) {
      let nearTop = this.player.y <= this.halfHeight;
      let nearBottom = this.player.y >= this.levelHeight - this.halfHeight;

      if (nearTop) {
        this.container.y = 0;
      } else if (nearBottom) {
        this.container.y = this.height - this.levelHeight;
      } else {
        this.container.y = this.halfHeight - this.player.y;
      }
    } else {
      this.container.y = Math.floor((this.height - this.levelHeight) / 2);
    }

    // adjust x-axis
    if (this.levelWidth > this.width) {
      let nearLeft = this.player.x <= this.halfWidth;
      let nearRight = this.player.x >= this.levelWidth - this.halfWidth;

      if (nearLeft) {
        this.container.x = 0;
      } else if (nearRight) {
        this.container.x = this.width - this.levelWidth;
      } else {
        this.container.x = this.halfWidth - this.player.x;
      }
    } else {
      this.container.x = Math.floor((this.width - this.levelWidth) / 2);
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
      this._levelIndex -= 1;
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

    // save map dimensions because getters iterate through all the blocks every time
    this.levelHeight = this.level.height;
    this.levelWidth = this.level.width;
  }

  restartLevel() {
    this.loadLevel();
  }
}
