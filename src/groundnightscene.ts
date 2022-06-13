import * as PIXI from "pixi.js";
import * as Matter from 'matter-js'
import { Game } from "./game";

export class Groundnightscene extends PIXI.TilingSprite {
  private rigidBody: Matter.Body;
  // private count:number

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.x = 450;
    this.y = 250;
    this.anchor.set(0.5);
    this.width = 5000;
    this.height = 500;

        // x, y, width, height
    this.rigidBody = Matter.Bodies.rectangle(450, 480, 5000, 100, { 
      isStatic: true 
    });
    Matter.Composite.add(game.engine.world, this.rigidBody);
  }

  update(){
    this.x = this.rigidBody.position.x
    this.y = this.rigidBody.position.y
  }
}
