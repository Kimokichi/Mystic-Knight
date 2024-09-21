import Phaser from 'phaser'
export default class StageBossScene extends Phaser.Scene{

    constructor(){
        super('stage-boss-scene')
    }
    init(){
        this.player = undefined
        this.cursor = undefined
        this.boss = undefined
        this.playerAttack = false
        this.playerAttack = false
        this.lifeLabel = undefined
        this.life = 3
    }
    preload(){
        this.load.image('bossbackground','images/bossbackground.png')
        this.load.spritesheet('knight','images/knight.png',{
            frameWidth : 50,
            frameHeight : 37
        })
        this.load.image('tile1','images/Rumput1.png')
        this.load.spritesheet('boss','images/boss.png',{
            frameWidth : 140,
            frameHeight : 93
        })
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
        this.add.image(360, 101, 'bossbackground').setScale(0.95);
        // Buat grup untuk platform dengan fisika statis
        this.groundPlatform = this.physics.add.staticGroup();
        // Tambahkan platform ke grup
        for (let i = 0; i < 15; i++) {
            this.groundPlatform.create(38 + (i * 48), 380, 'tile1').setScale(2).setOffset(-20, 10);
        }
        // Tambahkan pemain
        this.player = this.physics.add.sprite(30, 310, 'knight').setScale(1.3);
        // Set properti fisik pemain
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2); // Opsional, untuk memberi efek pantulan
        // Tambahkan collider antara pemain dan platform
        this.physics.add.collider(this.player, this.groundPlatform);
        this.boss = this.physics.add.sprite(551, 300, 'boss').setScale(1.5);
        // Set properti fisik pemain
        this.boss.setCollideWorldBounds(true);
        this.boss.setBounce(0.2); // Opsional, untuk memberi efek pantulan
        // Tambahkan collider antara pemain dan platform
        this.physics.add.collider(this.boss, this.groundPlatform);
        this.lifeLabel = this.add.text(10,10,'Life', {
            fontSize : '16px',
            // @ts-ignore
            fill : 'black',
            backgroundColor : 'white',
        }).setDepth(1)
        this.cursor=this.input.keyboard.createCursorKeys()
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.createAnimation()
    }
    update(){
        if(this.cursor.left.isDown){
            this.player.setVelocity(-200,200).setFlipX(true)
            this.player.anims.play('walking',true)
        }
        else if(this.cursor.right.isDown){
            this.player.setVelocity(200,200).setFlipX(false)
            this.player.anims.play('walking',true)
        }
        else{
            this.player.setVelocity(0,200)
            this.player.anims.play('idle',true)
        }
        let isJumping = false;
        // Vertical Movement (Jump)
        if (this.cursor.up.isDown && !isJumping) {
            // Start the jump
            this.player.setVelocityY(-200);
            this.player.anims.play('jumping', true);
            isJumping = true;
            // Set a timer to limit the jump duration (adjust the delay as needed)
            this.time.delayedCall(800, () => {
                // Stop the jump after the specified delay (500 milliseconds in this example)
                this.player.setVelocityY(200); // Apply downward velocity to end the jump
                isJumping = false;
            });
        }
        this.boss.anims.play('bossidle',true)
        // Diagonal Jumping (left and up or right and up)
        if ((this.cursor.left.isDown && this.cursor.up.isDown) || (this.cursor.right.isDown && this.cursor.up.isDown)) {
            // Adjust velocity to make diagonal jumping smoother
            this.player.setVelocityY(-200);
            this.player.anims.play('jumping',true)
        }
        // Play standby animation when not moving
        if (!this.cursor.left.isDown && !this.cursor.right.isDown && !this.cursor.up.isDown) {
            this.player.anims.play('idle', true);
        }
        if (this.attackKey.isDown) { 
            this.attackWithKeyboard();
        }
        this.lifeLabel.setText('Life = ' + this.life)
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
            frames : this.anims.generateFrameNumbers('knight',{start : 16,end : 17}),
            frameRate : 10
        })
        this.anims.create({
            key : 'attack',
            frames : this.anims.generateFrameNumbers('knight',{start : 50,end : 58}),
            frameRate : 10
        })
        //enemy animation
        this.anims.create({
            key : 'bossidle',
            frames : this.anims.generateFrameNumbers('boss',{start : 0, end : 7}),
            frameRate : 10,
            repeat : -1
        })
    }
    attackWithKeyboard() {
        this.player.setVelocity(0);
        this.player.anims.play('attack', true);
        this.time.delayedCall(2000, () => {
            this.player.anims.play('idle', true);
        });
    }
    decreaseLife(){
        this.life--
        if (this.life == 2){
            this.player.setTint(0xff0000)
        }else if (this.life == 1){
            this.player.setTint(0xff0000).setAlpha(0.2)
        }else if (this.life == 0){
        this.scene.start('over-scene')
        }
    }
}