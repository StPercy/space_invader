class Highscorescene extends Phaser.Scene {
    constructor(settings) {
        super('HighscoreScene')
            this.config = settings
    }

    preload() {
        this.load.image('background', 'assets/space_invader/images/space.jpeg')  
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0, 0).setScrollFactor(0)
        
        this.add.text(this.config.center.x, this.config.center.y - this.config.textSpace, 'Highscore: 0', {
            fontSize: '32px',
        })
        .setOrigin(0.5)
        .setScrollFactor(0)

        const backButton = this.add
            .text(this.config.center.x, this.config.height - this.config.textSpace, 'back', {
                fontSize: '32px',
                fontStyle: 'bold',
                fill: 'white',
            })
            .setOrigin()
            .setScrollFactor(0)
            .setInteractive()

        backButton.on('pointerover', () => {
            backButton.setStyle({ fill: 'black' })
        })
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: 'white' })
        })
        backButton.on('pointerdown', () => {
            this.scene.start('MenuScene')
        })
    }

    update() {
        // Add code here
    }
}

export default Highscorescene;