const pokemon = [
    {name:'Pikachu', image:'images/pikachu.png'}, 
    {name:'Bulbasaur', image:'images/bulbasaur.png'},
    {name:'Charmander', image:'images/charmander.png'},
    {name:'Eevee', image:'images/eevee.png'},
    {name:'Squirtle', image:'images/squirtle.png'}
]

let game = document.getElementById("game");
let status1 = document.getElementById("progress");
let extra = document.getElementById("extra");
let grass1 = document.getElementById("grass1");
let grass2 = document.getElementById("grass2");
let grass3 = document.getElementById("grass3");
let grass = document.getElementById("grass");
let displayBalls = document.getElementById("num1");
let displayCap = document.getElementById("num2");
let start = document.getElementById("startGame");
let history =document.getElementById("history");
let removeGrass = document.getElementById("reveal");
let nextRound = document.getElementById("next");
let items = document.getElementById("items");
let restart = document.getElementById("restart");
let again = document.getElementById("again");


let numOfBalls =5;
let numCap =0;

restart.style.display = "none";
again.style.display = "none";

start.onclick = function(){
    start.style.display = "none";
    game.style.display = "block";
    restart.style.display = "block";

    restart.onclick = function(){
        restartGame();
    }

    pickPokemon();
    again.onclick = function(){
        restartGame();
    }

}

function disableGrassClicks() {
    grass1.onclick = null;
    grass2.onclick = null;
    grass3.onclick = null;
}

function pickPokemon(){ 

    if (numOfBalls > 0){
        status1.innerHTML = "Your progress so far...";
        again.style.display = "none";

        nextRound.onclick = function(){
            nextRound.style.display = "none";
            createNewRound();
        }
        grass1.onclick = function(){
            grass1.style.opacity="0";
            grassUpdate(1);
            disableGrassClicks();
        }
        grass2.onclick = function(){
            grass2.style.opacity="0";
            grassUpdate(2);  
            disableGrassClicks();  
        }
        grass3.onclick = function(){
            grass3.style.opacity="0";
            grassUpdate(3);  
            disableGrassClicks();
        }
        update();
    }
    else{
        stopGame();
    }

    
}

function grassUpdate(n){
    numOfBalls--;
    update();
    let rPoke = parseInt(Math.random()*5);

    let r1 = parseInt(Math.random()*3);
    let r2 = parseInt(Math.random()*3);
    let r3 = parseInt(Math.random()*3);

    while (r1==r2 || r1==r3) {r1 = parseInt(Math.random()*3);}
    while (r2==r1 || r2==r3) {r2 = parseInt(Math.random()*3);}
    while (r3==r1 || r3==r2) {r3 = parseInt(Math.random()*3);}


    if (n==1){
        //grass1
        if (r1==1){
            items.innerHTML += `<img src=${pokemon[rPoke].image} 
            style="position:absolute;left:40px;">`;
            numCap++;
            history.innerHTML = `You caught a(n) ${pokemon[rPoke].name}!</br>` + history.innerHTML;
            update();
        }
        else if (r1==2){
            items.innerHTML += `<img src=images/pokeballs.png 
            style="position:absolute;left:40px;">`;
            numOfBalls += 2;
            history.innerHTML = "You got 2 Pokeballs!</br>"+history.innerHTML;
            update();
        }
        else{
            history.innerHTML = "You got nothing!</br>"+history.innerHTML;
        }
    }
    else if (n==2){
        //grass2
        if (r2==1){
            items.innerHTML += `<img src=${pokemon[rPoke].image} 
            style="position:absolute;left:270px;">`;
            numCap++;
            history.innerHTML = `You caught a(n) ${pokemon[rPoke].name}!</br>`+history.innerHTML;
            update();
        }
        else if (r2==2){
            items.innerHTML += `<img src=images/pokeballs.png 
            style="position:absolute;left:270px;">`;
            numOfBalls+=2;
            history.innerHTML = "You got 2 Pokeballs!</br>"+history.innerHTML;
            update();
        }
        else{
            history.innerHTML = "You got nothing!</br>"+history.innerHTML;
        }

    }else{
        //grass3
        if (r3==1){
            items.innerHTML += `<img src=${pokemon[rPoke].image} 
            style="position:absolute;right:40px;">`;
            numCap++;
            history.innerHTML = `You caught a(n) ${pokemon[rPoke].name}!</br>`+history.innerHTML;
            update();
        }
        else if (r3==2){
            items.innerHTML += `<img src=images/pokeballs.png 
            style="position:absolute;right:40px;">`;
            numOfBalls+=2;
            history.innerHTML = "You got 2 Pokeballs!</br>"+history.innerHTML;
            update();
        }
        else{
            history.innerHTML = "You got nothing!</br>"+history.innerHTML;
        }
    }
    removeGrass.style.display = "block";

    removeGrass.onclick = function(){
        removeGrass.style.display = "none";
        document.getElementById("grass1").style.opacity = "0";
        document.getElementById("grass2").style.opacity = "0";
        document.getElementById("grass3").style.opacity = "0";
        //grass1
        if (r1==1){
            items.innerHTML += `<img src=${pokemon[rPoke].image} 
            style="position:absolute;left:40px;">`;
        }
        else if (r1==2){
            items.innerHTML += `<img src=images/pokeballs.png 
            style="position:absolute;left:40px;">`;
        }
        else{

        }
        //grass2
        if (r2==1){
            items.innerHTML += `<img src=${pokemon[rPoke].image} 
            style="position:absolute;left:270px;">`;
        }
        else if (r2==2){
            items.innerHTML += `<img src=images/pokeballs.png 
            style="position:absolute;left:270px;">`;
        }
        else{

        }
        //grass3
        if (r3==1){
            items.innerHTML += `<img src=${pokemon[rPoke].image} 
            style="position:absolute;right:40px;">`;
        }
        else if (r3==2){
            items.innerHTML += `<img src=images/pokeballs.png 
            style="position:absolute;right:40px;">`;
        }
        else{
            
        }

        nextRound.style.display = "block";


    }

}

function createNewRound(){
    items.innerHTML = "";
    document.getElementById("grass1").style.opacity = "1";
    document.getElementById("grass2").style.opacity = "1";
    document.getElementById("grass3").style.opacity = "1";

    pickPokemon();

}

function stopGame(){
    status1.innerHTML = "Game Over!";
    disableGrassClicks();
    again.style.display = "block";
    restart.style.display = "none";
}

function restartGame(){
    numOfBalls = 5;
    numCap = 0;
    start.style.display = "block";
    game.style.display = "none";
    restart.style.display = "none";
    nextRound.style.display = "none";
    removeGrass.style.display = "none"
    history.innerHTML= "";

    items.innerHTML = "";
    document.getElementById("grass1").style.opacity = "1";
    document.getElementById("grass2").style.opacity = "1";
    document.getElementById("grass3").style.opacity = "1";

}

function update(){
    displayBalls.innerHTML = ""+numOfBalls;
    displayCap.innerHTML = ""+numCap;
}