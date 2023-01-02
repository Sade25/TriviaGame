var choice = null;
var correct = null;
var apiUrl = "https://opentdb.com/api.php?amount=50&category=17&type=multiple";
var allChoices = [];
var timerId = null;
let apiResult = null;
var index = 0;
var score = 0;

function runTimer(){
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    
     timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        showIncorrect();
        lose();
        index++;
        if(index === 50){
            gameOver();
        }
        else{
        setTimeout(async function() {
            await runProgram();
          }, 500);
         
        }
      } else{
        elem.innerHTML = "Time Left: " + timeLeft;
        timeLeft--;
      }
    }
    
}

function win() {
    var audio = document.getElementById("win");
    audio.currentTime = 0;
    audio.play();
    setTimeout(function() {
        audio.pause();
      }, 1500);
}

function lose() {
    var audio = document.getElementById("lose");
    audio.currentTime = 0;
    audio.play();
    setTimeout(function() {
        audio.pause();
      }, 1500);
    
}

function finished() {

    var audio = document.getElementById("finished");
    audio.currentTime = 0;
    audio.play();
    setTimeout(function() {
        audio.pause();
      }, 8000);
    
}

$(function () {

    $('li').on('click',function (e) {

        choice = this.innerHTML

        if(choice == correct){
            clearTimeout(timerId);
            win();
            showCorrect();
            score++;
        }else{
            clearTimeout(timerId);
            lose();
            showIncorrect();
        }
        index++;
        e.preventDefault();
        if(index === 50){
            gameOver();
        }
        else{
        setTimeout(async function() {
            await runProgram();
        }, 500);
        }
    });

});


async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    return data;
    
}

async function getApiResult() {
    if (apiResult === null) {
      apiResult = await getapi(apiUrl);
    }
    return apiResult;
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }     
    return array;
 }

async function runProgram() {

        let apiResult = await getApiResult();
        runTimer();
        console.log(apiResult); // Print the entire apiResult object to the console
        console.log(apiResult.results); // Print the results array to the console
        console.log(apiResult.results[49]); 

        if(index === 50){
            gameOver();
        }else{

            let temp = apiResult.results[index];
            
            allChoices = [temp.incorrect_answers[0],temp.incorrect_answers[1],
            temp.incorrect_answers[2],temp.correct_answer];
            randomArr = shuffleArray(allChoices);
            document.getElementsByClassName("asked")[0].innerHTML = temp.question;
            document.getElementsByClassName("title")[0].innerHTML = temp.category;
            document.getElementsByClassName("1")[0].innerHTML = randomArr[0];
            document.getElementsByClassName("2")[0].innerHTML = randomArr[1];
            document.getElementsByClassName("3")[0].innerHTML = randomArr[2];
            document.getElementsByClassName("4")[0].innerHTML = randomArr[3];
            
            correct = temp.correct_answer;
        
            console.log(index);
        }

}

function showCorrect(){
    document.body.style.backgroundColor = "green";
    if(index === 50){
        gameOver();
    }else{
        setTimeout(function(){
            document.body.style.backgroundColor = "rgb(60, 58, 61)";
        }, 500);
    }
}

function gameOver() {
    document.getElementsByClassName("title")[0].innerHTML = "GAME OVER! You Performed Well. You Finished With A Score Of " + score;
    document.getElementsByClassName("asked")[0].innerHTML = "";
    document.getElementsByClassName("answers")[0].innerHTML = "";
    document.body.style.backgroundColor = "purple";
    // Infinite loop to keep the gameOver screen displayed
    var div = document.getElementById("timer");

    // get a reference to the div's parent element
    var parent = div.parentNode;
  
    // remove the div from its parent
    parent.removeChild(div);
    finished();
    setInterval(gameOver, 1000);
  }
  

function showIncorrect(){

    document.body.style.backgroundColor = "red";
    if(index === 50){
        gameOver();
    }else{
        setTimeout(function(){
            document.body.style.backgroundColor = "rgb(60, 58, 61)";
        }, 500);
    }
   

}

runProgram();
