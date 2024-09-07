import Phaser from 'phaser'
export default class StartScene extends Phaser.Scene{

    constructor(){
        super('start-scene')
    }
    init(){

    }
    preload(){
        this.load.image('judul','images/name1.png')
        this.load.image('play','images/start.png')
        this.load.image('background0','images/Background.png')
    }
    create(){
        this.add.image(360,202,'background0').setScale(2)
        this.add.image(350,150,'judul').setScale(2)
        this.add.image(340,300,'play').setScale(2)
    }
    update(){
        
    }
}