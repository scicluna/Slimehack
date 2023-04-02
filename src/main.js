import Phaser from 'phaser'
import MainScene from './scenes/MainScene.js';
import GameOverScene from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1000,
    height: 800,
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainScene, GameOverScene]
};

export const admin = false
const game = new Phaser.Game(config);

//GOALS:
//Sound Effects
//Music
//More warrior animations/attacks
//Fix deploy issue with the ./bundle.js (wonder if my fix worked... idk...)
//Mongoose DB integration for highscores
//Enter for new game
//Title Screen
//Heroku Deploy