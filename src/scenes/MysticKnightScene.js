import Phaser from 'phaser'
export default class MysticKnightScene extends Phaser.Scene{

    constructor(){
        super('mystic-knight-scene')
    }
    init(){
        this.player = undefined
    }
    preload(){
        this.load.image('background','images/background.png')
        this.load.spritesheet('knight','images/knight.png',{
            frameWidth : 50,
            frameHeight : 37
        })
        this.load.image('tile','images/rumput.png')
    }
    create(){
        this.add.image(360,201,'background').setScale(1.5)
        this.add.image(38,390,'tile')
        this.groundPlatform = this.add.group({
            // @ts-ignore
            key : 'tile',
            repeat : 15,
            setXY : {x : 38,y : 390, stepX : 48}
        })
        this.player = this.physics.add.sprite(360,201,'knight')
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player,this.groundPlatform)
    }
    update(){

    }
}