import Phaser from 'phaser'
export default class MysticKnightScene extends Phaser.Scene{

    constructor(){
        super('mystic-knight-scene')
    }
    init(){
        this.player = undefined
        this.cursor = undefined
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
        // this.add.image(360,201,'background').setScale(1.5)
        // this.add.image(38,390,'tile')
        // this.groundPlatform = this.add.group({
        //     // @ts-ignore
        //     key : 'tile',
        //     repeat : 15,
        //     setXY : {x : 38,y : 390, stepX : 48}
        // })
        // this.player = this.physics.add.sprite(360,201,'knight')
        // this.player.setCollideWorldBounds(true)
        // this.physics.add.collider(this.player,this.groundPlatform)
        this.add.image(360, 201, 'background').setScale(1.5);
        // Buat grup untuk platform dengan fisika statis
        this.groundPlatform = this.physics.add.staticGroup();
        // Tambahkan platform ke grup
        for (let i = 0; i < 15; i++) {
            this.groundPlatform.create(38 + (i * 48), 390, 'tile').setScale(1).setOffset(-20, 10);
        }
        // Tambahkan pemain
        this.player = this.physics.add.sprite(360, 200, 'knight');
        // Set properti fisik pemain
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2); // Opsional, untuk memberi efek pantulan
        // Tambahkan collider antara pemain dan platform
        this.physics.add.collider(this.player, this.groundPlatform);
        this.cursor=this.input.keyboard.createCursorKeys()
        this.createAnimation()
    }
    update(){
        if(this.cursor.left.isDown){
            this.player.setVelocity(-200,200)
        }
        else if(this.cursor.right.isDown){
            this.player.setVelocity(200,200)
        }
        else{
            this.player.setVelocity(0,0)
        }
    }
    createAnimation(){
        this.anims.create({
            key : 'idle',
            frames : this.anims.generateFrameNumbers('knight',{start : 0,end : 3}),
            frameRate : 10,
            repeat : -1
        })
        this.anims.create({
            key : 'walking',
            frames : this.anims.generateFrameNumbers('knight',{start : 8,end : 13}),
            frameRate : 10
        })
        this.anims.create({
            key : 'jumping',
            frames : this.anims.generateFrameNumbers('knight',{start : 8,end : 13}),
            frameRate : 10
        })
    }
}