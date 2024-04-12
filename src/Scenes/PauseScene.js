import GeneralScene from './GeneralScene.js'

class PauseScene extends GeneralScene {
	constructor(settings) {
		super('PauseScene', settings)
	}

	create({ gameOver }) {
		this.cameras.main.setBackgroundColor('rgba(3, 47, 62, 0.6)')

		this.createText({
			text: 'Menu',
			func: () => this.backToMenu(),
		})

		gameOver ? this.addGameOver() : this.addBackButton()
	}

	addBackButton() {
		this.backButton = this.createText({
			y: this.config.height - this.config.textSpace,
			text: 'Back',
			func: () => this.backToGame(),
		})
	}

	addGameOver() {
		this.backButton && (this.backButton.visible = false)
		this.createText({
			y: this.config.center.y - this.config.textSpace,
			text: 'Game Over',
		})
	}

	backToMenu() {
		this.scene.stop('GameScene')
		this.scene.start('MenuScene')
	}

	backToGame() {
		this.scene.sleep()
		this.scene.resume('GameScene')
	}
}

export default PauseScene