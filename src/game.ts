//import the engine things
import * as PIXI from 'pixi.js'
import * as Matter from 'matter-js'

//import classes
import { Didi } from './didi'
import { Shark } from "./shark";
import { Bubble } from './bubble'
import { Groundnightscene } from "./groundnightscene"


//import images
import didiImage from "./images/didi.1.png"
import restartImage from "./images/restart.png"
import sharkImage from "./images/spiderwalk.png"
import skynightsceneImage from "./images/skynightscene.png"
import bubbleImage from "./images/bubble.png"
import groundnightsceneImage from "./images/groundnightscene.png"
import sunnightsceneImage from "./images/sunnightscene.png"

//import music/sound
import bgMusic from "url:./images/theme.mp3"


export class Game {

    public pixi: PIXI.Application;
    private loader: PIXI.Loader;
    private sharks: Shark[] = [];
    private gameOverButton: PIXI.Sprite
    private bubbles: Bubble[] = [];
    private nightscenefloor: Groundnightscene;
    private didi: Didi;

    public engine: Matter.Engine;


    //
    // STAP 1 - make a pixi canvas
    //
    constructor() {
``
        // //
        //preload all images
        //
        this.pixi = new PIXI.Application({ width: 1800, height: 450 })
        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()
            .add('sharkTexture', sharkImage)
            .add('didiTexture', didiImage)
            .add('restartTexture', restartImage)
            .add('bubbleTexture', bubbleImage)
            .add('skynightsceneTexture', skynightsceneImage)
            .add('groundnightsceneTexture', groundnightsceneImage)
            .add('sunnightsceneTexture', sunnightsceneImage)
            .add("music", bgMusic)

                //Second screen
        // this.pixi = new PIXI.Application({
        //     width: 1920,
        //     height: 450
        // });
        // document.body.appendChild(this.pixi.view);

        // console.log("starting .. ?");

        this.loader.onProgress.add((loader) => this.showProgress(loader));
        this.loader.onError.add((arg) => {
            console.error(arg);
        });
        this.loader.load(() => this.startGame());

        this.engine = Matter.Engine.create()

    }

    private showProgress(p: PIXI.Loader) {
        console.log(p.progress);

    }

    private startGame() {
        this.engine = Matter.Engine.create()

        let theme = this.loader.resources["music"].data!
        theme.play()

        let skynightscene = new PIXI.Sprite(this.loader.resources["skynightsceneTexture"].texture!);
        this.pixi.stage.addChild(skynightscene);

        let sunnightscene = new PIXI.Sprite(this.loader.resources["sunnightsceneTexture"].texture!);
        this.pixi.stage.addChild(sunnightscene);

        // const tilingSprite = new PIXI.TilingSprite(this.loader.resources["groundnightsceneTexture"].texture!,
        //     this.pixi.screen.width,
        //     this.pixi.screen.height,
        // );
        // this.pixi.stage.addChild(tilingSprite);

        this.nightscenefloor = new Groundnightscene(this.loader.resources["groundnightsceneTexture"].texture!, this)
        this.pixi.stage.addChild(this.nightscenefloor);


        this.didi = new Didi(this.loader.resources["didiTexture"].texture!, this)
        this.pixi.stage.addChild(this.didi)

        for (let i = 0; i < 14; i++) {
            let shark = new Shark(this.loader.resources["sharkTexture"].texture!);
            this.pixi.stage.addChild(shark);
            this.sharks.push(shark);
        }

      

        let spider = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(spider)
        this.sharks.push(spider)

        this.pixi.ticker.add((delta: number) => this.update(delta))
    }

    //Shooting bubble
    public shootBubble(bx: number, by: number) {
        let bubble = new Bubble(
            bx,
            by,
            this,
            this.loader.resources["bubbleTexture"].texture!
        );
        this.pixi.stage.addChild(bubble);
        this.bubbles.push(bubble);
    }
     //Delete bubble when hit
    public removeBubble(bubble: Bubble) {
        this.bubbles = this.bubbles.filter((b) => b !== bubble);
    }



    private gameOver() {
        console.log("game over")
        this.pixi.stop()
        this.gameOverButton = new PIXI.Sprite(this.loader.resources["restartTexture"].texture!) 
        this.gameOverButton.width = 100
        this.gameOverButton.height = 100
        this.gameOverButton.x = 400
        this.gameOverButton.y = 200
        this.gameOverButton.interactive = true
        this.gameOverButton.buttonMode = true
        this.gameOverButton.on('pointerdown', () => this.resetGame())

        this.pixi.stage.addChild(this.gameOverButton)

    }

    private resetGame() {
        this.didi.x = 450;
        this.didi.y = 100;
        // verwijder de game over button
        this.gameOverButton.destroy()
        // herstart pixi
        this.pixi.start()
    }



    public update(delta: number) {
        Matter.Engine.update(this.engine, 1000 / 60)

        for (let shark of this.sharks) {
            shark.swim();
            for (let b of this.bubbles) {
                if (this.collision(b, shark)) {
                    b.hit();
                    shark.hit();
                }
            }
        }


        for (let shark of this.sharks) {
            if (this.collision(this.didi, shark)) {
                this.gameOver()
            }
        }

        for (let bubble of this.bubbles) {
            bubble.update()
        }
        this.didi.update()
    }


    collision(sprite1: PIXI.Sprite, sprite2: PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

new Game()