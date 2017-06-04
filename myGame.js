var myGamePiece, farmB, cityB, ecoB, nextB;
var myObstacles = [];
var myMoney, myWater, eventText, city, farm, eco;
var gameState = 1;
//popup vars
var popupContainer, farmP, farmM, cityP, cityM, ecoP, ecoM, done;
var farmWater, cityWater, ecoWater, totalWater;

var farmMoney, cityMoney, ecoMoney;
var farmHappiness, cityHappiness, ecoHappiness;


function startGame() {

    farmB = new componentButton(150, 50, "grey", 100, 500, "Farm:", "Upgrade farm $1", "15px Arial");
    cityB = new componentButton(150, 50, "grey", 300, 500, "City:", "Upgrade city $1", "15px Arial");
    ecoB = new componentButton(150, 50, "grey", 500, 500, "Eco:", "Upgrade eco $1", "15px Arial");
    nextB = new componentButton(100, 50, "grey", 700, 500, "", "Next", "25px Arial");
    myMoney = new componentText("30px Arial", "black", 100, 50, "Money", 0);
    myWater = new componentText("30px Arial", "black", 400, 50, "Water", 0);
    farm = new componentText("30px Arial", "black", 100, 300, "Farm", 100);
    city = new componentText("30px Arial", "black", 300, 300, "City", 100);
    eco = new componentText("30px Arial", "black", 500, 300, "Eco", 100);

    popupContainer = new componentButton(600, 390, "grey", 200, 100, "", "", "15px Arial");
    farmM = new componentButton(50, 50, "red", 225, 350, "", "-", "30px Arial");
    farmP = new componentButton(50, 50, "green", 300, 350, "", "+", "30px Arial");
    cityM = new componentButton(50, 50, "red", 425, 350, "", "-", "30px Arial");
    cityP = new componentButton(50, 50, "green", 500, 350, "", "+", "30px Arial");
    ecoM = new componentButton(50, 50, "red", 625, 350, "", "-", "30px Arial");
    ecoP = new componentButton(50, 50, "green", 700, 350, "", "+", "30px Arial");
    done = new componentButton(100, 50, "blue", 650, 425, "", "Done", "30px Arial");

    farmWater = new componentText("20px Arial", "black", 275, 325, "Farm", 0);
    cityWater = new componentText("20px Arial", "black", 475, 325, "City", 0);
    ecoWater = new componentText("20px Arial", "black", 675, 325, "Eco", 0);
    totalWater = new componentText("20px Arial", "black", 400, 250, "Total water", 10);

    eventText = new componentText("30px Arial", "black", 400, 400, "Event", 0);
    myGameArea.start();
}

function game(){
  updateGameArea();
  gameState = 1;//popup

}

function calcValues(farmWater, cityWater, ecoWater){
    alert(farmWater+ " " + cityWater + " " + "" + ecoWater);

}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.canvas.addEventListener('click', function(event) {
            var x = event.x - 200, y = event.y - 25;
            if(gameState == 1){
              if(checkPopupButtons(x,y))
                updateGameArea();
            }
            else if(gameState == 2){//not popup
              if(checkButtons(x, y))
                updateGameArea();
            }

        }, false);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        game();
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function componentButton(width, height, color, x, y, text1, text2, fontStyle) {
    this.text1 = text1;
    this.text2 = text2;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = fontStyle;
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.fillText(this.text1, this.x+ this.width/2, this.y+this.height/3);
        ctx.fillText(this.text2, this.x+ this.width/2, this.y+(2*(this.height/3)));
    }
    //reuse for clicked?
    this.clicked = function(x, y) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var clicked = false;
        if ((mybottom > y) && (mytop < y) && (myleft < x) && (myright > x)) {
            clicked = true;
        }
        return clicked;
    }
}

function componentText(fontStyle, color, x, y, title, starting) {
    this.text = title;
    this.number = starting;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.font = fontStyle;
        ctx.fillStyle = "black";
        //ctx.fillText(this.text + ": " + this.number, this.x, this.y);
        ctx.fillText(this.text+ ": " + this.number, this.x, this.y);
    }
}

function updateGameArea() {
    myGameArea.clear();
    farmB.update();
    cityB.update();
    ecoB.update();
    nextB.update();

    myWater.update();
    myMoney.update();

    farm.update();
    city.update();
    eco.update();

    eventText.update()

    if(gameState == 1){
      popupContainer.update();
      farmM.update();
      farmP.update();
      cityM.update();
      cityP.update();
      ecoM.update();
      ecoP.update();
      done.update();
      farmWater.update();
      cityWater.update();
      ecoWater.update();
      totalWater.update();
    }
}
function checkButtons(x, y){
  var clicked = false;
  if(farmB.clicked(x,y)){
    eventText.text = "Farm";
    farm.number--;
    clicked = true;
  }
  else if(cityB.clicked(x,y)){
    eventText.text = "City";
    city.number--;
    clicked = true;
  }
  else if(ecoB.clicked(x,y)){
    eventText.text = "Eco";
    eco.number--;
    clicked = true;
  }
  else if(nextB.clicked(x,y)){
    eventText.text = "Next";
    //startNext turn
    calcValues(farmWater.number, cityWater.number, ecoWater.number);
    farmWater.number = 0;
    cityWater.number = 0;
    ecoWater.number = 0;
    totalWater.number = 12;
    //probably move this stuff
    gameState = 1;
    clicked = true;
  }
  return clicked;
}


function checkPopupButtons(x, y){
  var clicked = false;
  if(farmM.clicked(x,y)){
    if(farmWater.number > 0){
      farmWater.number--;
      totalWater.number++;
    }
    clicked = true;
  }
  else if(farmP.clicked(x,y)){
    if(totalWater.number > 0){
      farmWater.number++;
      totalWater.number--;
    }
    clicked = true;
  }
  else if(cityM.clicked(x,y)){
    if(cityWater.number > 0){
      cityWater.number--;
      totalWater.number++;
    }
    clicked = true;
  }
  else if(cityP.clicked(x,y)){
    if(totalWater.number > 0){
      cityWater.number++;
      totalWater.number--;
    }
    clicked = true;
  }
  else if(ecoM.clicked(x,y)){
    if(ecoWater.number > 0){
      ecoWater.number--;
      totalWater.number++;
    }
    clicked = true;
  }
  else if(ecoP.clicked(x,y)){
    if(totalWater.number > 0){
      ecoWater.number++;
      totalWater.number--;
    }
    clicked = true;
  }
  else if(done.clicked(x,y)){
    if(totalWater.number != 0){
      alert("you must allocate all of the water");
    }
    else{
      gameState = 2;
      //setValues for calculation
      updateGameArea();
    }
  }
  return clicked;
}
