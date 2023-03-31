import Phaser from 'phaser';

export class Bullet {
    bulletRect: Phaser.GameObjects.Rectangle;
    distanceTraveled: number = 0;
  
    constructor(add: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
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