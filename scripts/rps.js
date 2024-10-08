let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };
}
*/

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }

  const buttonElement = document.querySelector('.auto');

  if (buttonElement.innerText === 'Auto Play') {
    buttonElement.innerHTML = 'Stop Play';
  } else {
    buttonElement.innerHTML = 'Auto Play';
  }
}

document.querySelector('.scissors-button')
  .addEventListener('cilck', () => {
    playGame('Scissors');
  });

  document.querySelector('.rock-button')
  .addEventListener('cilck', () => {
    playGame('Rock');
  });

  document.querySelector('.paper-button')
  .addEventListener('cilck', () => {
    playGame('paper');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
     playGame('Rock');
  } else if (event.key === 'p') {
   playGame('Paper');
} else if (event.key === 's') {
 playGame('Scissors');
} else if (event.key === 'Delete') {
  resetGame();
} else if (event.key === 'a') {
  autoPlay();
}
});


function resetGame() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  document.querySelector('.js-result').innerHTML = '';
  document.querySelector('.js-moves').innerHTML = '';
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'Scissors') {
    if (computerMove === 'Rock') {
      result = 'You lose.';
    } else if (computerMove === 'Paper') {
      result = 'You win.';
    } else if (computerMove === 'Scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'Paper') {
    if (computerMove === 'Rock') {
      result = 'You win.';
    } else if (computerMove === 'Paper') {
      result = 'Tie.';
    } else if (computerMove === 'Scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'Rock') {
    if (computerMove === 'Rock') {
      result = 'Tie.';
    } else if (computerMove === 'Paper') {
      result = 'You lose.';
    } else if (computerMove === 'Scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You: 
<img src="imgs/${playerMove}-emoji.png" class="rps-emoji">
<br>
Computer:
<img src="imgs/${computerMove}-emoji.png" class="rps-emoji">`;

}

function updateScoreElement() {
  document.querySelector('.js-score-wins')
    .innerHTML = `Wins: ${score.wins}`;
  document.querySelector('.js-score-losses')
    .innerHTML = `Losses: ${score.losses}`;
  document.querySelector('.js-score-ties')
    .innerHTML = `Ties: ${score.ties}`
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }

  return computerMove;
}
