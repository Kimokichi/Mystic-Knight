import Phaser from 'phaser'
export default class MysticKnightScene extends Phaser.Scene{

    constructor(){
        super('mystic-knight-scene')
    }
    init(){

    }
    preload(){
        this.load.image('background','images/background.png')
        this.load.spritesheet('knight','images/knight.png',{
            frameWidth : 50,
            frameHeight : 37
        })
    }
    create(){
        this.add.image(360,201,'background').setScale(1.5)
        this.add.image(360,201,'knight')
    }
    update(){

    }
}