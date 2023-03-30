import Phaser from 'phaser';
import config from '../config';

export default class TankSurvivor extends Phaser.Scene {

  tank: any;
  tank_move = 0; // 0 = stop, 1 = move forward, 2 = move backward
  tank_anim: any;

  buttons: any;

  sceneX: number = parseFloat(config.scale.width.toString());
  sceneY: number = parseFloat(config.scale.height.toString());

  speed = 200;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.path = 'img/';
    this.load.aseprite('red_tank', 'red_tank.png', 'red_tank.json');
  }

  create() {
    this.tank_anim = this.anims.createFromAseprite('red_tank');
    this.tank = this.physics.add.sprite(this.sceneX / 2, this.sceneY / 2, 'red_tank');
    this.tank.setDamping(true);
    this.tank.setMaxVelocity(this.speed);
    console.log(this.tank_anim)

    this.buttons = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (this.buttons.up.isDown) {
      this.physics.velocityFromRotation(this.tank.rotation - (Math.PI / 2), this.speed, this.tank.body.acceleration);
      if (this.tank_move !== 1) {
        this.tank.play({
          key: 'red_tank',
          repeat: -1 
        });
        this.tank_move = 1
      }
    } else if (this.buttons.down.isDown) {
      this.physics.velocityFromRotation(this.tank.rotation + (Math.PI / 2), this.speed, this.tank.body.acceleration);
      if (this.tank_move !== 2) {
        this.tank.playReverse({
          key: 'red_tank',
          repeat: -1
        });
        this.tank_move = 2;
      }
    } else {
      if (this.tank_move !== 0) {
        this.tank.stop();
        this.tank_move = 0;
      }
      this.tank.setAcceleration(0);
      this.tank.setVelocity(0);
    }

    if (this.buttons.left.isDown) {
      this.tank.setAngularVelocity(-300);
    } else if (this.buttons.right.isDown) {
      this.tank.setAngularVelocity(300);
    } else {
      this.tank.setAngularVelocity(0);
    }

    this.physics.world.wrap(this.tank, 32);
  }
}
