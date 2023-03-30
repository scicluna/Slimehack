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
    this.spacebar = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  createAnimations() {
    // Create run cycle animations
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('warrior', { start: 6, end: 13 }),
      frameRate: 10,
      repeat: -1,
    });

    // Create idle animations
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('warrior', { start: 0, end: 5 }),
      frameRate: 1,
    });

    // Create turn-cycle animation (not sure if working)
    this.scene.anims.create({
      key: 'turn',
      frames: [{ key: 'warrior', frame: 0 }],
      frameRate: 20
    });

    // Create jumping animation
    this.scene.anims.create({
      key: 'jump',
      frames: this.scene.anims.generateFrameNumbers('warrior', { start: 40, end: 48 }),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: false,
    })

    // Create attacking animation
    this.scene.anims.create({
      key: 'attack',
      frames: this.scene.anims.generateFrameNumbers('warrior', { start: 14, end: 25 }),
      frameRate: 15,
      repeat: -1
    })
  }


  update() {
    // Set the warrior's velocity to 0 by default
    const speed = 200;
    const jumpSpeed = 250;
    const self = this.sprite.body;
    self.setVelocityX(0);
  
    if (this.spacebar.isDown && self.onFloor()) {
      this.sprite.play('attack', true);
      return;
    } else if (this.spacebar.isDown && !self.onFloor() && this.cursors.left.isDown) {
      self.setVelocityX(-speed);
      this.sprite.play('attack', true);
      return;
    } else if (this.spacebar.isDown && !self.onFloor() && this.cursors.right.isDown) {
      self.setVelocityX(speed);
      this.sprite.play('attack', true);
      return;
    }
  
    // Update the warrior's position based on arrow keys input
    if (this.cursors.left.isDown) {
      self.setVelocityX(-speed);
      this.sprite.setFlipX(true);
      if (self.onFloor()) {
        this.sprite.play('run', true);
      } else {
        if (!this.sprite.anims.isPlaying || this.sprite.anims.currentAnim.key !== 'jump') {
          this.sprite.play('jump');
        }
      }
    } else if (this.cursors.right.isDown) {
      self.setVelocityX(speed);
      this.sprite.setFlipX(false);
  
      if (self.onFloor()) {
        this.sprite.play('run', true);
      } else {
        if (!this.sprite.anims.isPlaying || this.sprite.anims.currentAnim.key !== 'jump') {
          this.sprite.play('jump');
        }
      }
    } else {
      // Play idle animation when the warrior is not moving horizontally
      const currentAnim = this.sprite.anims.currentAnim;
      if (currentAnim && currentAnim.key.includes('run')) {
        self.setVelocityX(0);
        this.sprite.play('idle', true);
      } else if (!self.onFloor()) {
        // Do nothing and let the jump animation play out
      } else if (!this.sprite.anims.currentAnim.key == 'attack') {
        // Do nothing
      }
      this.sprite.play('idle', true);
    }
  
    if (this.cursors.up.isDown && self.onFloor()) {
      if (this.sprite.anims.currentAnim.key !== 'jump') {
        this.sprite.play('jump');
        self.setVelocityY(-jumpSpeed);
      }
    }
  }
  
}