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
	createPlayer();
	createKeys(this.input.keyboard);
	createEnemies();
}

function update() {
	checkMovement(); 
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
			return;
		}
		if (i < 33) {
			enemy = enemies.create(calculateEnemySpawnX(i), calculateEnemySpawnY(i), 'enemyMiddle1');
			return;
		}
		enemy = enemies.create(calculateEnemySpawnX(i), calculateEnemySpawnY(i), 'enemyBottom1');
	});
}

function calculateEnemySpawnX(idx) {
	return 80 * (idx +1) - 80 * 11 * Math.floor(idx / 11);
}

function calculateEnemySpawnY(idx) {
	return 100 + 50 * Math.floor(idx / 11);
}