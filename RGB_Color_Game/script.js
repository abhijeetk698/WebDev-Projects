var num=6
var colors=fillColor(num);
var targetColor=RandomIndex(num);
var targetDisplay=document.querySelector("#trgt");
var resultDisplay=document.querySelector("#resultDisplay");
var boxes=document.querySelectorAll(".box");
var heading=document.querySelector("#heading");
var newGame=document.querySelector("#newGame");
var easyGame=document.querySelector("#easyGame");
var hardGame=document.querySelector("#hardGame");
hardGame.classList.add("blue");
easyGame.addEventListener("click",function(){
    easyGame.classList.add("blue");
    hardGame.classList.remove("blue");
    num=3;
    colors=fillColor(num);
    targetColor=RandomIndex(num);
    for(var i=0;i<boxes.length;i++){
        if(colors[i]){
        boxes[i].style.backgroundColor=colors[i];    
        }else{
        boxes[i].style.display="none";
    }
    }   
    heading.style.backgroundColor="#232323";
    targetDisplay.textContent=targetColor;
}); 

hardGame.addEventListener("click",function(){
    easyGame.classList.remove("blue");
    hardGame.classList.add("blue");
    num=6;
    colors=fillColor(num);
    targetColor=RandomIndex(num);
    for(var i=0;i<boxes.length;i++){
        boxes[i].style.display="block";
        boxes[i].style.backgroundColor=colors[i];    
    }  
    heading.style.backgroundColor="#232323";
    targetDisplay.textContent=targetColor;
});

newGame.addEventListener("click",function(){
    colors=fillColor(num);
    targetColor=RandomIndex(num);
    for(var i=0;i<num;i++){
        boxes[i].style.backgroundColor=colors[i];    
    }
    heading.style.backgroundColor="#232323";
    targetDisplay.textContent=targetColor;
    newGame.textContent="New Game";
});
targetDisplay.textContent=targetColor;
for(var i=0;i<colors.length;i++){
    boxes[i].style.backgroundColor=colors[i];
    boxes[i].addEventListener("click",function(){
        var pickedColor=this.style.backgroundColor;
        if(pickedColor===targetColor){
            resultDisplay.textContent=" CORRECT!!";
            changeAll(pickedColor);
            newGame.textContent="New Game";           
        }
        else{
            this.style.backgroundColor="#232323";
            resultDisplay.textContent=" INCORRECT!! Try Again";
            newGame.textContent="Try Again";
        }
    })
}

function changeAll(pickedColor){
    for(var i=0;i<boxes.length;i++){
        boxes[i].style.backgroundColor=pickedColor;
    }
    heading.style.backgroundColor=pickedColor;
    return ;
}

function RandomIndex(num){
    var r=Math.floor(Math.random()*num);
    return colors[r];
}

function RandomColor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    var toreturn="rgb("+r+", "+g+", "+b+")";
    return toreturn;
}

function fillColor(num){
    var colors=[];
    for(var i=0;i<num;i++){
        colors.push(RandomColor());
    }
    return colors;
}
