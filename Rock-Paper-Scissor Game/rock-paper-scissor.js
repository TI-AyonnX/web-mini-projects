const scores = JSON.parse(localStorage.getItem('scores')) || {
  Wins: 0,
  Loses: 0,
  Ties: 0,
};

updateScoreElement();

function pickComputerMove() {
  let computer_move = '';
  const random_no = Math.random();
  if (random_no >= 0 && random_no <= 1 / 3) {
    computer_move = 'Rock';
  }
  else if (random_no > 1 / 3 && random_no <= 2 / 3) {
    computer_move = 'Paper';
  }
  else computer_move = 'Scissor';
  return computer_move;
}

let isautoPlaying = false;
let intervalID;

document.querySelector('.js-auto-play').addEventListener('click', () => {
  autoPlay();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'a' || event.key === 'A') {
    autoPlay();
  }
});

function autoPlay() {
  if (!isautoPlaying) {
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playgame(playerMove);
    }, 1000);
    isautoPlaying = true;
  }
  else {
    clearInterval(intervalID);
    isautoPlaying = false;
  }
  checkPlaying();
}

function checkPlaying() {
  if (isautoPlaying) {
    document.querySelector('.js-auto-play').innerHTML = 'Stop Playing';
  }
  else {
    document.querySelector('.js-auto-play').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playgame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playgame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playgame('Scissor');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    playgame('Rock');
  }
  else if (event.key === 'p' || event.key === 'P') {
    playgame('Paper');
  }
  else if (event.key === 's' || event.key === 'S') {
    playgame('Scissor');
  }
});

function playgame(player_move) {
  const computer_move = pickComputerMove();
  let result = '';
  if (player_move === 'Rock') {
    if (computer_move === 'Rock') {
      result = 'Tie.';
    }

    else if (computer_move === 'Paper') {
      result = 'You lose.'
    }
    else result = 'You win.';
  }

  else if (player_move === 'Paper') {
    if (computer_move === 'Rock') {
      result = 'You win.';
    }

    else if (computer_move === 'Paper') {
      result = 'Tie.'
    }
    else result = 'You lose.';
  }

  else {
    if (computer_move === 'Rock') {
      result = 'You lose.';
    }

    else if (computer_move === 'Paper') {
      result = 'You win.'
    }
    else result = 'Tie.';
  }
  scoreCount(result, player_move, computer_move);
}

function scoreCount(result, player_move, computer_move) {
  if (result === 'You win.') {
    scores.Wins++;
  }
  else if (result === 'You lose.') {
    scores.Loses++;
  }
  else scores.Ties++;

  localStorage.setItem('scores', JSON.stringify(scores));

  showResultsPerMove(result, player_move, computer_move);
  updateScoreElement();

}

function showResultsPerMove(result, player_move, computer_move) {
  document.querySelector('.js-result').innerHTML = `${result}`;
  document.querySelector('.js-moves').innerHTML = `You <img class="edit-emoji" src="images/${player_move}-emoji.png" >
    <img class="edit-emoji" src="images/${computer_move}-emoji.png"> Computer.`;
}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins:${scores.Wins}, Losses:${scores.Loses}, Ties:${scores.Ties}`;
}

document.querySelector('.js-reset-score').addEventListener('click', () => {
  showResetConfirmation();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

const confirmResetHTML = `
<p>Are you sure you want to reset the score?</p> 
<button class="edit-yes-no-button js-reset-yes">Yes</button> 
<button class="edit-yes-no-button js-reset-no">No</button>
`;

function showResetConfirmation() {
  document.querySelector('.js-confirm-reset-score').innerHTML = confirmResetHTML;

  document.querySelector('.js-reset-yes').addEventListener('click', () => {
    resetScore();
    document.querySelector('.js-confirm-reset-score').innerHTML = '';
  });

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'y' || event.key === 'Y') {
      resetScore();
      document.querySelector('.js-confirm-reset-score').innerHTML = '';
    }
    else if (event.key === 'n' || event.key === 'N') {
      document.querySelector('.js-confirm-reset-score').innerHTML = '';
    }
  });

  document.querySelector('.js-reset-no').addEventListener('click', () => {
    document.querySelector('.js-confirm-reset-score').innerHTML = '';
  });

}

function resetScore() {
  localStorage.removeItem('scores');
  scores.Wins = 0; scores.Loses = 0; scores.Ties = 0;
  updateScoreElement();
}


