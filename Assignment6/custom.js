let startButton = document.getElementById("startButton");
let startScreen = document.getElementById("startScreen");
let time = document.getElementById("time");
let gameScreen = document.getElementById("gameScreen");
let game = document.getElementById("game");
let selectDiff = document.getElementById("selectDiff");
let easy = document.getElementById("easy");
let medium = document.getElementById("medium");
let hard = document.getElementById("hard");
let gameOverScreen = document.getElementById("gameOverScreen");
let again = document.getElementById("again");
let bestTime = document.getElementById("bestTime");
let timeNow = document.getElementById("timeNow");
let newHS = document.getElementById("newHS");
let enter = document.getElementById("enter");
let name1 = document.getElementById("name");

let sec=0;
let timeID;
let canClick = false;
let canClickAnything = true;
let prevBest=null;
let prevName=null;

let correct = new Audio("correct.mp3");
let wrong = new Audio("wrong.mp3");

if (window.localStorage.getItem("bestTimeName") !=null && window.localStorage.getItem("bestTime") !=null)
{
    prevBest = window.localStorage.getItem("bestTime");
    prevName = window.localStorage.getItem("bestTimeName");
}

let assets = ['snorlax.png', 'electrabuzz.png', 'chansey.png', 'oddish.png',
              'pikachu.png', 'paras.png', 'arcanine.png', 'ponita.png',
              'venonat.png', 'eggsecute.png', 'machop.png', 'pidgey.png',
              'psyduck.png', 'tauros.png', 'vulpix.png', 'gloom.png',
              'krabby.png', 'butterfree.png', 'bulbasaur.png', 'clefairy.png',
              'koffing.png', 'goldeen.png', 'magikarp.png', 'beedrill.png',
              'lapras.png', 'meowth.png', 'ekans.png', 'jigglypuff.png',
              'horsea.png', 'polywog.png', 'sandshrew.png', 'rattata.png',
              'gengar.png', 'eevee.png', 'bellsprout.png', 'squirtle.png',
              'seel.png', 'caterpie.png'];

startButton.onclick = function(){
    startScreen.style.display = "none";
    selectDiff.style.display = "flex";
}
easy.onclick = function(){
    selectDiff.style.display = "none";
    gameScreen.style.display = "flex";sec=0;
    incSec();
    timeID = setInterval(incSec, 1000);

    setBoard(3,4); //12,20,30
}
medium.onclick = function(){
    selectDiff.style.display = "none";
    gameScreen.style.display = "flex";sec=0;
    incSec();
    timeID = setInterval(incSec, 1000);

    setBoard(4,5); //12,20,30
}
hard.onclick = function(){
    selectDiff.style.display = "none";
    gameScreen.style.display = "flex";sec=0;
    incSec();
    timeID = setInterval(incSec, 1000);

    setBoard(5,6); //12,20,30
}

function incSec(){
    time.innerHTML = sec;
    sec++;
}
function setBoard(n1,n2){
    game.innerHTML="";
    let n = n1*n2;
    //get n/2 random numbers
    let randomPoke = [];
    for (let i=0;i<(n/2);i++)
    {
        let r = parseInt(Math.random()*assets.length);
        if (!(randomPoke.includes(assets[r]))){randomPoke.push(assets[r]);}
        else {i--;}
    }

    randomPoke = randomPoke.concat(randomPoke);

    for (let i=0;i<n;i++)
    {
        let poke = document.createElement("img");
        poke.src = "images/pokeball.png";
        poke.classList.add("token");
        
        let r = parseInt(Math.random()*randomPoke.length);

        poke.dataset.secret = `images/${randomPoke[r]}`;
        poke.dataset.got = "no";
        randomPoke.splice(r,1);
        game.appendChild(poke);
    }

    game.style.width = `${n2}00px`;
    game.style.height = `${n1}00px`;

    let allTokens = document.querySelectorAll(".token");
    let clicked = 0;
    let gotten = 0;
    let pairs = n/2;
    let first;
    let second;

    for (let i=0;i<allTokens.length;i++)
    {
        allTokens[i].onclick = function()
        {
            let token = allTokens[i];
            if (token.dataset.got == "no" && canClickAnything)
            {
                if (clicked != 2){
                    token.src=token.dataset.secret;
                    clicked++;
                }
                
                if (clicked==1){first=token}
            
                else if (clicked==2){
                    if (!(token === first))
                    {
                        second=token
                        if (first.dataset.secret != second.dataset.secret){
                            wrong.load();
                            canClickAnything = false;
                            wrong.play();
                            setTimeout(hide, 1000, first, second);
                            clicked=0;
                        }
                        else{
                            correct.load();
                            correct.play();
                            canClickAnything=true;
                            clicked=0;
                            first.dataset.got = "yes";
                            second.dataset.got = "yes";
                            gotten++;
                        }
                    }
                    else{clicked--;}
                }

                    
                if (gotten == pairs){
                    clearInterval(timeID);
                    win(sec);
                    
                }
            }
        }
    }
    function hide(token1, token2)
    {   
        if (token1.dataset.got = "no") {token1.src = "images/pokeball.png";}
        if (token2.dataset.got = "no") {token2.src = "images/pokeball.png";}
        canClickAnything=true;
    }

    function win(finalTime){
        gameScreen.style.display="none";
        gameOverScreen.style.display="flex";

        timeNow.innerHTML =finalTime;
        if (prevBest == null || finalTime<prevBest)
        {
            newHS.style.display = "flex";
            prevBest=finalTime;
            window.localStorage.setItem("bestTime",""+prevBest);

        }
        else {canClick=true;}
        
        
        if (prevBest == finalTime) {bestTime.innerHTML = prevBest + " by you";}
        else {bestTime.innerHTML = prevBest + " by " + prevName;}

    }
}

enter.onclick = function(){
    if (name1.value.length > 0){
        newHS.style.display = "none";
        prevName = name1.value;
        canClick=true;
        window.localStorage.setItem("bestTimeName",""+prevName);
    }
}

again.onclick = function(){
    if (canClick)
    {
        gameOverScreen.style.display = "none";
        selectDiff.style.display = "flex";
    }
}
