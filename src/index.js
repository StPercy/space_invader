import GameScene from './Scenes/GameScene.js';
import MenuScene from './Scenes/MenuScene.js';
import HihgscoreScene from './Scenes/HighscoreScene.js';

const WIDTH = 1280
const HEIGHT = 720

const settings = {
    width: WIDTH,
    height: HEIGHT,
    center: {
        x: WIDTH / 2,
        y: HEIGHT / 2,
    },
    textSpace: 50,
}

const config = {
    type: Phaser.AUTO,
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: settings.width,
		height: settings.height,
	},
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    scene: [new MenuScene(settings), new HihgscoreScene(settings), new GameScene()],
}	

new Phaser.Game(config);

