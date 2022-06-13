import * as PIXI from "pixi.js";

export class Shark extends PIXI.Sprite {
  private speed: number;

  constructor(texture: PIXI.Texture) {
    super(texture);
    this.speed = 2;
    this.x = Math.random() * window.innerWidth + 100;
    this.y = Math.random() * window.innerHeight;
    // this.x = 1000;
    // this.y = 100;
    this.anchor.set(-5);
    this.scale.set( 0.5);

    const filter = new PIXI.filters.ColorMatrixFilter();
    filter.hue(Math.random() * 360, false);
    this.filters = [filter];
  }

  public hit() {
    this.x = window.innerWidth + 100;
  }

  public swim() {
    this.x -= this.speed;
    this.y = 1.1;
    this.y += Math.cos(this.x * 0.03) * 1.1;
    if (this.x < -100) {
      this.x = window.innerWidth + 100;
      this.y = Math.random() * window.innerHeight;
    }
  }

  public hitShark() {
    console.log("hit spider");
  }
}
