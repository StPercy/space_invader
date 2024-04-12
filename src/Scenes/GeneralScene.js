class GeneralScene extends Phaser.Scene {
	constructor(key, config) {
		super(key)
		this.config = config
	}

	create() {
		this.add.image(0, 0, 'background').setOrigin(0, 0).setScrollFactor(0)
	}

	createText({ x = this.config.center.x, y = this.config.center.y, text, origin, func }) {
		const textButton = this.add
			.text(x, y, text, {
				fontSize: '32px',
			})
			.setScrollFactor(0)

		origin ? textButton.setOrigin(origin[0], origin[1]) : textButton.setOrigin()

		if (func) {
			textButton.setInteractive()
			textButton.on('pointerover', () => {
				textButton.setStyle({ fill: 'black' })
			})
			textButton.on('pointerout', () => {
				textButton.setStyle({ fill: 'white' })
			})
			textButton.on('pointerdown', () => func())
		}
		return textButton
	}
}

export default GeneralScene
