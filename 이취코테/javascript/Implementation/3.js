import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

let [n, m] = input[0].split(" ").map(Number);
let [a, b, d] = input[1].split(" ").map(Number);

// 2차원 배열 입력받기💢💢💢
let gameMap = [];
for (let i = 0; i < n; i++) {
  gameMap.push(input[i + 2].split(" ").map(Number));
}

// 북 동 남 서
const dy = [0, 1, 0, -1];
const dx = [-1, 0, 1, 0];

let nextX = a;
let nextY = b;
let nextD = d;

let fail = 0;
let count = 1;

//처음 칸 방문처리
gameMap[a][b] = -1;

while (true) {
  nextD = d === 0 ? 3 : d - 1;
  nextX = a + dx[d];
  nextY = b + dy[d];

  if (gameMap[nextX][nextY] === 1 || gameMap[nextX][nextY] === -1) {
    fail += 1;
  } else {
    a = nextX;
    b = nextY;
    fail = 0;
    gameMap[a][b] = -1;
    count += 1;
  }

  if (fail === 4) {
    a -= 1;
    fail = 0;
    if (gameMap[a][b] === 1) {
      break;
    }
  } else {
    d = nextD;
  }
}

console.log(count);
