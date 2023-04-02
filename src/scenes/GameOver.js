const Phaser = window.Phaser;

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
    this.add.text(centerX, centerY + 100, 'Press [ENTER] to try again', { fontSize: '24px', color: '#FFFFFF' }).setOrigin(0.5);
    this.add.text(centerX, centerY + 150, 'Enter your initials to submit your highscore.', { fontSize: '24px', color: '#FFFFFF' }).setOrigin(0.5);

    const inputElement = this.add.dom(centerX, centerY + 250, 'input', 'width: 100px; height: 30px; font: 24px Arial; color: black;', '').setOrigin(0.5);
    inputElement.node.maxLength = 3;
    inputElement.addListener('input');

    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.enter.on('down', () => {
      const initials = inputElement.node.value;
      saveScore(this.score, initials);
      this.scene.start('MainScene');
    });
  }
}

function saveScore(score, initials) {
  if (initials == undefined) return
  const newScore = {
    score,
    initials
  }
  fetch('http://localhost:3000/api/highscores', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newScore)
})
  .then((response) => response.json())
  .then((score) => {
    // Handle saved high score

  });

}