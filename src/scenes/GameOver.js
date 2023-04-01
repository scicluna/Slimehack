import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  init(data) {
    this.score = data.score;
  }

  create() {
    this.cameras.main.setBackgroundColor('#000000');
    const centerX = this.cameras.main.centerX;
    const centerY = this.cameras.main.centerY;

    this.add.text(centerX, centerY - 100, 'Game Over', { fontSize: '48px', color: '#FFFFFF' }).setOrigin(0.5);
    this.add.text(centerX, centerY, `Score: ${this.score}`, { fontSize: '32px', color: '#FFFFFF' }).setOrigin(0.5);
    this.add.text(centerX, centerY + 100, 'Press [SPACE] to try again', { fontSize: '24px', color: '#FFFFFF' }).setOrigin(0.5);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.spacebar.on('down', () => {
      this.scene.start('MainScene');
    });
  }
}
