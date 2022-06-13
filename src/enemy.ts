import * as PIXI from "pixi.js"
import { Game } from "./game"


export class Enemy extends PIXI.Sprite {
  protected game: Game

  private movingDown: boolean = true
  private startX: number = 0
  private startY: number = 0
  private speedX: number = 3
  private speedY: number = 3

  constructor(game: Game, texture: PIXI.Texture, offset: number) {
    super(texture)
    console.log("enemy created")
    this.game = game

    this.scale.set(0.4)
    this.x = offset * this.getBounds().width
    this.y = -this.getBounds().height
  }

  public update(delta: number) {
    if (this.movingDown) {
      this.y += this.speedY * delta
      if (Math.abs(this.y - this.startY) > this.getBounds().height) {
        this.movingDown = false
        this.startY = this.y
      }
    } else {
      this.x += this.speedX * delta
      if (
        Math.abs(this.x - this.startX) >
        window.innerWidth - this.getBounds().width
      ) {
        this.movingDown = true
        this.speedX *= -1
        this.startX = this.x
      }
    }
  }
}
