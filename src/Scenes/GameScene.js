class GameScene extends Phaser.Scene {
    scoreText = ''
    score = 0
    lifeText = ''
    lives = 3
    walls = null
    player = null
    missiles = null
    enemies = null
    aKey = null
    dKey = null
    spacebar = null
    bullet = null
    gameOver = false
    enemyCount = 55
    gameTime = 0
    enemyStep = 20

    constructor() {
        super('GameScene')
    }

    preload() {
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
        this.add.image(0, 0, 'background').setOrigin(0, 0).setScrollFactor(0)
        this.scoreText = this.add
            .text(16, 16, 'Score: ' + this.score, { fontSize: '32px' })
            .setScrollFactor(0)
        this.lifeText = this.add
            .text(1100, 16, 'Lives: ' + this.lives, { fontSize: '32px' })
            .setScrollFactor(0)

        this.anims.create({
            key: 'moveEnemyTop',
            frames: [{ key: 'enemyTop2' }, { key: 'enemyTop1' }],
            frameRate: 2,
            repeat: -1,
        })

        this.anims.create({
            key: 'moveEnemyMiddle',
            frames: [{ key: 'enemyMiddle2' }, { key: 'enemyMiddle1' }],
            frameRate: 2,
            repeat: -1,
        })

        this.anims.create({
            key: 'moveEnemyBottom',
            frames: [{ key: 'enemyBottom2' }, { key: 'enemyBottom1' }],
            frameRate: 2,
            repeat: -1,
        })

        this.createHouses()
        this.createPlayer()
        this.missiles = this.physics.add.group()
        this.createEnemies()
        this.createKeys()
        this.createBullet()

        this.physics.add.collider(this.player, this.enemies, () => this.pauseGame())

        this.physics.add.collider(this.enemies, this.bullet, (enemy, bullet) =>
            this.handleHitEnemy(enemy, bullet),
        )

        this.physics.add.collider(this.bullet, this.walls, (bullet, wall) => this.handleHitWall(bullet, wall))

        this.physics.add.collider(this.missiles, this.walls, (missile, wall) =>
            this.handleHitWall(missile, wall),
        )

        this.physics.add.collider(this.player, this.missiles, (player, missile) =>
            this.handleHitPlayer(player, missile),
        )
    }

    update() {
        if (this.gameOver) {
            return
        }
        this.gameTime += 1
        this.checkMovement()
        this.checkShoot()
        this.checkBullet()
        this.checkEnemyMovement()
        console.log(this.gameTime)  
    }

    createHouses() {
        this.walls = this.physics.add.staticGroup()
        this.createHouseAt(127)
        this.createHouseAt(419)
        this.createHouseAt(711)
        this.createHouseAt(1003)
        this.walls.children.iterate(wall => {
            wall.new = true
        })
    }

    createHouseAt(x, y = 600) {
        this.walls.create(x, y, 'block')
        this.walls.create(x + 30, y, 'block')
        this.walls.create(x, y - 20, 'block')
        this.walls.create(x + 30, y - 20, 'block')
        this.walls.create(x + 30, y - 40, 'block')

        this.walls.create(x + 60, y - 40, 'block')
        this.walls.create(x + 90, y - 40, 'block')
        this.walls.create(x + 60, y - 60, 'block')
        this.walls.create(x + 90, y - 60, 'block')

        this.walls.create(x + 120, y, 'block')
        this.walls.create(x + 150, y, 'block')
        this.walls.create(x + 120, y - 20, 'block')
        this.walls.create(x + 150, y - 20, 'block')
        this.walls.create(x + 120, y - 40, 'block')
    }

    createPlayer() {
        this.player = this.physics.add.sprite(640, 650, 'player')
        this.player.setDepth(10)
    }

    createEnemies() {
        this.enemies = this.physics.add.group()
        Array(55)
            .fill()
                .forEach((_, i) => {
                    let enemy
                    if (i < 11) {
                    enemy = this.enemies.create(
                        this.calculeteEnemySpawnX(i),
                        this.calculeteEnemySpawnY(i),
                        'enemyTop1',
                    )
                    enemy.anims.play('moveEnemyTop')
                        return
                    }
                    if (i < 33) {
                        enemy = this.enemies.create(
                            this.calculeteEnemySpawnX(i),
                            this.calculeteEnemySpawnY(i),
                            'enemyMiddle1',
                        )
                        enemy.anims.play('moveEnemyMiddle')
                        return
   			}
                        enemy = this.enemies.create(
                            this.calculeteEnemySpawnX(i),
                            this.calculeteEnemySpawnY(i),
                            'enemyBottom1',
                        )
                        enemy.anims.play('moveEnemyBottom')
                })
    }

    calculeteEnemySpawnY(idx) {
        return 100 + 50 * Math.floor(idx / 11)
    }

    calculeteEnemySpawnX(idx) {
        return 80 * (idx + 1) - 80 * 11 * Math.floor(idx / 11)
    }

    createKeys() {
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, true)
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, true)
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    createBullet() {
        this.bullet = this.physics.add.sprite(0, 0, 'bullet')
        this.bullet.disableBody(true, true)
    }

    pauseGame() {
        this.physics.pause()
        this.gameOver = true
        this.enemies.children.iterate(enemy => enemy.anims.stop())
    }

    handleHitEnemy(enemy, bullet) {
        enemy.disableBody(true, true)
        bullet.disableBody(true, true)
        this.enemyCount -= 1
        this.score += 10
        this.scoreText.setText('Score: ' + this.score)
        if (this.enemyCount === 0) this.pauseGame()
    }

    handleHitWall(bullet, wall) {
        bullet.disableBody(true, true)
        if (wall.new) {
            wall.setTexture('blockHit')
            wall.new = false
        } else {
            wall.disableBody(true, true)
        }
    }

    handleHitPlayer(player, missile) {
        missile.disableBody(true, true)
        player.setVelocityY(0)
        this.lifeText.setText('Lives: ' + --this.lives)
        if (this.lives === 0) this.pauseGame()
    }

    checkMovement() {
        if (this.aKey.isDown && !this.dKey.isDown) {
            this.player.x > 30 ? this.player.setVelocityX(-300) : this.player.setVelocityX(0)
        }
        if (this.dKey.isDown && !this.aKey.isDown) {
            this.player.x < 1250 ? this.player.setVelocityX(300) : this.player.setVelocityX(0)
        }
        if (!this.aKey.isDown && !this.dKey.isDown) {
            this.player.setVelocityX(0)
        }
    }

    checkShoot() {
        if (this.spacebar.isDown && !this.bullet.active) {
        this.bullet.x = this.player.x
        this.bullet.y = this.player.y
        this.bullet.enableBody(true, this.bullet.x, this.bullet.y, true, true)
        this.bullet.setVelocityY(-500)
        }
    }

    checkBullet() {
        if (this.bullet.active && this.bullet.y < 0) {
            this.bullet.disableBody(true, true)
        }
    }

    checkEnemyMovement() {
        if (this.gameTime % 30 !== 0) return
        if (this.gameTime % (30 * 18) === 0) {
            this.enemyStep *= -1
            this.enemies.children.iterate(enemy => {
                enemy.y += 50
                enemy.y >= this.player.y ? this.pauseGame() : null
            })
        }

        this.enemies.children.iterate(enemy => {
            enemy.x += this.enemyStep
            if ((Math.random() * 75).toFixed() == 42) {
                this.launchMissile(enemy.x, enemy.y)
            }
        })
    }

    launchMissile(x, y) {
        let bullet
        this.missiles.children.iterate(missile => {
            if (!missile.active) {
                bullet = missile
            }
        })
        if (bullet) {
            bullet.x = x
            bullet.y = y
            bullet.enableBody(true, bullet.x, bullet.y, true, true)
            bullet.setVelocityY(500)
        } else {
            let missile = this.missiles.create(x, y, 'bullet')
            missile.setVelocityY(500)
        }
    }

    checkMissiles() {
        this.missiles.children.iterate(missile => {
            if (missile.active && missile.y > 720) {
                missile.disableBody(true, true)
            }
        })
    }
}

export default GameScene