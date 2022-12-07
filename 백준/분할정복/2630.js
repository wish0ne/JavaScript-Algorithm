import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].split(" ").map(Number));

let white = 0;
let blue = 0;

function solve(x, y, len) {
  //console.log(x1, y1, x2, y2);
  if (check(x, y, len)) {
    if (board[x][y] === 1) blue += 1;
    else white += 1;
    return;
  } else {
    solve(x, y, len / 2);
    solve(x, y + len / 2, len / 2);
    solve(x + len / 2, y, len / 2);
    solve(x + len / 2, y + len / 2, len / 2);
  }
}
solve(0, 0, n);
console.log(white);
console.log(blue);

function check(x, y, len) {
  let value = board[x][y];
  for (let i = x; i < x + len; i++) {
    for (let j = y; j < y + len; j++) {
      if (board[i][j] !== value) return false;
    }
  }
  return true;
}

//solve
//인덱스 설정이 헷갈려서 좀 오래걸렸다. 좌표 4개 지정할 필요없이 시작좌표랑 길이만 알면됨
