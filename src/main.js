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
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MainScene, GameOverScene]
};

export const admin = false
const game = new Phaser.Game(config);

//GOALS:
//Slimes occasionally jump at the player. -- GOOD ENOUGH, the hitbox is slightly jank
//Slimes occassionally attack the player. -- DONE
//Slimes can come in all different colors.  -- DONE
//Pause button - DONE
//Save highscore to local storage and display top right  -- DONE
//Fix warrior hitbox so slimes on the left always collide -- DONE
//Rename to Slimehack
//Deploy somewhere

//Sound Effects
//Music
//More warrior animations/attacks