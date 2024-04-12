import GameScene from './Scenes/GameScene.js'
import MenuScene from './Scenes/MenuScene.js'
import HighscoreScene from './Scenes/HighscoreScene.js'
import PauseScene from './Scenes/PauseScene.js'
import PreloadScene from './Scenes/PreloadScene.js'

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
			debug: true, // false um Umrandungen auszublenden
		},
	},
	scene: [
		new PreloadScene(settings),
		new MenuScene(settings),
		new HighscoreScene(settings),
		new GameScene(settings),
		new PauseScene(settings),
	],
}

new Phaser.Game(config)