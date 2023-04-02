const Phaser = window.Phaser;
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
//Mongoose DB integration for highscores
//Heroku Deploy

//Sound Effects
//Music
//More warrior animations/attacks
//Fix deploy issue with the ./bundle.js (wonder if my fix worked... idk...)
//Title Screen
//Tutorial that shows up when no cookie