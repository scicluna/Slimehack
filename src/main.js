const Phaser = window.Phaser;
import MainScene from './scenes/MainScene.js';
import GameOverScene from './scenes/GameOver.js';
import TitleScene from './scenes/TitleScene.js';

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
    scene: [TitleScene, MainScene, GameOverScene]
};

export const admin = false
const game = new Phaser.Game(config);

//GOALS:
//Mongoose DB integration for highscores - DONE
//Heroku Deploy - DONE

//Sound Effects - DONE
//Music - DONE

//Local OR Heroku workaround for test purposes - DONE

//Title Screen - DONE
//Tutorial - DONE

//ULTRA BONUS:
//More warrior animations/attacks
//Slimes jumping after death check - DONE