var choice = null;
var correct = null;
var apiUrl = "https://opentdb.com/api.php?amount=50&type=multiple";
var allChoices = [];
var timerId = null;
let apiResult = null;

var index = 0;

function runTimer(){
    var timeLeft = 30;
    var elem = document.getElementById('timer');
    
     timerId = setInterval(countdown, 1000);
    
    function countdown() {
      if (timeLeft == -1) {
        clearTimeout(timerId);
        showIncorrect();
        setTimeout(async function() {
            await runProgram();
          }, 500);
         

      } else {
        elem.innerHTML = "Time Left: " + timeLeft;
        timeLeft--;
      }
    }
    
}

$(function () {

    $('li').on('click',function (e) {

        choice = this.innerHTML

        if(choice == correct){
            clearTimeout(timerId);
            showCorrect();
            index++;
        }else{
            clearTimeout(timerId);
            showIncorrect();
            index++;
        }
        
        e.preventDefault();
        setTimeout(async function() {
            await runProgram();
        }, 500);
        
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

function showCorrect(){
    document.body.style.backgroundColor = "green";
    setTimeout(function(){
        document.body.style.backgroundColor = "rgb(60, 58, 61)";
    }, 500);
}

function gameOver(){
   document.getElementsByClassName("title").innerHTML = "GAME OVER! You Performed Well";
   document.getElementsByClassName("asked").innerHTML = "";
   document.getElementsByClassName("answers").innerHTML = "";
}

function showIncorrect(){

    document.body.style.backgroundColor = "red";

    setTimeout(function(){
        document.body.style.backgroundColor = "rgb(60, 58, 61)";
    }, 500);

}

runProgram();
gameOver();