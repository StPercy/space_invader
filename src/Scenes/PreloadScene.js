import GeneralScene from './GeneralScene.js'

class PreloadScene extends GeneralScene {
	constructor(settings) {
		super('PreloadScene', settings)
	}
	init() {
		this.cameras.main.setBackgroundColor('rgba(3, 47, 62, 0.6)')
		this.progressBar = this.add.graphics()
		this.loadingText = this.createText({
			y: this.config.center.y + this.config.textSpace,
			text: 'Loading...',
		})

		this.load.on('progress', value => {
			this.progressBar.clear()
			this.progressBar.fillStyle(0xffffff)
			this.progressBar.fillRect(this.config.center.x - 150, this.config.center.y, 300 * value, 30)
		})

		this.load.on('complete', () => {
			this.progressBar.visible = false
			this.loadingText.visible = false
			this.createText({
				text: 'PLAY',
				func: () => this.scene.start('MenuScene'),
			})
		})
	}

	preload() {
		this.load.image('background', 'assets/images/space.jpeg')
		this.load.image('player', 'assets/images/Ship.png')
		this.load.image('bullet', 'assets/images/Bullet.png')
		this.load.image('enemyTop1', 'assets/images/InvaderA1.png')
		this.load.image('enemyTop2', 'assets/images/InvaderA2.png')
		this.load.image('enemyMiddle1', 'assets/images/InvaderB1.png')
		this.load.image('enemyMiddle2', 'assets/images/InvaderB2.png')
		this.load.image('enemyBottom1', 'assets/images/InvaderC1.png')
		this.load.image('enemyBottom2', 'assets/images/InvaderC2.png')
		this.load.image('block', 'assets/images/OkBlock.png')
		this.load.image('blockHit', 'assets/images/WeakBlock.png')

		this.load.audio('enemyBullet', 'assets/sounds/InvaderBullet.wav')
		this.load.audio('enemyHit', 'assets/sounds/InvaderHit.wav')
		this.load.audio('playerBullet', 'assets/sounds/ShipBullet.wav')
		this.load.audio('playerHit', 'assets/sounds/ShipHit.wav')
		this.load.audio('themeMusic', 'assets/sounds/BackgroundTheme.mp3')
	}

	create() {}
}

export default PreloadScene