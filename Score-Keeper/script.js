var player1=0;
var player2=0;
var b1=document.querySelector("#btn1");
var b2=document.querySelector("#btn2");
var b3=document.querySelector("#btn3");
var p1Score=document.querySelector("#p1Score");
var p2Score=document.querySelector("#p2Score");
var input=document.querySelector("input");
var M=document.querySelector("#MaxVal");
var Max=5;
var run=true
b1.addEventListener("click",function(){
    if(run){
    player1++;}
    p1Score.textContent=player1;
    if(player1===Max){run=false;
    p1Score.style.color="green"
    }
});
b2.addEventListener("click",function(){
    if(run){
    player2++;}
    p2Score.textContent=player2;
    if(player2===Max){run=false;
    p2Score.style.color="green"}
});
var reset=function(){
    player1=0;
    player2=0;
    p1Score.style.color="black";
    p2Score.style.color="black";
    p1Score.textContent=player1;
    p2Score.textContent=player2;
    run=true;
}
b3.addEventListener("click",reset);

input.addEventListener("change",function(){
    Max=Number(input.value);
    M.textContent=String(Max);
    reset();
});

