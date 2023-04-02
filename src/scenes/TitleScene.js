const Phaser = window.Phaser;
import titleImg from '../assets/backgrounds/title.png';

class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {
    // Load any assets needed for the title scene here
    this.load.image('title', titleImg);
  }

create() {
  // Add a background image or color
  this.add.image(500, 400, 'title');

  // Add title text
  const titleText = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY - 50,
    'Slime Hack',
    { fontSize: '48px', color: '#fff', fontFamily: 'Arial' }
  );
  titleText.setOrigin(0.5);

  // Add a start button or text
  const startText = this.add.text(
    this.cameras.main.centerX,
    this.cameras.main.centerY + 50,
    '[Enter]',
    { fontSize: '24px', color: '#fff', fontFamily: 'Arial' }
  );
  startText.setOrigin(0.5);
  startText.setInteractive({ useHandCursor: true });

  // Add event listener for clicking the start button/text
  startText.on('pointerup', () => {
    this.scene.start('MainScene'); // Start the main game scene
  });

  // Add event listener for pressing the Enter key
  this.input.keyboard.on('keydown-ENTER', () => {
    this.scene.start('MainScene'); // Start the main game scene
  });
}
}

export default TitleScene;
