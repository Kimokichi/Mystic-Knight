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
        if (!this.registry.get('life')) {
            this.registry.set('life', 10);          }
        this.life = this.registry.get('life');
        // this.life = 10
        this.playerVulnerable = true
        this.timer = 10
        this.timerLabel = undefined
        this.countdown = undefined
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
        // Tambahkan musuh 1
        this.boss = this.physics.add.sprite(500, 300, 'boss').setScale(1.3);
        this.boss.setCollideWorldBounds(true);
        this.boss.setBounce(0.2);
        this.physics.add.collider(this.boss, this.groundPlatform);
        
        // Atur musuh 1
        this.bossSpeed = 100;
        this.bossDirection = 1;
        this.bossLeftBound = 270;
        this.bossRightBound = 500;
        this.physics.add.collider(this.boss, this.groundPlatform);
        this.lifeLabel = this.add.text(10,10,'Life', {
            fontSize : '16px',
            // @ts-ignore
            fill : 'black',
            backgroundColor : 'white',
        }).setDepth(1)
        this.physics.add.overlap(
            this.player,
            this.boss,
            this.decreaseLife,
            null,
            this
        )
        this.life = this.registry.get('life');
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
            else{
                this.boss.setVelocity(0,200)
                this.boss.anims.play('bossjalan',true)
            }
                        // Logika pergerakan musuh 1
                        this.boss.setVelocityX(this.bossSpeed * this.bossDirection);
                        if (this.boss.x >= this.bossRightBound) {
                            this.bossDirection = -1;
                            this.boss.setFlipX(false)
                        } else if (this.boss.x <= this.bossLeftBound) {
                            this.bossDirection = 1;
                            this.boss.setFlipX(true)
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
            key : 'bossjalan',
            frames : this.anims.generateFrameNumbers('boss',{start : 8, end : 24}),
            frameRate : 10,
        })
    }
    attackWithKeyboard() {
        this.player.setVelocity(0);
        this.player.anims.play('attack', true);
        this.time.delayedCall(2000, () => {
            this.player.anims.play('idle', true);
        });
    }
    decreaseLife() {
        if (!this.registry.get('life')) {
                    this.registry.set('life', 10);          }
                this.life = this.registry.get('life');
        if (this.playerVulnerable) {
                    this.life--;
                    this.registry.set('life', this.life);  // Simpan nyawa ke dalam registry
        
                    if (this.life == 2) {
                        this.player.setTint(0xff0000);
                    } else if (this.life == 1) {
                        this.player.setTint(0xff0000).setAlpha(0.2);
                    } else if (this.life == 0) {
                        this.scene.start('over-scene');
                    }
        
                    this.playerVulnerable = false;
                    this.time.delayedCall(1000, () => {
                        this.playerVulnerable = true;
                    });
                }
    }
}