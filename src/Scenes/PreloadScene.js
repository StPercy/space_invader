class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene')
    }

    init() {
        this.load.on('complete', () => {
            this.scene.start('MenuScene')
        })
    }
    preload() {
        // audio
        this.load.audio('enemyBullet', 'assets/sounds/InvaderBullet.wav')
        this.load.audio('enemyHit', 'assets/sounds/InvaderHit.wav')
        this.load.audio('playerBullet', 'assets/sounds/ShipBullet.wav')
        this.load.audio('playerHit', 'assets/sounds/ShipHit.wav')
        this.load.audio('themeMusic', 'assets/sounds/BackgroundTheme.mp3')
        // images
        this.load.image('background', 'assets/space_invader/images/space.jpeg')
        this.load.image('player', 'assets/space_invader/images/Ship.png')
        this.load.image('bullet', 'assets/space_invader/images/Bullet.png')
        this.load.image('enemyTop1', 'assets/space_invader/images/InvaderA1.png')
        this.load.image('enemyTop2', 'assets/space_invader/images/InvaderA2.png')
        this.load.image('enemyMiddle1', 'assets/space_invader/images/InvaderB1.png')
        this.load.image('enemyMiddle2', 'assets/space_invader/images/InvaderB2.png')
        this.load.image('enemyBottom1', 'assets/space_invader/images/InvaderC1.png')
        this.load.image('enemyBottom2', 'assets/space_invader/images/InvaderC2.png')
        this.load.image('block', 'assets/space_invader/images/OkBlock.png')
        this.load.image('blockHit', 'assets/space_invader/images/WeakBlock.png')
    }

    create() {
    }
}

export default PreloadScene