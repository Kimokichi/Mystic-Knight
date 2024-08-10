import Phaser from 'phaser'

import MysticKnightScene from './scenes/MysticKnightScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 720,
	height: 405,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug : true
		},
	},
	scene: [MysticKnightScene],
}

export default new Phaser.Game(config)
