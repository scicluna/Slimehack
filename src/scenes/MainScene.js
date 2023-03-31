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
    this.warrior = new Warrior(this, 100, 800);
    this.slime = new Slime(this, 500, 800, this.warrior);


    this.physics.add.overlap(this.warrior.hitbox, this.slime.hitbox, () => {
      console.log("ow");
    }, null, this)


    this.warrior.attackHitbox.active = false
    this.physics.add.overlap(this.warrior.attackHitbox, this.slime.hitbox, () => {
      if (this.warrior.attackHitbox.active){
        this.slime.isDead = true
        this.slime.container.body.setVelocity(0, 0)
        this.slime.die()
      }
    }, null, this)
  }

    // ... Other game object initialization and input handling ...
    

    update() {
    // Update the Warrior instance and any other game objects here
    this.warrior.update();
    this.slime.update(this.warrior.sprite);
    

    
    // ... Other game object updates ...
  }
}