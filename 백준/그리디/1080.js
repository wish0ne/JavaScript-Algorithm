import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const a = [];
const b = [];
//😡trim을 안해주면 마지막에 0이 추가된다
for (let i = 1; i <= n; i++) a.push(input[i].trim().split("").map(Number));
for (let i = n + 1; i <= n + n; i++)
  b.push(input[i].trim().split("").map(Number));

let count = 0;
for (let i = 0; i <= n - 3; i++) {
  for (let j = 0; j <= m - 3; j++) {
    //(i, j)에서 3x3
    if (!check(i, j)) {
      convert(i, j);
      count += 1;
    }
  }
}
final_check(a, b) !== -1 ? console.log(count) : console.log(-1);

function final_check(a, b) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (a[i][j] !== b[i][j]) return -1;
    }
  }
  return true;
}

function convert(i, j) {
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      a[i + x][j + y] === 1 ? (a[i + x][j + y] = 0) : (a[i + x][j + y] = 1);
    }
  }
}

function check(i, j) {
  if (a[i][j] !== b[i][j]) return false;
  return true;
}

//오답 1번 : n이나 m이 3보다 작다고 무조건 -1이 아니였다;; 처음부터 같으면 0을 return해야함
//https://www.acmicpc.net/board/view/77533
//이런걸 어떻게 알아내~

//해설
const [N, M] = input[0].split(" ").map(Number);
const A = [];
const B = [];
for (let i = 1; i <= N; i++) A.push(input[i].trim().split("").map(Number));
for (let i = N + 1; i <= N + N; i++)
  B.push(input[i].trim().split("").map(Number));

let ans = 0;
//맨 앞칸이 다르면 연산 수행
for (let i = 0; i < N - 2; i++) {
  for (let j = 0; j < M - 2; j++) {
    if (A[i][j] !== B[i][j]) {
      ans += 1;
      flip(i + 1, j + 1);
    }
  }
}

//시간복잡도 그다지 차이나지 않으므로 전체 비교
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (A[i][j] !== B[i][j]) {
      console.log(-1);
      process.exit();
    }
  }
}
console.log(ans);

//(x-1, y-1)~(x+1, y+1) 9칸 변경
function flip(x, y) {
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      A[i][j] = 1 - A[i][j];
    }
  }
}
