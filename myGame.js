var myGamePiece, farmB, cityB, ecoB, nextB;
var myObstacles = [];
var myMoney, round, city, farm, eco, farmPM, cityPM, ecoPM, farmPH, cityPH, ecoPH;
var gameState =  1;
//popup vars
var popupContainer, farmP, farmM, cityP, cityM, ecoP, ecoM, done;
var farmWater, cityWater, ecoWater, totalWater;

var farmMoney = 1.5, cityMoney = 1, ecoMoney = 0.5;
var farmHappiness =  4, cityHappiness = 5, ecoHappiness = 7, farmHappinessMod = 0, cityHappinessMod = 0, ecoHappinessMod = 0;
var image;
var farmUpgradeNum = 0, cityUpgradeNum = 0, ecoUpgradeNum = 0;
var first = true;
var farmUpgrades = ["Add Canal", "Add Well", "Purchase More Water Rights", "Employ a Lobbyist", "Center Pivot Irrigation", "Drip Irrigation", "NO MORE UPGRADES"];
var cityUpgrades = ["Create a Water Bureau", "Upgrade Infrastructure", "Increase Rates", "Encourage Efficient Homes", "Incentivize Conservation", "Educate Public", "NO MORE UPGRADES"];
var ecoUpgrades = ["Install Fish Ladder", "Regulate Pollution", "Open Hatchery", "Treat Wastewater", "Dam Spill for Fish", "Awareness Campaign", "NO MORE UPGRADES"];

var severeDrought = false, drought = false;
var averageWater = 23;
//average water per year = 30

function startGame() {
    image = document.getElementById("board");

    farmB = new componentButton(240, 60, "grey", 70, 420, "Upgrade Farm:", farmUpgrades[0] + ": $10", "15px Arial");
    cityB = new componentButton(240, 60, "grey", 380, 420, "Upgrade City:", cityUpgrades[0] + ": $10", "15px Arial");
    ecoB = new componentButton(240, 60, "grey", 690, 420, "Upgrade Environment:", ecoUpgrades[0] + ": $10", "15px Arial");
    allocate = new componentButton(130, 50, "grey", 690, 520, "", "Reallocate", "25px Arial");
    nextB = new componentButton(100, 50, "grey", 830, 520, "", "Next", "25px Arial");
    myMoney = new componentText("30px Arial", "black", 190, 555, "Money", 0);
    round = new componentText("30px Arial", "black", 500, 555, "Round", 0);
    farm = new componentText("25px Arial", "black", 130, 220, "Farm Happiness", 80);
    city = new componentText("25px Arial", "black", 600, 300, "City Happiness", 80);
    eco = new componentText("25px Arial", "black", 800, 90, "Environment Happiness", 80);
    farmPM = new componentText("15px Arial", "black", 130, 240, "Farm money(predicted)", 0);
    cityPM = new componentText("15px Arial", "black", 600, 320, "City money(predicted)", 0);
    ecoPM = new componentText("15px Arial", "black", 800, 110, "Eco money(predicted)", 0);
    farmPH = new componentText("15px Arial", "black", 130, 260, "Farm happiness(predicted)", 0);
    cityPH = new componentText("15px Arial", "black", 600, 340, "City happiness(predicted)", 0);
    ecoPH = new componentText("15px Arial", "black", 800, 130, "Eco happiness(predicted)", 0);

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
    totalWater = new componentText("20px Arial", "black", 500, 150, "Water this Round", 30);

    myGameArea.start();
}

function game(){
  updateGameArea();
  gameState = 1;//popup

}



function calcValues(farmW, cityW, ecoW){
    farm.number = farmPH.number;
    city.number = cityPH.number;
    eco.number = ecoPH.number;
    myMoney.number += (farmW*farmMoney)+(cityW*cityMoney)+(ecoW*ecoMoney);
    round.number += 1;
    var num = Math.floor((Math.random()*14)+averageWater);
    var num1 = Math.floor(Math.random()*20);
    var num2 = Math.floor(Math.random()*10);
    if(round.number > 3){
      if(round.number%10 === 0){
        alert("The climate is changing! Average yearly water has dropped 2!");
        averageWater -= 2;
      }else if(num1 === 1 && (!severeDrought)){
        alert("Severe drought! Your water is 15 less than normal");
        num -= 15;
        severeDrought = true;
      }else if(num2 === 1 && (!drought)){
        alert("Drought! Your water is 10 less than normal");
        num -= 10;
        drought = true;
      }
    }
    totalWater.number = num;
    //updateGameArea();
}

function upgradeFarm(){
  if(farmUpgradeNum < 6){
    var cost = (Math.pow(2, farmUpgradeNum)) * 10;
    if(myMoney.number >= cost){
      myMoney.number = myMoney.number - cost;
      farmUpgradeNum++;
      if((farmUpgradeNum-1)%2 === 0){
        farmMoney += (0.5*((3*farmUpgradeNum)/4));
      }
      else{
        farmHappinessMod += (0.5)*(farmUpgradeNum/2);
      }
      if(farmUpgradeNum == 6){
        farmB.text2 = farmUpgrades[6];
        if((cityUpgradeNum == 6) && (ecoUpgradeNum == 6)){
          alert("That's all the upgrades, keep playing if you want.");
        }
      }else{
        cost = (Math.pow(2, farmUpgradeNum)) * 10;
        farmB.text2 = farmUpgrades[farmUpgradeNum] + ": $" + cost;
        setFarmPredicted();
      }
    }
  }
}

