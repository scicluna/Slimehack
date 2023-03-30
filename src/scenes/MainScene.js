import Phaser from 'phaser';
import Warrior from '../js/Warrior';
import Slime from '../js/Slime';
import forestImg from '../assets/backgrounds/forest.jpg';
import warriorSprites from '../assets/imgs/sprites/Warrior_Sheet-Effect.png' 
import slimeMove from '../assets/imgs/sprites/slime_move.png'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

    preload() {
        //preload sprites
        this.load.image('forest', forestImg);
        this.load.spritesheet('warrior', warriorSprites ,{ frameWidth: 69, frameHeight: 44});
        this.load.spritesheet('slime', slimeMove, {frameWidth: 80, frameHeight: 72})
    }

    create() {
    // Initialize the Warrior instance and ddany other game objects here
    this.add.image(500, 400, 'forest');
    this.warrior = new Warrior(this, 100, 800);
    this.slime = new Slime(this, 500, 800, this.warrior);

    this.physics.add.overlap(this.warrior.hitbox, this.slime.hitbox, () => {
      console.log("ow");
    })
  }



    // ... Other game object initialization and input handling ...
    

    update() {
    // Update the Warrior instance and any other game objects here
    this.warrior.update();
    this.slime.update(this.warrior.sprite);

    // ... Other game object updates ...
  }
}