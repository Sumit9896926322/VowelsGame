var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var synth = window.speechSynthesis;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
var words = document.querySelectorAll(".col-item");
var updatedwords = [];
var clickedWord = document.querySelector(".clicked-word");
var answers = document.querySelectorAll(".letter");
var scoreContainer = document.querySelector(".score");
var answercontainer = document.querySelectorAll(".answers");
var currentword= "";
var currentelem;
var score = 0;

screen.orientation.lock("landscape")
	.then(function() {
		console.log("loaded");
	})
	.catch(function(error) {
		console.error(error);
	});

const keys= {a:0,e:1,i:2,o:3,u:4};
 const speak = (text)=>{
    //cancel all previous utterence 
    synth.cancel();
    console.log(text+"speak");
    synth.speak(new SpeechSynthesisUtterance(text));
};
//Wish in starting of the game
setTimeout(function() {
    speak("Welcome");
}, 1000);
  

const disablebutton = (hide,currentword)=>{
    for(var i = 0;i<words.length;i++){
        if(words[i].innerText == currentword){
            if(hide){
            words[i].style.pointerEvents = "none";
            words[i].style.backgroundColor ="#8080808c";
            }
            else{
            words[i].style.pointerEvents = "all";
            words[i].style.backgroundColor ="#63a8c7";
            }
        }
    }
}


for(var i = 0;i<words.length;i++){

  words[i].addEventListener("click",function(e){
    
    if(currentword!= null){
         disablebutton(false,currentword);
    }
    clickedWord.innerText = e.target.innerText;
      
      currentelem = e.target;
      currentword = e.target.innerText;
      disablebutton(true,currentword);
      speak(currentword);
      
 });
}


for(var i = 0;i<answers.length;i++){;
    answers[i].addEventListener("click",function(e){
      // console.log(currentword+" "+e.target.innerText[0]);
        var letter =e.target.innerText[0];
        if(currentword.includes(e.target.innerText[0])){
            speak("well done");
            score+=1;
            scoreContainer.innerText = score;
            if(score == 25){
                speak("Congratulations  You Won");
            }
            var newelement = document.createElement("div");
            newelement.class = "addedElement";
            newelement.innerText = currentword;
            newelement.style.border ="2px solid";
            newelement.style.borderRadius = "10px";
            newelement.style.margin="10px 0px";
            newelement.style.backgroundColor="#ffc10785";
            for(var i = 0;i<answercontainer.length;i++){
               // console.log(keys[letter]);
                if(i == keys[letter]){
                    answercontainer[i].appendChild(newelement);
                    break;
                }
            }

            for(var j = 0;j<words.length;j++){
                
                if(words[j].textContent == currentword){
                    words[j].textContent = "";
                    words[j].style.border = "none";
                    words[j].style.backgroundColor = "white";
                    words[j].style.boxShadow = "none";
                    words[j].style.pointerEvents = "none";
                    words[j].remove();
                }
                updatedwords[j] = words[j];
            }
        }else{
            if(currentword == "")
               speak("no letter choosen");
            else{
                disablebutton(false,currentword);
                speak("try again");
            }
        }

        currentword = "";
        clickedWord.innerText = "";
        words = updatedwords;
   });
  }