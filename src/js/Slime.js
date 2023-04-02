import Phaser from 'phaser';
import {Monster} from './Monster';

export class Slime extends Monster {
  constructor(scene, x, y, warrior, slimespeed) {
    const hitboxWidth = 30;
    const hitboxHeight = 40;
    super(scene, x, y, 'slime', hitboxWidth, hitboxHeight);
    this.hitboxy = 40;
    this.warrior = warrior;
    this.slimespeed = slimespeed;
    this.facingDirection = 'right';
    this.isJumping = false
    this.isAttacking = false
    const randomTint = Phaser.Math.RND.between(0x777777, 0xFFFFFF);
    this.sprite.setTint(randomTint);

    // Set up slime animations
    this.createAnimations();
    this.sprite.active = true;
  }

  createAnimations() {

    this.scene.anims.create({
      key: 'slimemove',
      frames: this.scene.anims.generateFrameNumbers('slime', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'slimeidle',
      frames: this.scene.anims.generateFrameNumbers('slime', { start: 5, end: 6 }),
      frameRate: 2,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'slimedie',
      frames: this.scene.anims.generateFrameNumbers('slime', { start: 7, end: 22 }),
      frameRate: 10,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'slimejump',
      frames: this.scene.anims.generateFrameNumbers('slime', {start: 23, end: 32 }),
      frameRate: 10,
      repeat: 0
    })

    this.scene.anims.create({
      key: 'slimeattack',
      frames: this.scene.anims.generateFrameNumbers('slime', {start: 33, end: 46})
    })
  }

  die() {
    this.isDying = true;
    this.sprite.play('slimedie', true);
    this.hitbox.destroy();
    this.container.body.setVelocity(0, 0);
    this.scene.time.delayedCall(1500, () => {
      this.isDead = true
      this.sprite.destroy();
      this.container.destroy();
    });
  }

  jump() {
    if (!this.isJumping) {
      const jumpSpeed = 250;
      this.isJumping = true;
      this.container.body.setVelocityX(0);
  
      // Store the initial hitbox scale
      this.initialHitboxY = this.hitbox.y;
      this.initialDisplayHeight = this.hitbox.displayHeight
  
      this.scene.time.delayedCall(400, () => {
        // Adjust the hitbox scale during the jump
        this.container.body.setVelocityY(-jumpSpeed);
        this.sprite.play('slimejump', true);
        if (this.facingDirection == 'right') {
          this.container.body.setVelocityX(this.slimespeed);
        } else {
          this.container.body.setVelocityX(-this.slimespeed);
        }
      });

      this.scene.time.delayedCall(500, () => {
        this.hitbox.y -= this.initialDisplayHeight / .6 
      });

      this.scene.time.delayedCall(750 , () =>{
        this.hitbox.y -= this.initialDisplayHeight / .9
      });

      this.scene.time.delayedCall(1500, () => {
        // Reset the hitbox scale after the jump
        this.hitbox.y = this.initialHitboxY;
        this.isJumping = false;
      });
    }
  }

  attack(){
    this.isAttacking = true;
    this.container.body.setVelocityX(0);
    this.sprite.play('slimeattack', true)

    // Store the initial hitbox scale
    this.initialHitboxScaleX = this.hitbox.scaleX;
    this.initialHitboxScaleY = this.hitbox.scaleY;
    this.initialHitboxX = this.hitbox.x;

    if (this.facingDirection == 'left'){
      this.hitbox.x -= 15
    } else this.hitbox.x += 15

    // Adjust the hitbox scale during the attack
    this.hitbox.setScale(this.hitbox.scaleX * 2, this.hitbox.scaleY * 1.5);

    this.scene.time.delayedCall(1000, () => {
      // Reset the hitbox scale after the attack
      this.hitbox.setScale(this.initialHitboxScaleX, this.initialHitboxScaleY);
      this.isAttacking = false;
    })
  }
  
  

  update() {
    if (this.isDying || this.isJumping || this.isAttacking) return;
    const self = this.container.body;
 
    // Calculate the direction towards the warrior
    const direction = new Phaser.Math.Vector2(this.warrior.container.x - this.container.x, this.warrior.container.y - this.container.y);
    direction.normalize();

    let speed;
    // Set the velocity of the slime towards the warrior
    if (Math.abs(direction.x) < 0.2) {
      speed = 0;
    } else speed = this.slimespeed;

    self.setVelocityX(direction.x * speed);

    // Animate the Slime
    if (this.warrior.container.x - this.container.x > -15 && speed != 0) {
      this.sprite.play('slimemove', true);
      this.sprite.setFlipX(false);
      this.facingDirection = 'right';
    } else if (this.warrior.container.x - this.container.x < 15 && speed != 0) {
    this.sprite.play('slimemove', true);
    this.sprite.setFlipX(true);
    this.facingDirection = 'left';
    } else {
      if (this.facingDirection == 'left') {
      this.sprite.setFlipX(true);
      this.sprite.play('slimeidle', true);
      } else
{
      this.sprite.setFlipX(false);
      this.sprite.play('slimeidle', true);
      }
    }if (this.facingDirection == 'left') {
      this.hitbox.x = 10; // Adjust the value based on your hitbox position when facing left
    } else {
      this.hitbox.x = -10; // Adjust the value based on your hitbox position when facing right
    }

    if (Math.random() < 0.005 && self.onFloor()) {
      this.jump();
    }

    if (Math.random() < 0.005 && self.onFloor()) {
      this.attack();
    }

  }
}
