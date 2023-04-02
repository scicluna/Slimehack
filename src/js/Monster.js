const Phaser = window.Phaser;
import { admin } from '../main';

export class Monster {
  constructor(scene, x, y, textureKey, hitboxWidth, hitboxHeight) {
    this.scene = scene;
    this.isDead = false;

    // Initialize the sprite
    this.sprite = this.scene.add.sprite(0, 0, textureKey);
    this.sprite.setScale(2);

    // Designate the hitbox
    this.hitbox = this.scene.add.rectangle(9, 13, hitboxWidth, hitboxHeight);
    this.scene.physics.add.existing(this.hitbox);
    this.hitbox.body.setAllowGravity(false);

    // Create a container to hold the sprite and its hitbox
    this.container = this.scene.add.container(x, y, [this.sprite, this.hitbox]);
    this.scene.physics.world.enable(this.container);
    this.container.body.collideWorldBounds = true;
    this.container.setData('instance', this);
    this.container.body.setOffset(0, -40);

    // Admin tools
    if (admin){
    this.hitbox.setFillStyle(0xff0000, 0.5);
    }
  }

  die() {
    // Implement die() in subclasses
  }

  update() {
    // Implement update() in subclasses
  }
}
