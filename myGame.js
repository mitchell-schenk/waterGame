var myGamePiece, farmB, cityB, ecoB, nextB;
var myObstacles = [];
var myMoney, myWater, city, farm, eco, farmPM, cityPM, ecoPM, farmPH, cityPH, ecoPH;
var gameState = 1;
//popup vars
var popupContainer, farmP, farmM, cityP, cityM, ecoP, ecoM, done;
var farmWater, cityWater, ecoWater, totalWater;

var farmMoney = 1.5, cityMoney = 1, ecoMoney = 0.5;
var farmHappiness =  4, cityHappiness = 5, ecoHappiness = 7;
var farmIMG;
//average water per year = 30

function startGame() {
    farmIMG = document.getElementById("farm");

    farmB = new componentButton(150, 50, "grey", 100, 500, "Farm:", "Upgrade farm $1", "15px Arial");
    cityB = new componentButton(150, 50, "grey", 300, 500, "City:", "Upgrade city $1", "15px Arial");
    ecoB = new componentButton(150, 50, "grey", 500, 500, "Eco:", "Upgrade eco $1", "15px Arial");
    allocate = new componentButton(100, 50, "grey", 700, 400, "", "reallocate", "20px Arial");
    nextB = new componentButton(100, 50, "grey", 700, 500, "", "Next", "25px Arial");
    myMoney = new componentText("30px Arial", "black", 100, 50, "Money", 0);
    myWater = new componentText("30px Arial", "black", 400, 50, "Water", 0);
    farm = new componentText("30px Arial", "black", 100, 300, "Farm", 80);
    city = new componentText("30px Arial", "black", 350, 300, "City", 80);
    eco = new componentText("30px Arial", "black", 600, 300, "Eco", 80);
    farmPM = new componentText("15px Arial", "black", 100, 325, "Farm money(predicted)", 0);
    cityPM = new componentText("15px Arial", "black", 350, 325, "City money(predicted)", 0);
    ecoPM = new componentText("15px Arial", "black", 600, 325, "Eco money(predicted)", 0);
    farmPH = new componentText("15px Arial", "black", 100, 350, "Farm happiness(predicted)", 0);
    cityPH = new componentText("15px Arial", "black", 350, 350, "City happiness(predicted)", 0);
    ecoPH = new componentText("15px Arial", "black", 600, 350, "Eco happiness(predicted)", 0);

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
    totalWater = new componentText("20px Arial", "black", 500, 150, "Total water", 30);

    myGameArea.start();
}

function game(){
  updateGameArea();
  gameState = 1;//popup

}

function calcValues(farmW, cityW, ecoW){
    //alert(farmW+ " " + cityW + " " + "" + ecoW);
    if(farm.number - (11-farmW)*farmHappiness < 100)
      farm.number = farm.number - (11-farmW)*farmHappiness;
    else
      farm.number = 100;
    if(city.number - (11-cityW)*cityHappiness < 100)
      city.number = city.number - (12-cityW)*cityHappiness;
    else
      city.number = 100;
    if(eco.number - (11-ecoW)*ecoHappiness < 100)
      eco.number = eco.number - (11-ecoW)*ecoHappiness;
    else
      farm.number = 100;
    myMoney.number += (farmW*farmMoney)+(cityW*cityMoney)+(ecoW*ecoMoney);
    var num = Math.floor((Math.random()*20)+20);
    totalWater.number = num;
    updateGameArea();
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

};

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
    };
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
    };
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
    };
}

function updateGameArea() {
    myGameArea.clear();
    farmB.update();
    cityB.update();
    ecoB.update();
    nextB.update();
    myWater.update();
    myMoney.update();
    myGameArea.context.drawImage(farmIMG, 100, 100);
    farm.update();
    city.update();
    eco.update();
    allocate.update();
    farmPM.update();
    farmPH.update();
    cityPM.update();
    cityPH.update();
    ecoPM.update();
    ecoPH.update();


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
    clicked = true;
  }
  else if(cityB.clicked(x,y)){
    clicked = true;
  }
  else if(ecoB.clicked(x,y)){
    clicked = true;
  }
  else if(allocate.clicked(x,y)){
    gameState = 1;
    clicked = true;
  }
  else if(nextB.clicked(x,y)){
    //startNext turn
    calcValues(farmWater.number, cityWater.number, ecoWater.number);
    farmWater.number = 0;
    cityWater.number = 0;
    ecoWater.number = 0;
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
    if(totalWater.number !== 0){
      alert("you must allocate all of the water");
    }
    else{
      gameState = 2;
      //setValues for calculation
      if(farm.number - (11-farmWater.number)*farmHappiness < 100){
        farmPH.number = farm.number - (11-farmWater.number)*farmHappiness;
      }
      else
        farmPH.number = 100;
      farmPM.number = farmWater.number * farmMoney;
      if(city.number - (11-cityWater.number)*cityHappiness < 100)
        cityPH.number = city.number - (11-cityWater.number)*cityHappiness;
      else
        cityPH.number = 100;
      cityPM.number = cityWater.number * cityMoney;
      if(eco.number - (11-ecoWater.number)*ecoHappiness < 100)
        ecoPH.number = eco.number - (11-ecoWater.number)*ecoHappiness;
      else
        ecoPH.number = 100;
      ecoPM.number = ecoWater.number * ecoMoney;
      updateGameArea();
    }
  }
  return clicked;
}
