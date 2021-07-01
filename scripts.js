//VARIABLES
var playing = false;
var score;
var timeremaining;
var countdown;
var correctAns;

/*HELPER*/
function setText(id, text){
    document.getElementById(id).innerHTML = text;
}

function show(id){
    document.getElementById(id).style.display = 'block';
}

function hide(id){
    document.getElementById(id).style.display = 'none';
}

document.getElementById("startreset").onclick = function(){
    if(playing === true){
        //game is on and you want to reset!
        playing = false;
        window.location.reload();
    }else{
        //game is off and you want to start
        playing = true;
        
        score = 0;
        setText("scoreValue", score);
        
        show("timeremaining");
        timeremaining = 60;
        setText("timeremainingValue", timeremaining);
        
        this.innerHTML = "Reset Game";
        startCountdown();
        hide("gameover");
        generateQA();
    }
}

function startCountdown(){
    countdown = setInterval(function(){
        timeremaining -= 1;
        setText("timeremainingValue", timeremaining);
        if(timeremaining <= 0){
            stopCountdown();
            
            show("gameover");
            
            setText("scoreValue", "");
            hide("timeremaining");
            playing = false;
            setText("startreset", "Start Game");
            setText("gameover", "<p>Game Over!</p><p>Your Score : "+score+"</p>");
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(countdown);
}

function generateQA(){
    var x = (1 + Math.round(Math.random() * 9));
    var y = (1 + Math.round(Math.random() * 9));
    correctAns = x * y;
    setText("question", x+" x "+y);
    
    var correctPosition = (1 + Math.round(Math.random() * 3));
    setText("box"+correctPosition, correctAns);
    
    var answers = [correctAns];
    for(i=1; i<5; i++){
        var wrongAnswer;
        
        if(i!=correctPosition){
            do{
                wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9));
            }while(answers.indexOf(wrongAnswer)>-1);
            
            setText("box"+i, wrongAnswer);
            answers.push(wrongAnswer);
        }
    }
}

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing == true){
            if(correctAns == this.innerHTML){
                score++;
                setText("scoreValue", score);
                show("correct");
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                
                //generate next QA
                generateQA();
            }else{
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }
    }
}