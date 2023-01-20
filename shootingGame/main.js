/* 캔버스 세팅 */
let canvas;
let ctx;

canvas = document.createElement('canvas');
ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let gameOver = false;
let score = 0;

/* 렌더링 세팅 */
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 80;

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = './img/background.jpg';

  spaceshipImage = new Image();
  spaceshipImage.src = './img/spaceship (1).png';

  bulletImage = new Image();
  bulletImage.src = './img/bullet.png';

  enemyImage = new Image();
  enemyImage.src = './img/monster.png';

  gameOverImage = new Image();
  gameOverImage.src = './img/gameover.jpg';
}

/* 총알 기능 */
let bulletList = [];
function Bullet() {
  this.x = 0;
  this.y = 0;

  this.init = () => {
    this.x = spaceshipX + 20;
    this.y = spaceshipY;
    this.alive = true;

    bulletList.push(this);
  };

  this.update = () => {
    this.y -= 5;
    // if (this.y < 0) {
    //   bulletList.splice(this.index, 1);
    // }
  };

  this.checkHit = () => {
    for (let i = 0; i < enemyList.length; i++) {
      if (
        this.y <= enemyList[i].y &&
        this.x >= enemyList[i].x &&
        this.x <= enemyList[i].x + 45
      ) {
        score++;
        this.alive = false;
        enemyList.splice(i, 1);
      }
    }
  };
}

/* 랜덤 구현 */
function generateRandomValue(min, max) {
  let randomNum = Math.floor(Math.random() * (max - min) + min);
  return randomNum;
}

/* 적 구현 */
let enemyList = [];
function Enemy() {
  this.x = 0;
  this.y = 0;

  this.init = () => {
    this.y = 0;
    this.x = generateRandomValue(0, canvas.width - 48);
    enemyList.push(this);
  };

  this.update = () => {
    this.y += 2;
    console.log(this.y);

    if (this.y >= canvas.height - 49) {
      gameOver = true;
    }
  };
}

/* 키보드 입력 핸들러 */
let keysDown = {};
function setKeyboardListener() {
  document.addEventListener('keydown', (event) => {
    keysDown[event.keyCode] = true;
    console.log('키값', keysDown);
  });

  document.addEventListener('keyup', (event) => {
    delete keysDown[event.keyCode];

    if (event.keyCode === 32) {
      createBullet(); // 총알 생성
    }
  });
}

function createBullet() {
  console.log('총알생성');
  let b = new Bullet();
  b.init();
  console.log('리스트', bulletList);
}

function createEnemy() {
  const interval = setInterval(() => {
    let e = new Enemy();
    e.init();
  }, 1000);
}

function update() {
  if (39 in keysDown) {
    spaceshipX += 3;
  }
  if (37 in keysDown) {
    spaceshipX -= 3;
  }
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      bulletList[i].update();
      bulletList[i].checkHit();
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].update();
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`SCORE: ${score}`, 20, 30);
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';

  for (let i = 0; i < bulletList.length; i++) {
    if (bulletList[i].alive) {
      ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
  }

  for (let i = 0; i < enemyList.length; i++) {
    ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
  }
}

function main() {
  if (!gameOver) {
    update();
    render();
    requestAnimationFrame(main);
  } else {
    ctx.drawImage(gameOverImage, 10, 200, 380, 180);
  }
}

loadImage();
setKeyboardListener();
createEnemy();
main();
