import Phaser from 'phaser'
export default class OverScene extends Phaser.Scene{

    constructor(){
        super('over-scene')
    }
    init(){

    }
    preload(){
        this.load.image('loser','images/lose.png')
        this.load.image('background0','images/Background.png')
        this.load.image('retry','images/retry.png')
    }
    create(){
        this.add.image(360,202,'background0').setScale(2)
        this.add.image(360,152,'loser').setScale(0.25)
        let retry_button = this.add.image(350,282,'retry').setScale(0.15).setInteractive()
        retry_button.on('pointerdown', () => {
            this.gameStart()
        },this)
    }
    update(){
        
    }
    gameStart(){
        this.startGame = true
        this.scene.start('mystic-knight-scene')
    }
}