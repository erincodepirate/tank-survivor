import Phaser from 'phaser';
import config from '../config';

class Bullet {
  bulletRect: Phaser.GameObjects.Rectangle;
  distanceTraveled: number = 0;

  constructor(add: any, x: number, y: number) {
    this.bulletRect = add.rectangle(x + 64, y + 64, 5, 15, 0xffbb00, 1);
  }

  destroy() {
    this.bulletRect.destroy();
  }

  public get x(): number {
    return this.bulletRect.x;
  }

  public set x(newX: number) {
    this.bulletRect.x = newX;
  }

  public get y(): number {
    return this.bulletRect.y;
  }

  public set y(newY: number) {
    this.bulletRect.y = newY;
  }

  public get rotation(): number {
    return this.bulletRect.rotation;
  }

}

export default class TankSurvivor extends Phaser.Scene {


  tank: any;
  tank_move = 0; // 0 = stop, 1 = move forward, 2 = move backward
  tank_anim: any;

  buttons: any;

  sceneX: number = parseFloat(config.scale.width.toString());
  sceneY: number = parseFloat(config.scale.height.toString());

  bullets: Bullet[] = [];
  bulletSpeed: number = 5;
  bulletTime: number = 0;
  bulletTravelDist: number = 256;

  speed = 200;

  constructor() {
    super('GameScene');
  }

  preload() {
    this.load.path = 'img/';
    this.load.image('background', 'brickfloor.png');
    this.load.aseprite('red_tank', 'red_tank.png', 'red_tank.json');
  }

  create() {

    this.add.tileSprite(0, 0, this.sceneX * 4, this.sceneY * 4, 'background');
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

    if (this.buttons.space.isDown && this.bulletTime <= 0) {
      this.fireMainGun();
      this.bulletTime = 10;
    }
    else {
      this.bulletTime -= 1;
    }

    this.updateBullets();

    this.physics.world.wrap(this.tank, 32);
  }

  fireMainGun() {
    var bullet = new Bullet(this.add, this.tank.body.x, this.tank.body.y);
    bullet.bulletRect.rotation = this.tank.rotation;
    this.updatePosition(62, bullet);
    this.bullets.push(bullet);
  }

  updateBullets() {
    for (let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];
      this.updatePosition(this.bulletSpeed, bullet);
      bullet.distanceTraveled += this.bulletSpeed;

      if (bullet.distanceTraveled >= this.bulletTravelDist || bullet.x < 0 || bullet.y < 0) {
        this.bullets.splice(i, 1);
        bullet.destroy();
      }
      else {

      }
    }
  }

  updatePosition(speed: number, object: Bullet) {
    object.x += speed * Math.sin(object.rotation);
    object.y -= speed * Math.cos(object.rotation);
  }
}
