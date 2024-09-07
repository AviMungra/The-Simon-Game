var buttonColours = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;    // to know if the game has started or not
var level = 0;  // level of the game


$(document).on("keydown", function () {
    if(started === false) {
        started = true;
        nextSequence();
    }
});


$(".btn").on("click", function () {

    var userChosenColour = this.id;  // We can also use --> var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);    // Playing sound based on which colour tile the user has clicked
    animatePress(userChosenColour); // Pressed animation on user click

    checkAnswer(userClickedPattern.length - 1); // passing the last index of userClickedPatter array as input
});


function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {  // checking if the user has completed the sequence
            setTimeout(nextSequence, 1000); // Call nextSequence() after a 1000 millisecond delay.
        }
    }
    else {  // when game is over else part is executed

        playSound("worng");

        // adding & removing game-over class
        $("body").addClass("game-over");

        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

        // changing the text of h1 after the game is over
        $("h1").html("Game Over, <br/> Press Any Key to Restart");

        startOver();    // this function will reset some of the variables' value
    }
}


function nextSequence() {

    userClickedPattern = [];    // emptying the array for recording the users' next sequence

    level++;    // increase the level every time the nextSequence() is called
    $("h1").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];   // choosing random colour
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);   // Flash animation on randomly choosen colour tile
    playSound(randomChosenColour);  // Playing sound based on the randomly choosen colour
}


function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}