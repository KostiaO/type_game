const alf = 'abcdefghijklmnopqrstuvwxyz';

const delay = 25;

const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const canvasBlock = document.getElementById('canvas-block');

const userInput = document.getElementById('user-input');

const scoreView = document.getElementById('score');

const endPart = document.getElementById('endofgame');

const containArr = Array(50).fill(1).map(_ => {

  const indx = Math.floor(Math.random() * alf.length);

  const generatedWord = alf.slice(indx, indx + Math.floor(Math.random() * 10));

  return generatedWord;
});

const check = userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (e.target.value === word.contain) {
      if (word.coords.y < 160) {
        if (word.contain.length >= 6) {
          word.caughtCount += 2;
        } else {
          word.caughtCount++;
        }
        word.containChange();
        word.goOnTop();
        userInput.value = '';
      }
    }
  }
});

const word = {
  coords: {
    x: 0,
    y: 0
  },

  contain: 'First',

  caughtCount: 0,

  scorePlus() {
    if (this.contain.length >= 6) {
      this.caughtCountc += 2; 
    } else {
      this.caughtCount++;
    }
  },

  get color() {
    return this.contain.length >= 6 ?
      'yellow' : 
        'black'
  },

  goDown (step) {
    this.coords.y += step;
  },

  goOnTop() {
    this.coords.y = 0;
  },

  containChange() {
    this.contain = containArr[Math.floor(Math.random() * containArr.length)]
  }
};

let timer;

let stepCount = 0;

let ticks = 0;

timer = setInterval(game, delay);



game();

function game () {

  if (ticks * delay >= 20000) {
    clearInterval(timer);
    canvasBlock.classList.add('canvas-block--empty');
    userInput.classList.add('user-input--empty');
    endPart.classList.add('endgame--visible');
    scoreView.innerHTML = `Score: ${word.caughtCount}`;
  }

  ticks++;

  ctx.clearRect(0, 0, 400, 200);

  word.goDown(1);

  ctx.font = '20px serif';

  ctx.fillStyle = word.color;

  ctx.fillText(word.contain, word.coords.x, word.coords.y);

  if (word.coords.y >= 200) {
    word.containChange();
    word.goOnTop();
  }
}


function retry() {
  canvasBlock.classList.remove('canvas-block--empty');
  userInput.classList.remove('user-input--empty');
  endPart.classList.remove('endgame--visible');

  word.caughtCount = 0;
  word.containChange();
  word.goOnTop();

  ticks = 0;

  timer = setInterval(game, delay);
}