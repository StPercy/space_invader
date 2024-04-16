import GeneralScene from "./GeneralScene.js"    
class HighscoreScene extends GeneralScene {
    constructor(settings) {
        super('HighscoreScene', settings)
    }

    create() {
        super.create()
        this.createText({
          text: `Highscore: ${this.registry.get('highscore') || 0}`,
        })
        this.createText({
          y: this.config.height - this.config.textSpace,
          text: 'Back',
          func: () => this.scene.start('MenuScene'),
        })
    }
}

export default HighscoreScene