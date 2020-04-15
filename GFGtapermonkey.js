// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sumit singh
// @match        https://practice.geeksforgeeks.org/*
// @grant        none
// ==/UserScript==
//version 2.0


(function() {
    let input = "";
    let container;
    let btn = document.createElement("BUTTON");
    btn.innerText = "Copy Input";
    btn.style.height = "20px";
    btn.style.width = "100px";
    btn.style.position ="relative";
    btn.style.height="30px";
    btn.style.top = "-260px";
    btn.style.float = "right";
    btn.style.backgroundColor ="black";
    btn.style.color= "white";

    let outbtn = document.createElement("BUTTON");
    outbtn.innerText = "Copy Output";
    outbtn.style.height = "25px";
    outbtn.style.width = "100px";
    outbtn.style.float = "right";
    outbtn.style.left = "98px";
    outbtn.style.position ="relative";
    outbtn.style.height="30px";
    outbtn.style.top = "-56px";
    outbtn.style.backgroundColor ="black";
    outbtn.style.color= "white";



    const problem = document.querySelector(".problemQuestion").children;
    for(var i =0;i<problem.length;i++){
        if(problem[i].innerText.substring(0,9).includes("Example")){
           container = problem[i];
           input = problem[i].innerText.split("\n");
            break;
        }
    }

    container.append(btn);
    container.append(outbtn);

    let copyinput= "";
    let copyoutput ="";
    let op = false;
    for(let i = 2;i<input.length;i++){
       if(input[i] == "Output:"){
           op = true;
           continue;
       }
       if(!op){
       copyinput+=input[i];
      copyinput+="\n";
       }else{
         copyoutput +=input[i];
         copyoutput+="\n";
       }
    }

    btn.addEventListener("click",function(){
    var el = document.createElement('textarea');
    el.value = copyinput;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    btn.innerText = "Copied";
    setTimeout(function(){
     btn.innerText = "CopyInput";
    },500);
    });

    outbtn.addEventListener("click",function(){
    var op = document.createElement('textarea');
    op.value = copyoutput;
    op.setAttribute('readonly', '');
    op.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(op);
    op.select();
    document.execCommand('copy');
    outbtn.innerText = "Copied";
    setTimeout(function(){
    outbtn.innerText = "CopyOutput";
    },500);
    });
})();