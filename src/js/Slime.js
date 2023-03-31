import Phaser from 'phaser';

export default class Slime{
  constructor(scene, x, y, warrior) {
    this.scene = scene;
    this.warrior = warrior;
    this.isDead = false

    // Initialize the slime sprite
    this.sprite = this.scene.add.sprite(0, 0, 'slime');
    this.sprite.setScale(2);

    //Designate the Slime's hitbox
    this.hitbox = this.scene.add.rectangle(9, 13, 30, 40);
    this.scene.physics.add.existing(this.hitbox);
    this.hitbox.setFillStyle(0xff0000, 0.5);
    this.hitbox.body.setAllowGravity(false)

    // Create a container to hold the slime sprite and its hitbox
    this.container = this.scene.add.container(x, y, [this.sprite, this.hitbox]);
    this.scene.physics.world.enable(this.container);
    this.container.body.collideWorldBounds = true;
    this.container.setData('instance', this);
    
    this.container.body.setOffset(0, -40);

    // Set up slime animations
    this.createAnimations();
    this.sprite.active = true;
  }

  createAnimations(){
    this.scene.anims.create({
      key: 'slimemove',
      frames: this.scene.anims.generateFrameNumbers('slime', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'slimeidle',
      frames: this.scene.anims.generateFrameNumbers('slime', {start: 5, end: 6}),
      frameRate: 2,
      repeat: -1
    })

    this.scene.anims.create({
      key: 'slimedie',
      frames: this.scene.anims.generateFrameNumbers('slime', {start: 7, end: 22}),
      frameRate: 10,
      repeat: 0
    })
  }

  getFacingDirection() {
    return this.sprite.flipX ? 'left' : 'right';
  }

  die(){
    this.isDead = true
    this.sprite.play('slimedie', true)
    this.hitbox.destroy();
    this.container.body.setVelocity(0, 0)
    this.scene.time.delayedCall(1500, () =>{
      this.sprite.destroy();
      this.container.destroy();
    })
  }

  update(){
    if (this.isDead) return
    const self = this.container.body;

    // Calculate the direction towards the warrior
    const direction = new Phaser.Math.Vector2(this.warrior.container.x - this.container.x, this.warrior.container.y - this.container.y);
    direction.normalize();

    let speed;

    // Set the velocity of the slime towards the warrior
    if(Math.abs(direction.x) < .2){
      speed = 0
    } else speed = 35

    self.setVelocityX(direction.x * speed);

    // Animate the Slime
    if (this.warrior.container.x - this.container.x > -15 && speed != 0){
      this.sprite.play('slimemove', true)
      this.sprite.setFlipX(false);
    } else if (this.warrior.container.x - this.container.x < 15 && speed != 0){
      this.sprite.play('slimemove', true)
      this.sprite.setFlipX(true)
    } else {
      if (this.getFacingDirection()){
      this.sprite.setFlipX(true)
      this.sprite.play('slimeidle', true)
      } 
      if (!this.getFacingDirection()){
        this.sprite.setFlipX(false)
        this.sprite.play('slimeidle', true)
      }
    }

    if (this.getFacingDirection() == 'left') {
      this.hitbox.x = 10; // Adjust the value based on your hitbox position when facing left
    } else {
      this.hitbox.x = -10; // Adjust the value based on your hitbox position when facing right
    }

  }
}
