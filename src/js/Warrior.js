import Phaser from 'phaser';

export default class Warrior {
  constructor(scene, x, y) {
    this.scene = scene;
    
    // Initialize the warrior sprite
    this.sprite = this.scene.add.sprite(0, 15, 'warrior');
    this.sprite.setScale(2);

    // Designate the warrior's hitbox
    this.hitbox = this.scene.add.rectangle(-15, 30, 35, 35);
    this.scene.physics.add.existing(this.hitbox);
    this.hitbox.setFillStyle(0xff0000, 0.5);
    this.hitbox.body.setAllowGravity(false)


    this.attackHitbox = this.scene.add.rectangle(0, 0, 80, 80 );
    this.scene.physics.add.existing(this.attackHitbox);
    this.attackHitbox.setFillStyle(0x00ff00, 0.5);
    this.attackHitbox.body.setAllowGravity(false);
    this.attackHitbox.active = false



    // Create a container to hold the warrior sprite and its hitbox
    this.container = this.scene.add.container(x, y, [this.sprite, this.hitbox, this.attackHitbox]);
    this.scene.physics.world.enable(this.container);
    this.container.body.collideWorldBounds = true;


    

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
  
  getFacingDirection() {
    return this.sprite.flipX ? 'left' : 'right';
  }

  createAttackHitbox() {
    this.attackHitbox.active = true
  }

  destroyAttackHitbox() {
    if (!this.spacebar.isDown){
    this.attackHitbox.active = false
    }
  }
  
  update() {
    const clampedX = Phaser.Math.Clamp(this.container.x, 0, 1000);
    this.container.x = clampedX;
    
    // Set the warrior's velocity to 0 by default
    const speed = 200;
    const jumpSpeed = 250;
    const aerialDrift = 100;
    const self = this.container.body;
    self.setVelocityX(0);
  
    if (this.spacebar.isDown && self.onFloor()) {
      this.sprite.play('attack', true);
      this.createAttackHitbox();
      this.scene.time.delayedCall(5, () => {
        this.destroyAttackHitbox();
      })
      return;
    } else if (this.spacebar.isDown && !self.onFloor() && this.cursors.left.isDown) {
      self.setVelocityX(-speed + aerialDrift);
      this.sprite.play('attack', true);
      this.createAttackHitbox();
      this.scene.time.delayedCall(5, () => {
        this.destroyAttackHitbox();
      })
      return;
    } else if (this.spacebar.isDown && !self.onFloor() && this.cursors.right.isDown) {
      self.setVelocityX(speed - aerialDrift);
      this.sprite.play('attack', true);
      this.createAttackHitbox();
      this.scene.time.delayedCall(5, () => {
        this.destroyAttackHitbox();
      })
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
    if (this.getFacingDirection() === 'left') {
      this.hitbox.x = 15; // Adjust the value based on your hitbox position when facing left
    } else {
      this.hitbox.x = -15; // Adjust the value based on your hitbox position when facing right
    }

    if (this.getFacingDirection() === 'left') {
      this.attackHitbox.x = -10; // Adjust the value based on your hitbox position when facing left
    } else {
      this.attackHitbox.x = 10; // Adjust the value based on your hitbox position when facing right
    }
  }
  

}