export class Player {

  constructor(scene, x, y, color){

    this.scene = scene;

    this.health = 100;
    this.facing = 1;

    this.body = scene.add.rectangle(
      x,
      y,
      20,
      50,
      color
    );

    scene.physics.add.existing(this.body);

    this.body.body.setCollideWorldBounds(true);

    this.head = scene.add.circle(
      x,
      y - 45,
      15,
      0xffd6a5
    );

    this.bar = scene.add.rectangle(
      x,
      y - 70,
      80,
      8,
      0x00ff00
    );
  }

  update(){

    this.head.x = this.body.x;
    this.head.y = this.body.y - 45;

    this.bar.x = this.body.x;
    this.bar.y = this.body.y - 70;

    this.bar.width =
      (this.health / 100) * 80;
  }

  damage(amount){

    this.health -= amount;

    if(this.health < 0){
      this.health = 0;
    }
  }
}
