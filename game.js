const canvas = document.getElementById('canvas');

const ctx = canvas.getContext('2d');

const userInput = document.getElementById('user-input');

const scoreView = document.getElementById('score');

const containArr = ['type', 'faster', 'go', 'cheese', 'google'];

const check = userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (e.target.value === word.contain) {
      word.caughtCount++;
      scoreView.innerHTML = word.caughtCount;
      word.containChange();
      word.goOnTop();
      userInput.value = '';
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

scoreView.innerHTML = word.caughtCount;


let timer;

let stepCount = 0;

let ticks = 0;

timer = setInterval(game, 250);

game();

function game () {
  ticks++;

  ctx.clearRect(0, 0, 400, 200);

  word.goDown(3);

  ctx.font = '50px serif';

  ctx.fillText(word.contain, word.coords.x, word.coords.y);

  if (word.coords.y >= 200) {
    word.containChange();
    word.goOnTop();
  }
}
