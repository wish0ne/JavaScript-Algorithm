import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const board = new Array(n);
for (let i = 0; i < n; i++) board[i] = new Array(n).fill(0);

//✔우선순위가 같을때 행이 작은거, 열이 작은거부터 하려면 dx dy 배열 순서를 그렇게 지정해줘야함
const dx = [-1, 0, 0, 1];
const dy = [0, -1, 1, 0];

const students = [];
for (let i = 1; i <= n * n; i++) {
  const [number, ...lovers] = input[i].split(" ").map(Number);
  findPlace(number, lovers);
  students.push([number, lovers]);
}
let answer = 0;
students.forEach((student) => {
  const [number, lovers] = student;
  const [x, y] = findStudent(number);
  answer += calcScore(x, y, lovers);
});

console.log(answer);

function findPlace(number, lovers) {
  //✔런타임에러 이것때문인듯? x, y 초기값을 -1, -1으로 하고 max를 0, 0로 해서 갱신안된거 있었을듯
  let [x, y] = [0, 0];
  let [maxLove, maxEmpty] = [-1, -1];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //해당 칸에 인접한 칸 조사
      if (board[i][j] !== 0) continue;
      let love = 0;
      let empty = 0;
      for (let k = 0; k < 4; k++) {
        let nx = i + dx[k];
        let ny = j + dy[k];
        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;

        if (board[nx][ny] === 0) empty += 1;
        else if (lovers.includes(board[nx][ny])) love += 1;
      }
      if (maxLove < love || (maxLove === love && maxEmpty < empty)) {
        x = i;
        y = j;
        maxLove = love;
        maxEmpty = empty;
      }
    }
  }
  board[x][y] = number;
}

function findStudent(number) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === number) return [i, j];
    }
  }
}

function calcScore(x, y, lovers) {
  let love = 0;
  for (let k = 0; k < 4; k++) {
    let nx = x + dx[k];
    let ny = y + dy[k];
    if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
    if (lovers.includes(board[nx][ny])) love += 1;
  }
  if (love === 0) return 0;
  if (love === 1) return 1;
  if (love === 2) return 10;
  if (love === 3) return 100;
  if (love === 4) return 1000;
}

//solve
//요구사항이 어려워보이지만 그대로 따라하면 풀수있는 구현문제
//런타임 에러 발생 시 디버깅 -> 배열에 접근하는 좌표값 확인하기
