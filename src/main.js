import Phaser from 'phaser'
import MainScene from './scenes/MainScene.js';

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
    scene: [MainScene]
};

export const admin = true
const game = new Phaser.Game(config);
