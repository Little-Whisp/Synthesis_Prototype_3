import * as PIXI from "pixi.js";
import { Game } from "./game";


export class Bubble extends PIXI.Sprite {
    
  public mygame: Game;
  constructor(bx: number, by: number, mygame: Game, texture: PIXI.Texture) {
    super(texture);
    this.scale.set(0.7);
    this.x = bx + 180;
    this.y = by + 20;
    this.mygame = mygame;
  }

  public hit() {
    this.mygame.removeBubble(this);
    this.destroy();
  }

  update() {
    this.x += 10;

    if (this.x > window.innerWidth) {
      this.mygame.removeBubble(this);
      this.destroy();
    }
  }
}
