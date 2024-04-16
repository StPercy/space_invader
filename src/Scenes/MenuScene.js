import GeneralScene from './GeneralScene.js'

class MenuScene extends GeneralScene {
	constructor(settings) {
		super('MenuScene', settings)
	}

	create() {
		super.create()

        this.setupMusic()

		this.createText({
			y: this.config.center.y - this.config.textSpace,
			text: 'Start Game',
			func: () => this.scene.start('GameScene'),
		})

		this.createText({
			text: 'Highscore',
			func: () => this.scene.start('HighscoreScene'),
		})

		this.createText({
			y: this.config.center.y + this.config.textSpace,
			text: 'Exit',
			func: () => this.game.destroy(true),
		})
	}

    // setupMusic helper function
	setupMusic() {
		if (this.backgroundMusic) {
			this.backgroundMusic.resume()
			return
		}
		this.backgroundMusic = this.sound.add('themeMusic', { volume: 0.3, loop: true })
		this.backgroundMusic.play()
	}
}

export default MenuScene