var myGamePiece, farmB, cityB, ecoB, nextB;
var myObstacles = [];
var myMoney, myWater, eventText, city, farm, eco;

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

    eventText = new componentText("30px Arial", "black", 400, 400, "Event", 0);
    //myGamePiece = new component(30, 30, "red", 10, 120);
    myGameArea.start();
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.canvas.addEventListener('click', function(event) {
            var x = event.x - 200, y = event.y - 25;
            checkButtons(x, y);
            updateGameArea();
        }, false);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        //this.interval = setInterval(updateGameArea, 20);
        updateGameArea();
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
        ctx.fillStyle = "black";
        ctx.fillText(this.text1, this.x+ 10, this.y+this.height/3);
        ctx.fillText(this.text2, this.x+ 10, this.y+(2*(this.height/3)));
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
    //reuse for clicked?
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
}
function checkButtons(x, y){
  if(farmB.clicked(x,y)){
    eventText.text = "Farm";
    farm.number--;
  }
  if(cityB.clicked(x,y)){
    eventText.text = "City";
    city.number--;
  }
  if(ecoB.clicked(x,y)){
    eventText.text = "Eco";
    eco.number--;
  }
  if(nextB.clicked(x,y)){
    eventText.text = "Next";
  }
}
