import {MenuElement} from "./menu_element";

class StartMenu extends Menu {

  constructor(game) {
    super(game);
    this.game = game;
    this.maps = [];
    maps.forEach(function(element,index) {
      //center it
      let x = 300;
      // list it
      let y = index*100;
      renderElement(element,x ,y);
    });

  }

  renderElement(element, x, y){
    this.menuElement = new MenuElement(x, y, this.game, element);
  }

}
