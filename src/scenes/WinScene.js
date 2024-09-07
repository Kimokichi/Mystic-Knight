import Phaser from 'phaser'
export default class WinScene extends Phaser.Scene{

    constructor(){
        super('win-scene')
    }
    init(){

    }
    preload(){
        this.load.image('text','images/win.png')
        this.load.image('background0','images/Background.png')
    }
    create(){
        this.add.image(360,202,'background0').setScale(2)
        this.add.image(360,252,'text').setScale(4)
    }
    update(){
        
    }
}