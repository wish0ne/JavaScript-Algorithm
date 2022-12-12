import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [r, c, t] = input[0].split(" ").map(Number);
const home = [];
for (let i = 1; i <= r; i++) home.push(input[i].split(" ").map(Number));

//공기청정기 위치
const air = [];
for (let i = 0; i < r; i++) {
  if (home[i][0] === -1) {
    air.push(i);
    air.push(i + 1);
    break;
  }
}

//우상좌하
const dx = [0, -1, 0, 1];
const dy = [1, 0, -1, 0];

//확산
function diffusion() {
  let temp = new Array(r);
  for (let i = 0; i < r; i++) temp[i] = new Array(c);
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      temp[i][j] = home[i][j];
    }
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let count = 0;
      for (let k = 0; k < 4; k++) {
        let nx = i + dx[k];
        let ny = j + dy[k];
        if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
        if (home[nx][ny] === -1) continue;
        temp[nx][ny] += parseInt(home[i][j] / 5);
        count += 1;
      }
      temp[i][j] -= parseInt(home[i][j] / 5) * count;
    }
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      home[i][j] = temp[i][j];
    }
  }
}

//공기청정기 작동
function on() {
  //위쪽 반시계
  //1. 오른쪽
  let next = 0;
  for (let j = 1; j < c; j++) {
    let temp = home[air[0]][j];
    home[air[0]][j] = next;
    next = temp;
  }
  //2. 위쪽
  for (let i = air[0] - 1; i >= 0; i--) {
    let temp = home[i][c - 1];
    home[i][c - 1] = next;
    next = temp;
  }
  //3. 왼쪽
  for (let j = c - 2; j >= 0; j--) {
    let temp = home[0][j];
    home[0][j] = next;
    next = temp;
  }
  //4. 아래
  for (let i = 1; i < air[0]; i++) {
    let temp = home[i][0];
    home[i][0] = next;
    next = temp;
  }

  //아래쪽 시계
  next = 0;
  //오른쪽
  for (let j = 1; j < c; j++) {
    let temp = home[air[1]][j];
    home[air[1]][j] = next;
    next = temp;
  }
  //4. 아래
  for (let i = air[1] + 1; i < r; i++) {
    let temp = home[i][c - 1];
    home[i][c - 1] = next;
    next = temp;
  }
  //3. 왼쪽
  for (let j = c - 2; j >= 0; j--) {
    let temp = home[r - 1][j];
    home[r - 1][j] = next;
    next = temp;
  }
  //2. 위쪽
  for (let i = r - 2; i > air[1]; i--) {
    let temp = home[i][0];
    home[i][0] = next;
    next = temp;
  }
}

function print() {
  for (let i = 0; i < r; i++) console.log(home[i]);
  console.log("\n");
}

function count() {
  let answer = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      answer += home[i][j];
    }
  }
  return answer;
}

//t초 동안 반복
for (let i = 0; i < t; i++) {
  diffusion();
  //print();
  on();
  //print();
}
console.log(count() + 2);

//solve
//열심히...노가다...^^
//인덱스 맞추는거 넘 못함 ㅋㅋ ㅜ
