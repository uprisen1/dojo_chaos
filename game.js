import { Player } from "./Player.js";
import { UI } from "./UI.js";

export function createGame(){

new Phaser.Game({

  type: Phaser.AUTO,

  width: 1000,
  height: 600,

  backgroundColor:"#87CEEB",

  physics:{
    default:"arcade",
    arcade:{
      gravity:{ y:1000 }
    }
  },

  scene:{
    create,
    update
  }
});

let p1;
let p2;

let ui;

let keys;
let cursors;

let punch2;
let kick1;
let kick2;

let restartKey;

let gameOver = false;

function create(){

  const ground =
    this.add.rectangle(
      500,
      570,
      1000,
      60,
      0x8B4513
    );

  this.physics.add.existing(
    ground,
    true
  );

  p1 =
    new Player(
      this,
      250,
      300,
      0x000000
    );

  p2 =
    new Player(
      this,
      750,
      300,
      0xff0000
    );

  ui = new UI(this);

  this.physics.add.collider(
    p1.body,
    ground
  );

  this.physics.add.collider(
    p2.body,
    ground
  );

  keys =
    this.input.keyboard.addKeys({
      left:"A",
      right:"D",
      jump:"W",
      punch:"F"
    });

  cursors =
    this.input.keyboard.createCursorKeys();

  punch2 =
    this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.L
    );

  kick1 =
    this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.G
    );

  kick2 =
    this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.K
    );

  restartKey =
    this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );

  ui.update(p1,p2);
}

function update(){

  if(
    gameOver &&
    Phaser.Input.Keyboard.JustDown(restartKey)
  ){
    location.reload();
  }

  if(gameOver){
    return;
  }

  p1.update();
  p2.update();

  movePlayers();

  fight();

  ui.update(p1,p2);

  if(p1.health <= 0){
    finish("RED WINS");
  }

  if(p2.health <= 0){
    finish("BLACK WINS");
  }
}

function movePlayers(){

  if(keys.left.isDown){
    p1.body.body.setVelocityX(-250);
    p1.facing=-1;
  }
  else if(keys.right.isDown){
    p1.body.body.setVelocityX(250);
    p1.facing=1;
  }
  else{
    p1.body.body.setVelocityX(0);
  }

  if(
    keys.jump.isDown &&
    p1.body.body.touching.down
  ){
    p1.body.body.setVelocityY(-500);
  }

  if(cursors.left.isDown){
    p2.body.body.setVelocityX(-250);
    p2.facing=-1;
  }
  else if(cursors.right.isDown){
    p2.body.body.setVelocityX(250);
    p2.facing=1;
  }
  else{
    p2.body.body.setVelocityX(0);
  }

  if(
    cursors.up.isDown &&
    p2.body.body.touching.down
  ){
    p2.body.body.setVelocityY(-500);
  }
}

function fight(){

  let distance =
    Math.abs(
      p1.body.x -
      p2.body.x
    );

  if(
    Phaser.Input.Keyboard.JustDown(
      keys.punch
    ) &&
    distance < 100
  ){

    p2.damage(10);

    p2.body.body.setVelocityX(
      400 * p1.facing
    );
  }

  if(
    Phaser.Input.Keyboard.JustDown(
      punch2
    ) &&
    distance < 100
  ){

    p1.damage(10);

    p1.body.body.setVelocityX(
      400 * p2.facing
    );
  }

  if(
    Phaser.Input.Keyboard.JustDown(
      kick1
    ) &&
    distance < 120
  ){

    p2.damage(20);

    p2.body.body.setVelocityX(
      700 * p1.facing
    );

    p2.body.body.setVelocityY(-250);
  }

  if(
    Phaser.Input.Keyboard.JustDown(
      kick2
    ) &&
    distance < 120
  ){

    p1.damage(20);

    p1.body.body.setVelocityX(
      700 * p2.facing
    );

    p1.body.body.setVelocityY(-250);
  }
}

function finish(text){

  gameOver = true;

  ui.showWinner(text);
}

}
