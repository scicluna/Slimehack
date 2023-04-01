import Phaser from 'phaser';
import {Monster} from './Monster';

export class Slime extends Monster {
  constructor(scene, x, y, warrior, slimespeed) {
    const hitboxWidth = 30;
    const hitboxHeight = 40;
    super(scene, x, y, 'slime', hitboxWidth, hitboxHeight);
    this.warrior = warrior;
    this.slimespeed = slimespeed;
    this.facingDirection = 'right';

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

  update() {
    if (this.isDying) return;
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
  }
}
