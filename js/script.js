// Game constants & variables
let gameSound=new Audio('static/music.mp3');
let gameOver=new Audio('static/gameover.mp3');
let turnSound=new Audio('static/ting.mp3');

let turn="X"
let winner;
// Function to change turn
function changeturn(){
    if(turn==="X"){
        return "O";
    }else{
        return "X";
    }
}

// Function to check for win
function checkWin(){
    let boxes=document.getElementsByClassName('element');

    let flag=0;

    let winSequence=[
        [0,1,2,0,5,0],
        [3,4,5,0,15,0],
        [6,7,8,0,25,0],
        [0,3,6,-10,15,90],
        [1,4,7,0,15,90],
        [2,5,8,10,15,90],
        [0,4,8,0,15,45],
        [2,4,6,0,15,135]
    ];
    Array.from(winSequence).forEach(e=>{
        if(boxes[e[0]].innerHTML==boxes[e[1]].innerHTML && boxes[e[1]].innerHTML==boxes[e[2]].innerHTML && boxes[e[1]].innerHTML!==""){
            flag=1;
            winner=boxes[e[0]].innerHTML;
            
            // add line-animation
            let line=document.getElementById('line');
            line.style.transform=`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            line.style.width="30vw";
            
            // Stop players from playing further

        }
    });
    return flag;
}

// Game Logic

// gameSound.load();

let boxes=document.getElementsByClassName('element');
let turninfo=document.getElementById('turninfo');

Array.from(boxes).forEach(e => {
    e.addEventListener('click',()=>{
        if(e.innerHTML===""){
            e.innerHTML=turn;
            
            turn=changeturn();
            turninfo.innerHTML="Turn for "+ turn;
            turnSound.play();
            if(checkWin()){
                // gameSound.pause();
                gameOver.play();
                let result=document.getElementById('result');
                result.innerHTML="Game is won by "+winner+"🎉";
                turninfo.style.display="none";
            }
        }

    })
});


// Function to Reset
let reset=document.getElementById('reset');
reset.addEventListener('click',()=>{
    Array.from(boxes).forEach(e=>{
        e.innerHTML="";
    })
    turn="X";
    turninfo.style.display="block";
    turninfo.innerHTML="Turn for "+ turn;

    let result=document.getElementById('result');
    result.innerHTML="";

    line.style.width="0";

    // gameSound.play();
})