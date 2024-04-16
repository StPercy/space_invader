import GeneralScene from './GeneralScene.js'
class PauseScene extends GeneralScene {
    constructor(settings) {
        super('PauseScene', settings)
      
    }

    create() {
        this.cameras.main.setBackgroundColor('rgba(3, 47, 62, 0.6)')

        this.createText({
            text: 'Menu',
            func: () => this.backToMenu(),
        })

        this.createText({
            y: this.config.height - this.config.textSpace,
            text: 'Back',
            func: () => this.backToGame(),
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