function upgradeCity(){
  if(cityUpgradeNum < 6){
    var cost = (Math.pow(2, cityUpgradeNum)) * 10;
    if(myMoney.number >= cost){
      myMoney.number = myMoney.number - cost;
      cityUpgradeNum++;

      if((cityUpgradeNum-1)%2 === 0){
        cityMoney += (0.5*(cityUpgradeNum/2));
      }
      else{
        cityHappinessMod += (0.5)*(cityUpgradeNum/2);
      }
      if(cityUpgradeNum == 6){
        cityB.text2 = cityUpgrades[6];
        if((ecoUpgradeNum == 6) && (farmUpgradeNum == 6)){
          alert("That's all the upgrades, keep playing if you want.");
        }
      }else{
        cost = (Math.pow(2, cityUpgradeNum)) * 10;
        cityB.text2 = cityUpgrades[cityUpgradeNum] + ": $" + cost;
        setCityPredicted();
      }
    }
  }
}

function upgradeEco(){
  if(ecoUpgradeNum < 6){
    var cost = (Math.pow(2, ecoUpgradeNum)) * 10;
    if(myMoney.number >= cost){
      myMoney.number = myMoney.number - cost;
      ecoUpgradeNum++;

      if((ecoUpgradeNum-1)%2 === 0){
        ecoMoney += 0.5;
      }
      else{
        ecoHappinessMod += (0.5)*(ecoUpgradeNum/2);
      }
      if(ecoUpgradeNum == 6){
        ecoB.text2 = ecoUpgrades[6];
        if((cityUpgradeNum == 6) && (farmUpgradeNum == 6)){
          alert("That's all the upgrades, keep playing if you want.");
        }
      }else{
        cost = (Math.pow(2, ecoUpgradeNum)) * 10;
        ecoB.text2 = ecoUpgrades[ecoUpgradeNum] + ": $" + cost;
        setEcoPredicted();
      }
    }
  }
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
    myGameArea.context.fillStyle = "black";
    myGameArea.context.fillRect(0, 400, 1000, 3);
    myGameArea.context.drawImage(image, 0, 0);
    myMoney.number = Math.floor(myMoney.number);
    farmB.update();
    cityB.update();
    ecoB.update();
    nextB.update();
    round.update();
    myMoney.update();
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
      myGameArea.context.rect(200,100,600,390);
      myGameArea.context.lineWidth="6";
      myGameArea.context.strokeStyle="black";
      myGameArea.context.stroke();
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

      myGameArea.context.fillText("You now have $" + myMoney.number, 500, 190);
      myGameArea.context.fillText("Farm Happiness: " + farm.number, 500, 220);
      myGameArea.context.fillText("City Happiness: " + city.number, 500, 250);
      myGameArea.context.fillText("Environment Happiness: " + eco.number, 500, 280);
      if(first === true){
        myGameArea.context.fillStyle="black";
        myGameArea.context.fillRect(197, 0, 606, 100);
        myGameArea.context.fillStyle="grey";
        myGameArea.context.fillRect(201, 0, 598, 98);
        myGameArea.context.fillStyle="black";
        myGameArea.context.fillText("Allocate water each turn", 500, 40);
        myGameArea.context.fillText("Don't let anyone's happiness get to 0", 500, 70);
        first = false;
      }
    }
    else if(gameState === 3){
      myGameArea.clear();
      myGameArea.context.font = "50px Arial";
      myGameArea.context.fillText("You lost", 500, 280);
    }
}
function checkButtons(x, y){
  var clicked = false;
  if(farmB.clicked(x,y)){
    upgradeFarm();
    clicked = true;
  }
  else if(cityB.clicked(x,y)){
    upgradeCity();
    clicked = true;
  }
  else if(ecoB.clicked(x,y)){
    upgradeEco();
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
    if((farm.number < 1) || (city.number < 1) || (eco.number < 1)){
      gameState = 3;
    }

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
      setFarmPredicted();
      setCityPredicted();
      setEcoPredicted();
      //updateGameArea();
    }
    clicked = true;
  }
  return clicked;
}

function setFarmPredicted(){
  var delta = 11-farmWater.number;
  if(delta < 0){
    if((farm.number - delta*(farmHappiness + farmHappinessMod))< 100){
      farmPH.number = (farm.number - delta*(farmHappiness + farmHappinessMod)).toPrecision(3);
    }
    else
      farmPH.number = 100;
  }
  farmPH.number = (farm.number - delta*(farmHappiness - farmHappinessMod)).toPrecision(3);
  farmPM.number = (farmWater.number * farmMoney).toPrecision(3);
}

function setCityPredicted(){
  var delta = 11-cityWater.number;
  if(delta < 0){
    if(city.number - delta*(cityHappiness + cityHappinessMod)< 100){
      cityPH.number = (city.number - delta*(cityHappiness + cityHappinessMod)).toPrecision(3);
    }
    else
      cityPH.number = 100;
  }
  else
    cityPH.number = (city.number - delta*(cityHappiness - cityHappinessMod)).toPrecision(3);
  cityPM.number = (cityWater.number * cityMoney).toPrecision(3);
}

function setEcoPredicted(){
  var delta = 11-ecoWater.number;
  if(delta < 0){
    if(eco.number - delta*(ecoHappiness + ecoHappinessMod)< 100){
      ecoPH.number = (eco.number - delta*(ecoHappiness + ecoHappinessMod)).toPrecision(3);
    }
    else
      ecoPH.number = 100;
  }
  else
    ecoPH.number = (eco.number - delta*(ecoHappiness - ecoHappinessMod)).toPrecision(3);
  ecoPM.number = (ecoWater.number * ecoMoney).toPrecision(3);
}
