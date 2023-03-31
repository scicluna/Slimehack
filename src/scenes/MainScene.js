import Phaser from 'phaser';
import { admin } from '../main';
import Warrior from '../js/Warrior';
import {Slime} from '../js/Slime';
import forestImg from '../assets/backgrounds/forest.jpg';
import warriorSprites from '../assets/imgs/sprites/Warrior_Sheet-Effect.png';
import slime from '../assets/imgs/sprites/slime.png';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // Preload images and spritesheets
    this.load.image('forest', forestImg);
    this.load.spritesheet('warrior', warriorSprites, { frameWidth: 69, frameHeight: 44 });
    this.load.spritesheet('slime', slime, { frameWidth: 80, frameHeight: 72 });
  }

  create() {
    // Add background image
    this.add.image(500, 400, 'forest');
    // Set world bounds
    this.physics.world.setBounds(-200, 0, 2000, 800);
    this.createScoreText()

    // Create Warrior and set up collision with world bounds
    this.warrior = new Warrior(this, 100, 800);
    this.warrior.container.body.setCollideWorldBounds(true);
    this.warriorInvincible = false

    // Create Slime groups and set up collision with world bounds
    this.slimes = this.physics.add.group({
      collideWorldBounds: true, // Set collideWorldBounds for the entire group
    });
    this.slimeHitboxes = this.physics.add.group({
      collideWorldBounds: true,
    });
    
    // Add collider between Slime hitboxes
    this.physics.add.collider(this.slimeHitboxes, this.slimeHitboxes);

    // Set up Slime spawning properties
    this.slimeCap = 8;
    this.slimeSpeed = 40;

    // Spawn Slimes every 3 seconds
    this.time.addEvent({
      delay: 3000,
      callback: () => this.spawnSlimes(3, this.slimeCap),
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    // Update Warrior
    this.warrior.update();

    // Update Slimes
    this.slimes.children.iterate((slimeContainer) => {
      const slime = slimeContainer.getData('instance');
      slime.update();
    });

    // Increment slimeCap and slimeSpeed over time
    this.slimeCap += 0.001;
    this.slimeSpeed += 0.01;
  }

  // Spawn Slimes function
  spawnSlimes(amt, slimeCap) {

    // Don't spawn more Slimes if the current number of Slimes exceeds the cap
    if (this.slimes.children.entries.length > Math.floor(slimeCap)) return;

    // Clean up dead Slimes
    this.cleanupSlimes();

    // Set spawn bounds for Slimes
    let xSpawnbound1 = 1100;
    let xSpawnbound2 = 1300;

    // Randomly spawn Slimes from the left or right side
    const rng = Math.ceil(Math.random() * 2);
    if (rng == 1) {
      xSpawnbound1 = (xSpawnbound1 - 1000) * -1;
      xSpawnbound2 = (xSpawnbound2 - 1000) * -1;
    }

    // Spawn the specified number of Slimes
    for (let i = 0; i < amt; i++) {
      const newSlime = new Slime(this, Phaser.Math.FloatBetween(xSpawnbound1, xSpawnbound2), 800, this.warrior, this.slimeSpeed);
      
        // Set up Slime properties and add to the Slime groups
        newSlime.container.body.setCollideWorldBounds(false);
        newSlime.hitbox.setData('instance', newSlime);
        newSlime.container.body.setDamping(true);
        this.slimes.add(newSlime.container);
        this.slimeHitboxes.add(newSlime.hitbox);
        newSlime.container.body.setVelocityX(-100);
  
        // Add overlap between Warrior hitbox and Slime hitbox for taking damage
        this.physics.add.overlap(this.warrior.hitbox, newSlime.hitbox, () => {
          if (this.warriorInvincible) return
          this.warrior.takeDamage(this.warrior.getFacingDirection() === 'left' ? 'right' : 'left');
          this.makeWarriorInvincible(1000);
        }, null, this);
  
        // Set up Warrior attack hitbox and overlap with Slime hitbox for dealing damage
        this.physics.add.overlap(this.warrior.attackHitbox, newSlime.hitbox, () => {
          if (this.warrior.attackHitbox.active) {
            console.log('kill');
            newSlime.die();
            this.score++
            this.scoreText.setText(`Score: ${this.score}`);
          }
        }, null, this);
      }
    }
  
    // Clean up dead Slimes
    cleanupSlimes() {
      this.slimes.children.each((slimeContainer) => {
        const slime = slimeContainer.getData('instance');
        if (slime.isDead) {
          this.slimes.remove(slimeContainer, true, true);
          this.slimeHitboxes.remove(slime.hitbox, true, true);
        }
      });
    }

    makeWarriorInvincible(duration) {
      if (this.warriorInvincible) return;
    
      this.warriorInvincible = true;
      this.warrior.sprite.setAlpha(0.5);
    
      this.time.delayedCall(duration, () => {
        this.warriorInvincible = false;
        this.warrior.sprite.setAlpha(1);
      });
    }

    createScoreText() {
      const style = {
        fontSize: '32px',
        fill: '#ffffff',
      };
      if (this.score == undefined) this.score = 0
      this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, style);
    }
    
  }
