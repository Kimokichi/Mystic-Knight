import Phaser from 'phaser'

import MysticKnightScene from './scenes/MysticKnightScene'
import Stage2Scene from './scenes/Stage2Scene'
import StageBossScene from './scenes/StageBossScene'
import StartScene from './scenes/StartScene'
import WinScene from './scenes/WinScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 720,
	height: 405,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			// debug : true
		},
	},
	scene: [StartScene,MysticKnightScene,Stage2Scene,StageBossScene,WinScene],
	// scene: [WinScene,MysticKnightScene,StageBossScene],
}

export default new Phaser.Game(config)
