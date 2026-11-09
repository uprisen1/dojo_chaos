export class UI {

  constructor(scene){

    this.healthText =
      scene.add.text(
        20,
        20,
        "",
        {
          fontSize:"24px",
          color:"#000"
        }
      );

    this.winnerText =
      scene.add.text(
        500,
        140,
        "",
        {
          fontSize:"48px",
          color:"#fff",
          backgroundColor:"#000"
        }
      );

    this.winnerText.setOrigin(0.5);
  }

  update(p1,p2){

    this.healthText.setText(
      `Black: ${p1.health}  Red: ${p2.health}`
    );
  }

  showWinner(text){

    this.winnerText.setText(
      text + "\nPRESS R"
    );
  }
}
