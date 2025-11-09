// global variables
let buttonColours = ["red", "blue", "green", "yellow"]; //master list
let gamePattern = [];    //master sequence
let userClickedPattern = [];   //users answer sheet for the current level
let started = false;     // the gate that prevents the game from starting more than once 
let level = 0;

    
$(".btn").click(function() { 

  let userChosenColour = $(this).attr("id"); //get id of specific button click
  userClickedPattern.push(userChosenColour); //add to answer sheet
                                                   //wracking my brain at this for 4 fucking hours just it to have just one wrong word i forgot to fucking erase smh (the brai of the operation)
    if (userClickedPattern[userClickedPattern.length - 1] === gamePattern[userClickedPattern.length - 1]) {
                              if (userClickedPattern.length === gamePattern.length) {

                                setTimeout(function () {
                                    userClickedPattern = [];
                                    nextSequence();
                                }, 1000 );

                              }
    } else {
        let audio = new Audio("sounds/wrong.mp3"); //plays audio on wrong answer
        audio.play();

        $("body").addClass("game-over");

        setTimeout(function () {    //
          $("body").removeClass("game-over");
          $("h1").text("Game Over, Press Any Key to Restart");

        }, 200 ); //flashes the screen red on wrong choice / game over

        startOver();
    }

   playSound(userChosenColour);   //feedback on wrong choices
   animatePress(userChosenColour);   

});

function nextSequence() {

  level++;  
  $("h1").text("Level " + level);
      //picks random color 
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];

  //adds new color to master list 
  gamePattern.push(randomChosenColour);

  //flash animation 
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound duh
  playSound(randomChosenColour); 

}

function playSound(name) {

  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed"); //adds animation on press 

    setTimeout(function () {
     $("#" + currentColour).removeClass("pressed"); //removes the css press function after 100 ms 
    }, 100);

}


$(document).keydown(function () {
 
    // makes sure the second keydown doesnt execute the nextSequence again 
   if (!started) {
    started = true;
    nextSequence();

   }  
} )



function startOver () {
  level = [];          //setting settings on default to try again 
  gamePattern = [];
  started = false;
}


