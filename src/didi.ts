import * as PIXI from "pixi.js";
import { Game } from "./game";
import * as Matter from 'matter-js'

export class Didi extends PIXI.Sprite {
  rigidBody: Matter.Body
  // jumpSound:HTMLAudioElement
  speed: number = 0
  private xspeed = 0;
  private yspeed = 0;
  game: Game

  constructor(texture: PIXI.Texture, game: Game) {
    super(texture);
    this.game = game
    // this.anchor.set(0.5)
    this.xspeed = 0;
    this.yspeed = 0;
    this.x = 100;
    this.y = 330;
;
    this.scale.set(0.3);
    this.game = game;
    console.log(this.game);


    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e));
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e));

   
    // this.x = 100;
    // // this.y = 375;

    // this.scale.set(0.2)

    const didiOptions: Matter.IBodyDefinition = {
        density: 0.001,
        friction: 0.7,
        frictionStatic: 0,
        frictionAir: 0.01,
        restitution: 0.5,
        inertia: Infinity,
        inverseInertia: Infinity,
        label: "Player"
    }
    this.rigidBody = Matter.Bodies.rectangle(600, 230, 75, 100, didiOptions)
    Matter.Composite.add(game.engine.world, this.rigidBody)

    
    // window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    // window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

  }

  public swim() {
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  private shoot() {
    this.game.shootBubble(this.x, this.y);
  }


  update() {
    if (this.speed != 0) {
        Matter.Body.setVelocity(this.rigidBody, { x: this.speed, y: this.rigidBody.velocity.y })
    if (this.x > 1500) {
        this.x = 0;
        // this.jumpSound.play()
    } else if (this.x < -100) {
        this.x = 1500
    } else if (this.y < -20) {
        this.x = -100;
        this.y =  250;
    }
    this.x = this.rigidBody.position.x
    this.y = this.rigidBody.position.y
    this.rotation = this.rigidBody.angle

    if (this.rigidBody.position.y > 1500) this.resetPosition()
    } else if (this.speed == 0) {
        Matter.Body.setVelocity(this.rigidBody, { x: 0, y: 4 })
    }
    
}



private onKeyDown(e: KeyboardEvent): void {
  console.log('hello')
  switch (e.key.toUpperCase()) {
    case "F":
      this.shoot();
      break;
    case "A":
    case "ARROWLEFT":
      this.xspeed = -7;
      break;
    case "D":
    case "ARROWRIGHT":
      this.xspeed = 7;
      break;
    case "W":
    case "ARROWUP":
      this.yspeed = -7;
      break;
    case "S":
    case "ARROWDOWN":
      this.yspeed = 7;
      break;
  }
}

private onKeyUp(e: KeyboardEvent): void {
  switch (e.key.toUpperCase()) {
    case " ":
      break;
    case "A":
    case "D":
    case "ARROWLEFT":
    case "ARROWRIGHT":
      this.xspeed = 0;
      break;
    case "W":
    case "S":
    case "ARROWUP":
    case "ARROWDOWN":
      this.yspeed = 0;
      break;
  }
}

resetPosition() {
    Matter.Body.setPosition(this.rigidBody, { x: 120, y: 30 })
    Matter.Body.setVelocity(this.rigidBody, { x: 0, y: 0 })
    Matter.Body.setAngularVelocity(this.rigidBody, 0)
}

beforeUnload() {

}
}