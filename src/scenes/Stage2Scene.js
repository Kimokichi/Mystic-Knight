import Phaser from 'phaser'
export default class Stage2Scene extends Phaser.Scene{

    constructor(){
        super('stage-2-scene')
    }
    init(){
        this.player = undefined
        this.cursor = undefined
        this.enemy4 = undefined
        this.enemy5 = undefined
    }
    preload(){
        this.load.image('bg01','images/bg1.png')
        this.load.image('bg02','images/bg2.png')
        this.load.image('bg03','images/bg3.png')
        this.load.spritesheet('knight','images/knight.png',{
            frameWidth : 50,
            frameHeight : 37
        })
        this.load.image('tile','images/rumput2.png')
        this.load.spritesheet('musuh2','images/Musuh 2/Idle/Idle-Sheet.png',{
            frameWidth :48,
            frameHeight : 32
        })
        this.load.spritesheet('musuh2jalan','images/Run-Sheet.png',{
            frameWidth : 48,
            frameHeight : 32
        })
        this.load.image('pohon2','images/Pohon2.png')
        this.load.image('awan','images/Awan1.png')
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
        this.add.image(360, 201, 'bg01').setScale(2.5);
        this.add.image(360, 201, 'bg02').setScale(2.5);
        this.add.image(360, 201, 'bg03').setScale(2.5);
        // Buat grup untuk platform dengan fisika statis
        this.groundPlatform = this.physics.add.staticGroup();
        // Tambahkan platform ke grup
        for (let i = 0; i < 15; i++) {
            this.groundPlatform.create(38 + (i * 48), 380, 'tile').setScale(2).setOffset(-20, -13);
        }
        this.awanKeren = this.physics.add.staticGroup()
        for (let i = 0; i < 7; i++) {
            this.awanKeren.create(38 + (i * 108), 50, 'awan').setScale(1.7)
        }
                // Tambahkan musuh 1
                this.enemy4 = this.physics.add.sprite(360, 280, 'musuh2').setScale(2);
                this.enemy4.setCollideWorldBounds(true);
                this.enemy4.setBounce(0.2);
                this.physics.add.collider(this.enemy4, this.groundPlatform);
                
                // Atur musuh 1
                this.enemy4Speed = 100;
                this.enemy4Direction = 1;
                this.enemy4LeftBound = 270;
                this.enemy4RightBound = 300;
                // Tambahkan musuh 2
                this.enemy5 = this.physics.add.sprite(450, 250, 'musuh2').setScale(3);
                this.enemy5.setCollideWorldBounds(true);
                this.enemy5.setBounce(0.2);
                this.physics.add.collider(this.enemy5, this.groundPlatform);
        
                // Atur musuh 2
                this.enemy5Speed = 120;
                this.enemy5Direction = -1;
                this.enemy5LeftBound = 375;
                this.enemy5RightBound = 400;
        // Tambahkan pemain
        this.player = this.physics.add.sprite(30, 310, 'knight').setScale(1.3);
        // Set properti fisik pemain
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.2); // Opsional, untuk memberi efek pantulan
        // Tambahkan collider antara pemain dan platform
        this.physics.add.collider(this.player, this.groundPlatform);
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
            //  if(this.cursor.left.isDown){
            //     this.enemy.setVelocity(-200,200).setFlipX(true)
            //     this.enemy.anims.play('walking',true)
            // }
            // else if(this.cursor.right.isDown){
            //     this.enemy.setVelocity(200,200).setFlipX(false)
            //     this.enemy.anims.play('walking',true)
            // }
            else{
                this.enemy4.setVelocity(0,200)
                this.enemy4.anims.play('musuh2jalan',true)
                this.enemy5.setVelocity(0,200)
                this.enemy5.anims.play('musuh2jalan',true)
            }
            // Logika pergerakan musuh 1
            this.enemy4.setVelocityX(this.enemy4Speed * this.enemy4Direction);
            if (this.enemy4.x >= this.enemy4RightBound) {
                this.enemy4Direction = -1;
                this.enemy4.setFlipX(false)
            } else if (this.enemy4.x <= this.enemy4LeftBound) {
                this.enemy4Direction = 1;
                this.enemy4.setFlipX(true)
            }
            // Logika pergerakan musuh 2
            this.enemy5.setVelocityX(this.enemy5Speed * this.enemy5Direction);
            if (this.enemy5.x >= this.enemy5RightBound) {
                this.enemy5Direction = -1;
                this.enemy5.setFlipX(false)
            } else if (this.enemy5.x <= this.enemy5LeftBound) {
                this.enemy5Direction = 1;
                this.enemy5.setFlipX(true)
            }
        if(this.player.x > 680){
            this.scene.start('stage-boss-scene')
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
            frames : this.anims.generateFrameNumbers('knight',{start : 16,end : 17}),
            frameRate : 10
        })
        this.anims.create({
            key : 'attack',
            frames : this.anims.generateFrameNumbers('knight',{start : 92,end : 96}),
            frameRate : 10
        })
        //animasi musuh
        this.anims.create({
            key : 'musuh2jalan',
            frames : this.anims.generateFrameNumbers('musuh2jalan',{start : 0, end: 5}),
            frameRate : 10
        })
    }
    attackWithKeyboard() {
        this.player.setVelocity(0);
        this.player.anims.play('attack', true);
        this.time.delayedCall(2000, () => {
            this.player.anims.play('idle', true);
        });
    }
}
