import {MenuElement} from "./menu_element";


class LvlMenu extends Menu{

  constructor (game, map, turns) {
    super(game);
    this.stars = this.calcStars(turns, map.expectedTurns);
    //nextmap = the next mapfile
    this.nextmap = 'nextmap.png';
    for(let i = 0; i < this.stars; i++){
      //starsize = star.png size
      let starsize = 64;
      let menuElement = new MenuElement(i*starsize,0,'star.png');
    }
    //Button to play the next lvl
    this.nextButton = new MenuElement(200,200,'nextButton.png', this.game, nextmap);
    //Button to replay lvl
    this.replayButton = new MenuElement(400,400, 'replayButton.png', this.game, this.map);
  }

  calcStars(turns, expectedTurns) {
    if(turns <= expectedTurns[0]) {
      return 3;
    }
    else if(turns <= expectedTurns[1]) {
      return 2;
    }
    else if(turns <= expectedTurns[0]) {
      return 1;
    }
    else {
      return 0;
    }
  }
}
