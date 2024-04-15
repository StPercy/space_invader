class MenuScene extends Phaser.Scene {
    constructor(settings) {
        super('MenuScene')
            this.config = settings
        }

    preload() {
        this.load.image('background', 'assets/space_invader/images/space.jpeg')
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0).setScrollFactor(0)
        
        const startButton = this.add
            .text(this.config.center.x, this.config.center.y - this.config.textSpace, 'Start Game', {
                fontSize: '32px',
                fontStyle: 'bold',
                fill: 'aqua',
            })
            .setOrigin()
            .setScrollFactor(0)
            .setInteractive() // make button interactive
        
        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: 'blue' })
        })
        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: 'aqua' })
        })
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene')
        })

        const highscoreButton = this.add
            .text(this.config.center.x, this.config.center.y, 'Highscore', {
                fontSize: '32px',
                fontStyle: 'bold',
            })
            .setOrigin()
            .setScrollFactor(0)
            .setInteractive()
        
        highscoreButton.on('pointerover', () => {
            highscoreButton.setStyle({ fill: 'black' })
        })
        highscoreButton.on('pointerout', () => {
            highscoreButton.setStyle({ fill: 'white' })
        })
        highscoreButton.on('pointerdown', () => {
            this.scene.start('HighscoreScene')
        })

        const exitButton = this.add
            .text(this.config.center.x, this.config.center.y + this.config.textSpace, 'Exit', {
                fontSize: '32px',
                fontStyle: 'bold',
                fill: 'red',
            })
            .setOrigin()
            .setScrollFactor(0)
            .setInteractive()

        exitButton.on('pointerover', () => {
            exitButton.setStyle({ fill: 'deeppink' })
        })
        exitButton.on('pointerout', () => {
            exitButton.setStyle({ fill: 'red' })
        })
        exitButton.on('pointerdown', () => {
            this.game.destroy(true)
        })
    }

    update() {}
}

export default MenuScene