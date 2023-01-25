const $ = require('jquery');
const words = require('./words.js')

const debug = true


let guesses = [];
let word = "";

function startup() {
  guesses = [];
  word = words[Math.round(Math.random() * words.length)];
  
  $('.input').css('display','block');
  $('.retry').css('display','none');
  $('.success').css('display','none');
  
  $('.letter.green').removeClass('green');
  $('.letter.yellow').removeClass('yellow');
  $('.letter').text('');

  if (debug) {
     $(".input").attr("placeholder", "Enter your guess here");
  }
}

function processGuess() {
  let guess = $('.input')
        .val()
        .replace(/[^A-Z]+/gi, "")
        .toUpperCase()
        .slice(0, 5);
  
  let attemptNumber = guesses.length;
  
  let correct = 0;
  
  for(let i = 0; i < guess.length; i++) {
     let gLetter = guess[i];
     let wLetter = word[i];
     
     if(gLetter == wLetter) {
        correct += 1;
        fillBox(gLetter, attemptNumber+1, i+1, 2);
        continue;
     }
     if(word.indexOf(gLetter) !== -1) {
        fillBox(gLetter, attemptNumber+1, i+1, 1);
        continue;
     }
     fillBox(gLetter, attemptNumber+1, i+1, 0);
  }
  
  guesses.push(guess);
  $('.input').val('');
  
  if(correct >= word.length) {
     $('.success').css('display','block');
     $('.retry').css('display','block');
     $('.input').css('display','none');
     return;
  }
  if(guesses.length == 5){
     $('.retry').css('display','block');
     $('.input').css('display','none');
  }
}

function fillBox(letter, guess, box, match) {
  let bNode = $(`.guess[data-attempt="${guess}"] .letter[data-letter="${box}"]`);
  bNode.text(letter);
  if(match === 2) {
     bNode.addClass('green');
  } else if (match === 1) {
     bNode.addClass('yellow');
  }
}

$(".input").on("keyup", function (ev) {
  if (ev.keyCode == 13) {
     processGuess();
     return;
  }

  $(this).val(
     $(this)
        .val()
        .replace(/[^A-Z]+/gi, "")
        .toUpperCase()
        .slice(0, 5)
  );
});

$('.retry').on('click', function() {
  startup();
});

startup();