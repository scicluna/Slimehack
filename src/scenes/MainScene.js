import Phaser from 'phaser';
import Warrior from '../js/Warrior';
import Slime from '../js/Slime';
import forestImg from '../assets/backgrounds/forest.jpg';
import warriorSprites from '../assets/imgs/sprites/Warrior_Sheet-Effect.png' 
import slime from '../assets/imgs/sprites/slime.png'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
      //preload sprites
      this.load.image('forest', forestImg);
      this.load.spritesheet('warrior', warriorSprites ,{ frameWidth: 69, frameHeight: 44});
      this.load.spritesheet('slime', slime, {frameWidth: 80, frameHeight: 72})
  }

  create() {
  // Initialize the Warrior instance and ddany other game objects here
  this.add.image(500, 400, 'forest');
  this.physics.world.setBounds(-200, 0, 2000, 800);

  this.warrior = new Warrior(this, 100, 800);
  this.warrior.container.body.setCollideWorldBounds(true);
  this.slimes = this.physics.add.group({
    collideWorldBounds: true // Set collideWorldBounds for the entire group
  });
  this.slimeHitboxes = this.physics.add.group({
    collideWorldBounds: true
  })

  this.spawnSlimes(5)
}

update() {
  this.warrior.update();

  this.slimes.children.iterate((slimeContainer) => {
    const slime = slimeContainer.getData('instance');
    slime.update();
  });

  this.physics.add.collider(this.slimeHitboxes, this.slimeHitboxes, this.handleSlimeCollision, null, this);
}
  
handleSlimeCollision(slimeHitbox1, slimeHitbox2) {
  const slime1 = slimeHitbox1.getData('instance');
  const slime2 = slimeHitbox2.getData('instance');

  const direction1 = new Phaser.Math.Vector2(slime2.container.body.velocity.x - slime1.container.body.velocity.x, slime2.container.body.velocity.y - slime1.container.body.velocity.y).normalize();
  const direction2 = new Phaser.Math.Vector2(slime1.container.body.velocity.x - slime2.container.body.velocity.x, slime1.container.body.velocity.y - slime2.container.body.velocity.y).normalize();

  const pushMultiplier = 20;
  const minVelocity = 50;

  const velocity1 = Math.max(minVelocity, 100 * pushMultiplier);
  const velocity2 = Math.max(minVelocity, 100 * pushMultiplier);

  slime1.container.body.setVelocity(direction1.x * velocity1, direction1.y * velocity1);
  slime2.container.body.setVelocity(direction2.x * velocity2, direction2.y * velocity2);
}



  spawnSlimes(amt) {
    this.cleanupSlimes();
    for (let i = 0; i < amt; i++) {
      const newSlime = new Slime(this, Phaser.Math.FloatBetween(1200, 1300), 800, this.warrior);
      newSlime.container.body.setCollideWorldBounds(false);
      newSlime.hitbox.setData('instance', newSlime);
      newSlime.container.body.setDamping(true);
      this.slimes.add(newSlime.container);
      this.slimeHitboxes.add(newSlime.hitbox)
      newSlime.container.body.setVelocityX(-100);
  
      this.physics.add.overlap(this.warrior.hitbox, newSlime.hitbox, () => {
        console.log("ow");
      }, null, this);


      this.warrior.attackHitbox.active = false;
      this.physics.add.overlap(this.warrior.attackHitbox, newSlime.hitbox, () => {
        if (this.warrior.attackHitbox.active) {
          console.log('kill');
          newSlime.die();
        }
      }, null, this);
    }
  }

  cleanupSlimes() {
    this.slimes.children.each((slimeContainer) => {
      const slime = slimeContainer.getData('instance');
      if (slime.dead) {
        this.slimes.remove(slimeContainer, true, true);
      }
    });
  }

    // ... Other game object initialization and input handling ...
    


}