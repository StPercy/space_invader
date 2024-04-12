const config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			debug: true
		},
	},
	scene: { preload: preload, create: create, update: update},
}

const game = new Phaser.Game(config);

let physics;
let player;
let aKey;
let dKey;
let spacebar;
let enemies;
let enemyStep = 20;	// 20px
let time = 0; // Zeit in ms
let gameOver = false;
let bullet;
let enemyCount	= 55;
let scoreText;
let score = 0;
let missiles;
let lifeText;
let lives = 3;
let walls;

function preload() {
	this.load.image('background', 'assets/space_invader/images/space.jpeg');
	this.load.image('player', 'assets/space_invader/images/Ship.png');
	this.load.image('bullet', 'assets/space_invader/images/Bullet.png');
	this.load.image('enemyTop1', 'assets/space_invader/images/InvaderA1.png');
	this.load.image('enemyTop2', 'assets/space_invader/images/InvaderA2.png');
	this.load.image('enemyMiddle1', 'assets/space_invader/images/InvaderB1.png');
	this.load.image('enemyMiddle2', 'assets/space_invader/images/InvaderB2.png');
	this.load.image('enemyBottom1', 'assets/space_invader/images/InvaderC1.png');
	this.load.image('enemyBottom2', 'assets/space_invader/images/InvaderC2.png');
	this.load.image('block', 'assets/space_invader/images/OkBlock.png');
	this.load.image('blockHit', 'assets/space_invader/images/WeakBlock.png');	
}

function create() {
	setPhysics(this.physics);
	this.add.image(0, 0, 'background').setOrigin(0).setScrollFactor(0);

	scoreText = this.add.text(16, 16, `Score: ${score}`, { fontSize: '32px', fill: 'white', fontStyle: 'bold' }).setScrollFactor(0);
	lifeText = this.add.text(1100, 16, `Lives: ${lives}`, { fontSize: '32px', fill: 'red', fontStyle: 'bold' }).setScrollFactor(0);

	this.anims.create({
		key: 'moveEnemyTop',
		frames: [
			{ key: 'enemyTop2' },
			{ key: 'enemyTop1' }
		],
		frameRate: 2,
		repeat: -1
	});
	this.anims.create({
		key: 'moveEnemyMiddle',
		frames: [
			{ key: 'enemyMiddle2' },
			{ key: 'enemyMiddle1' }
		],
		frameRate: 2,
		repeat: -1
	});
	this.anims.create({
		key: 'moveEnemyBottom',
		frames: [
			{ key: 'enemyBottom2' },
			{ key: 'enemyBottom1' }
		],
		frameRate: 2,
		repeat: -1
	});

	createPlayer();
	createKeys(this.input.keyboard);
	createEnemies();
	createBullet();
	createHouses();
	missiles = this.physics.add.group();

	this.physics.add.collider(player, enemies, () => pauseGame());
	this.physics.add.collider(bullet, enemies, (bullet, enemy) => handleHitEnemy(bullet, enemy));
	this.physics.add.collider(player, missiles, (player, missile) => handleHitPlayer(player, missile));
	this.physics.add.collider(bullet, walls, (bullet, wall) => handleHitWall(bullet, wall));	
	this.physics.add.collider(missiles, walls, (missile, wall) => handleHitWall(missile, wall));	
}

function update() {
	if (gameOver) return;
	checkMovement(); 
	time++;
	checkEnemyMovement();
	checkShoot();
	checkBullet();
	checkMissiles();
}
// physics wird ausgelagert um sich this.physics zu sparen, siehe z.B createPlayer()
function setPhysics(physic) {
	physics = physic;
}

function createPlayer() {
	player = physics.add.sprite(640, 650, 'player');
	player.setDepth(10);
}

function createKeys(keyboard) {
	aKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A, true, true);
	dKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D, true, true);
	spacebar = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE, true, true);
}
// checkMovement wird erstellt um zu überprüfen wo der Spieler sich momentan befindet und welche Taste gedrückt wurde
function checkMovement() {
	if (aKey.isDown && !dKey.isDown) {
		player.x > 30 ? player.setVelocityX(-300) : player.setVelocityX(0);
	}
	if (dKey.isDown && !aKey.isDown) {
		player.x < 1250 ? player.setVelocityX(300) : player.setVelocityX(0);
	}
	if (!aKey.isDown && !dKey.isDown) {
		player.setVelocityX(0);
	}
}

