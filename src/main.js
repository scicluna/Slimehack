import Phaser from 'phaser'
import MainScene from './scenes/MainScene.js';
import GameOverScene from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: [MainScene, GameOverScene]
};

export const admin = true
const game = new Phaser.Game(config);

//GOALS:
//Slimes occasionally jump at the player.
//Slimes occassionally attack the player.
//Slimes can come in all different colors. 
//More warrior animations/attacks
//Pause button