// src/characters/Warrior.js
import Phaser from 'phaser';

export default class Warrior {
  constructor(scene, x, y) {
    this.scene = scene;

    // Initialize the warrior sprite
    this.sprite = this.scene.add.sprite(x, y, 'warrior');

    // Set the scale to make it twice as big (optional)
    this.sprite.setScale(2);

    // Enable physics for the warrior
    this.scene.physics.add.existing(this.sprite);
    this.sprite.body.collideWorldBounds = true;

    // Set up warrior animations
    this.createAnimations();

    // Enable cursor keys for input
    this.cursors = this.scene.input.keyboard.createCursorKeys();
  }

  createAnimations() {
    // Create walk cycle animations
    this.scene.anims.create({
      key: 'walk-left',
      frames: this.scene.anims.generateFrameNumbers('warrior', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'walk-right',
      frames: this.scene.anims.generateFrameNumbers('warrior', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    // Create idle animations (using the turnaround frame)
    this.scene.anims.create({
      key: 'idle-left',
      frames: [{ key: 'warrior', frame: 4 }],
      frameRate: 1,
    });

    this.scene.anims.create({
      key: 'idle-right',
      frames: [{ key: 'warrior', frame: 4 }],
      frameRate: 1,
    });
  }

  update() {
    // Set the warrior's velocity to 0 by default
    const speed = 200;
    this.sprite.body.setVelocity(0);
  
    // Update the warrior's position based on arrow keys input
    if (this.cursors.left.isDown) {
      this.sprite.body.setVelocityX(-speed);
      this.sprite.play('walk-left', true);
    } else if (this.cursors.right.isDown) {
      this.sprite.body.setVelocityX(speed);
      this.sprite.play('walk-right', true);
    } else {
      // Play idle animation when the warrior is not moving horizontally
      const currentAnim = this.sprite.anims.currentAnim;
      if (currentAnim && currentAnim.key.includes('walk')) {
        this.sprite.play(`idle-${currentAnim.key.split('-')[1]}`);
      }
    }
  
    if (this.cursors.up.isDown) {
      this.sprite.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.sprite.body.setVelocityY(speed);
    }
  }
}  
