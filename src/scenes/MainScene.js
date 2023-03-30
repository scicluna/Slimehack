import Phaser from 'phaser';
import Warrior from '../js/Warrior';
import forestImg from '../assets/backgrounds/forest.jpg';
import warriorSprites from '../assets/imgs/sprites/Warrior_Sheet-Effect.png' 

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

    preload() {
        //preload sprites
        this.load.image('forest', forestImg);
        this.load.spritesheet('warrior', warriorSprites ,{ frameWidth: 69, frameHeight: 44 });
    }

    create() {
    // Initialize the Warrior instance and any other game objects here
    this.add.image(500, 400, 'forest');
    this.warrior = new Warrior(this, 150, 150);
    

    // ... Other game object initialization and input handling ...
    }

    update() {
    // Update the Warrior instance and any other game objects here
    this.warrior.update();

    // ... Other game object updates ...
    }
}