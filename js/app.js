var score = 0;
var recorde = 0;
var colisaoX = 45;
var colisaoY = 15;

function randomIndex(arr) {
	return arr[Math.floor((Math.random() * arr.length))];  
}

function detectaColisao(obj){

    const diferencaX = Math.abs(obj.x - player.x);
    const diferencaY = Math.abs(obj.y - player.y);

    if(diferencaX < colisaoX && diferencaY < colisaoY){
        
        if(!(obj instanceof Rocha)){
            obj.y = 999;
            obj.x = 999;
        }
        return true;
    
    }else{    
        return false;
    }

}

//insetos
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.speed =  10 + Math.random() * 100 +40;
    this.sprite = 'images/inseto.png';
};

Enemy.prototype.update = function(dt) {
  
    if (this.x < 500) {
        this.x += (dt) * this.speed;
    } else {
        this.x = -200;
        this.speed = 10 + Math.random() * 100 +40;
    }

    allEnemies.forEach(function(enemy) {
      
        if(detectaColisao(enemy)){
           
            if(score > recorde){
                recorde = score;
                recordeAux.textContent = `RECORDE: ${recorde}`; 
                alert("Parabéns, novo recorde!");
            }else{
                alert("você perdeu, tente novamente!");
            }

            allEnemies = [new Enemy(-202, 222)];
            gema = criarGema();
            rochas = [];
            
        
            score = 0;
            scoreAux.textContent = `SCORE: ${score}`; 
            player.reset();
        }
   
    });


};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//gemas
var Gema = function (x, y, corGema) {

    this.x = x;
    this.y = y;
    this.cor = corGema;
    this.sprite = "images/gema-" +corGema+ ".png";

}

Gema.prototype.update = function() {
   

    if(detectaColisao(this)){
    
       verificarEstrela();
        switch (cor) {
            case "azul":
                score += 15;
                allEnemies.push(new Enemy(-202, (randomIndex([56, 139, 222]))));
                break;

            case "laranja":
                score += 30;
                allEnemies.push(new Enemy(-202, (randomIndex([56, 139, 222]))));
                allEnemies.push(new Enemy(-202, (randomIndex([56, 139, 222]))));
                break;
        
            case "verde":

                score += 50
                rochas.push(new Rocha());
            break;
        };  
        scoreAux.textContent = `SCORE: ${score}`; 
    } 
};


Gema.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function criarGema() {
       
    x = randomIndex([0, 100, 200, 300, 400]); 
    y = randomIndex ([60, 145, 230]); 
    cor = randomIndex (["verde", "laranja","laranja", "laranja", "azul", "azul", "azul", "azul", "azul"]);
    return new Gema(x, y, cor);

}


//estrela
var Estrela = function (x, y) {

    this.x = x;
    this.y = y;
    this.sprite = "images/estrela.png";

}

Estrela.prototype.update = function(){
   
    if(detectaColisao(this)){
      
        var metadeInsetos = allEnemies.length / 2;
        var qtdRochas = rochas.length;

        for (var i = 0; i < metadeInsetos; i++) {
            allEnemies.pop();
        }

        for (var i = 0; i < qtdRochas; i++){
            rochas.pop();
        }
        
    }    

}

Estrela.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function verificarEstrela(){

    var sorteioEstrela = randomIndex ([1,2,3,4,5,6,7]);

    if(sorteioEstrela == 5){
        estrela = new Estrela(randomIndex([0, 100, 200, 300, 400]), randomIndex([56, 139, 222]));
    }
}
//rocha
var Rocha = function () {

    this.x = randomIndex([0, 100, 200, 300, 400]); 
    this.y = randomIndex ([65, 150, 235]); 
    this.sprite = "images/rocha.png";

}

Rocha.prototype.update = function(){
   
}

Rocha.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function verificarCaminho(direcao){

    var caminho;
    var isLivre = true;

    switch (direcao) {
        case "left":
            caminho = player.x - 100; 
            break;
        case "right":
            caminho = player.x + 100; 
            break;
        case "up":
            caminho = player.y - 85; 
            break;
        case "down":
            caminho = player.y + 85; 
            break;

    }
 
    rochas.forEach(function(rocha) {
     
        if(direcao == "left" || direcao == "right"){
     
            if(rocha.x == caminho && rocha.y == player.y)
                isLivre = false;

        }else if(direcao == "up" || direcao == "down"){

            if(rocha.y == caminho && rocha.x == player.x)
                isLivre = false;
       
        }
    });

    return isLivre;

}
class Seletor {
	constructor() {
	    this.x = 200;
        this.y = 415;
        this.sprite = "images/seletor.png";
	}
	
	update() {
	}
	
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	
	handleInput(direction) {
     
        if (direction == 'left' && this.x > 50) {
			this.x -= 100; 
		} else if (direction == 'right' && this.x < 400) {
			this.x += 100; 
		} else if (direction == 'up' && this.y > -35) {
           
            allPlayer.forEach(function(p) {
                if(p.x == seletor.x){
                    player = new Player(seletor.x, p.personagem);
                    p.y = 999;
                }
            });
        
            player.y = 320;
		}
	}
 
}
//player
class Player {
    constructor(x, personagem) {
	    this.x = x;
        this.y = 420;
        this.personagem = personagem;
        this.sprite = "images/"+personagem+".png";
	}
	
	update() {
        

        console.log(player.x);


        if (this.y < 0) {
            this.reset();
            gema = criarGema();
            estrela.x = 999;
            score+=5;
            scoreAux.textContent = `SCORE: ${score}`; 
        }

	}
	
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	
	handleInput(direcao) {
    
        switch (direcao) {
            case 'left': 

                if(verificarCaminho(direcao)){
                    if(this.x > 50){
                        this.x -= 100; 
                    }
                }
                        
            break;
        
            case 'right':  
                if(verificarCaminho(direcao)){
                    if(this.x < 400){
                            this.x += 100; 
                        }
                    }  
            break;

            case 'up':  
                if(verificarCaminho(direcao)){
                    if(this.y > -35)
                        this.y -= 85; 
                }
            break;

            case 'down': 
              
                if(verificarCaminho(direcao)){
                    if(this.y >= 320){
                        allPlayer.forEach(function(p) {
                            if(p.x == seletor.x){
                                player.x = 999;
                                p.y = 420;
                            }
                        });
                    }else{

                        if(this.y < 320)
                            this.y += 85; 
                    }        
                }
            break;
      
        }

	}
	
	reset() {
		this.x = seletor.x;
		this.y = 320; 
    }
 
}

var allEnemies = [
    new Enemy(-202, 222)
];

var allPlayer = [

    new Player(0, "personagem-garota-chifruda"),
    new Player(100, "personagem-garota-princesa"),
    new Player(200, "personagem-garoto"),
    new Player(300, "personagem-garota-rosa"),
    new Player(400, "personagem-garota-gata")

];

var rochas = [

];

gema = criarGema();

var seletor = new Seletor();
var estrela = new Estrela(999,999);
var player = new Player(999, "personagem-garoto");
let scoreAux = document.querySelector('#score');
let recordeAux = document.querySelector('#recorde');    


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    if(player.x == 999){
        seletor.handleInput(allowedKeys[e.keyCode])
    }else{
        player.handleInput(allowedKeys[e.keyCode]);
    }

});