function createEnemies() {
	enemies = physics.add.group();
	Array(55).fill().forEach((_, i) => {
		let enemy
		if (i < 11) {
			enemy = enemies.create(calculateEnemySpawnX(i), calculateEnemySpawnY(i), 'enemyTop1');
			enemy.anims.play('moveEnemyTop', true);
			return;
		}
		if (i < 33) {
			enemy = enemies.create(calculateEnemySpawnX(i), calculateEnemySpawnY(i), 'enemyMiddle1');
			enemy.anims.play('moveEnemyMiddle', true);
			return;
		}
		enemy = enemies.create(calculateEnemySpawnX(i), calculateEnemySpawnY(i), 'enemyBottom1');
		enemy.anims.play('moveEnemyBottom', true);
	});
}

function calculateEnemySpawnX(idx) {
	return 80 * (idx +1) - 80 * 11 * Math.floor(idx / 11);
}

function calculateEnemySpawnY(idx) {
	return 100 + 50 * Math.floor(idx / 11);
}

function checkEnemyMovement() {
	if (time % 30 !== 0) return; 
	if (time % (30 * 18) === 0) {
		enemyStep *= -1; // changes direction
		enemies.children.iterate((enemy) => {
			enemy.y += 50; // moves enemies down
			if (enemy.y === player.y) pauseGame();
		});
	
	}

	enemies.children.iterate((enemy) => {
		enemy.x += enemyStep; // moves enemies left or right

		if (Math.floor(Math.random() * 50) === 42) {
			launchmissiles(enemy.x, enemy.y);
		}
	});
	
}	

function pauseGame() {
	physics.pause();
	gameOver = true;
	enemies.children.iterate(enemy => enemy.anims.stop());
	//console.log('Game Over');
}

function createBullet() {
	bullet = physics.add.sprite(0,0, 'bullet');
	bullet.disableBody(true, true);
	//bullet.setVelocityY(-300);
}

function checkShoot() {
	if (spacebar.isDown && !bullet.active) {
			bullet.x = player.x;
			bullet.y = player.y;
			bullet.enableBody(true, bullet.x, bullet.y, true, true);
			bullet.setVelocityY(-1000);
		}
}

function checkBullet() {
	if (bullet.active && bullet.y < 0) {
		bullet.disableBody(true, true);
	}	
}

function handleHitEnemy(bullet, enemy) {
	bullet.disableBody(true, true);
	enemy.disableBody(true, true);
	enemyCount--;
	score += 10;
	scoreText.setText(`Score: ${score}`);	
	//console.log(enemyCount);
	if (enemyCount === 0) pauseGame();

}

function launchmissiles(x, y) {
	let bullet
	missiles.children.iterate((missiles) => {
		if (!missiles.active) {
			bullet = missiles;
		}
	});
	if (bullet) {
		bullet.x = x;
		bullet.y = y;
		bullet.enableBody(true, bullet.x, bullet.y, true, true);
		bullet.setVelocityY(100);
	} else {
		bullet = missiles.create(x, y, 'bullet');
		bullet.setVelocityY(100);
	}
}

function checkMissiles() {
	missiles.children.iterate((missile) => {
		if (missile.active && missile.y > 720) {
			missile.disableBody(true, true);
		}
	});
	//console.log(missiles);
}

function handleHitPlayer(player, missile) {
	missile.disableBody(true, true);
	player.setVelocityY(0);
	lifeText.setText(`Lives: ${--lives}`);
	if (lives === 0) pauseGame();
}

function createHouses() {
	walls = physics.add.staticGroup();
	createHouseAt(127);
	createHouseAt(419);
	createHouseAt(711);
	createHouseAt(1003);
	walls.children.iterate(wall => {
		wall.new = true;
	});
}

function createHouseAt(x, y = 600 ) {
	walls.create(x, y, 'block');
	walls.create(x + 30, y, 'block');
	walls.create(x, y - 20, 'block');
	walls.create(x + 30, y-20, 'block');
	walls.create(x + 30, y - 40, 'block');

	walls.create(x + 60, y - 40, 'block');
	walls.create(x + 90, y - 40, 'block');
	walls.create(x + 60, y - 60, 'block');
	walls.create(x + 90, y - 60, 'block');

	walls.create(x + 120, y, 'block');
	walls.create(x + 150, y, 'block');
	walls.create(x + 120, y - 20, 'block');
	walls.create(x + 150, y - 20, 'block');
	walls.create(x + 120, y - 40, 'block');
}

function handleHitWall(bullet, wall) {
	bullet.disableBody(true, true);
	if (wall.new) {
		wall.setTexture('blockHit');
		wall.new = false;
	} else {
		wall.disableBody(true, true);
	}
}