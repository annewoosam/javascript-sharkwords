
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry', 'orange', 'apple', 'banana', 'pineapple', 'kiwi',
  'peach', 'pecan', 'eggplant', 'durian', 'peanut', 'chocolate'
];


let numWrong = 0;


// Loop over the chars in `word` and create divs.
//
// insert jQuery here after the html file is updated with the jQuery CDN script before head closing tag
// and the body closing tag is preceded by the JavaScript line
// convert return to jQuery
// word-container is id per # tag from html file section id
// letter-box is class from style css
// takes word-container list and appends characer for each letter box required by the word
const createDivsForChars = (word) => {
  for (const char of word){
    $('#word-container').append(`<div class="letter-box ${char}"></div>`);
  }
};

// Test would be in web browser console createDivsForChars('strawberry') expected output a letter between div a line

// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
// #letter-buttons is id per # tag from html file section id
// button is type

  for (const char of ALPHABET) {
    $('#letter-buttons').append(`<button>${char}</button`);
  }
};
// reload browser check for button; if not there check resources for stale page then use Developer empty cache then reload


// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
// unlike ids and classes the button diesn't require quotes.
// $(what).action('characteristic', boolean);
const disableLetterButton = (buttonEl) => {
  $(buttonEl).attr('disabled', true);
};


// Return `true` if `letter` is in the word.
// undefined
const isLetterInWord = (letter) => {
  return $(`div.${letter}`[0]) !== undefined;
};


// Called when `letter` is in word. Update contents of divs with `letter`.
// .html
const handleCorrectGuess = (letter) => {
  $(`div.${letter}`).html(letter);
};


// Called when `letter` is not in word.
//
// If the shark gets the person, disable all buttons and show the "play again"
// message. Otherwise, increment `numWrong` and update the shark image.
//
const handleWrongGuess = () => {
  numWrong += 1;

    $('#shark-img img').attr('src', `/static/images/guess${numWrong}.png`);

    if (numWrong === 5) {
      $('button').attr('disabled', true);

      $('#play-again').css('display', '');
    }
};


// Reset game state. Called before restarting the game.
//
const resetGame = () => {
 numWrong = 0;

  $('#shark-img img').attr('src', '/static/images/guess0.png');

  $('#play-again').css('display', 'none');

  for (const el of $('#word-container').children()) {
    el.remove();
  }

  for (const el of $('#letter-buttons').children()) {
    el.remove();
  }
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess.
  const word = 'hello';

  createDivsForChars(word);
  generateLetterButtons();

  $('button').on('click', (evt) => {
    const clickedBtn = evt.target;
    disableLetterButton(clickedBtn);

    const letter = clickedBtn.html();

    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
  });

  $('#play-again').on('click', () => {
    resetGame();
    startGame();
  });
})();
