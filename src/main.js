import Phaser from 'phaser'
import MainScene from './scenes/MainScene.js';

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 30000 },
            debug: false
        }
    },
    scene: [MainScene]
};

const game = new Phaser.Game(config);
