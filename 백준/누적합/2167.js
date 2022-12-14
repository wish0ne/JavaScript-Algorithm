import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const array = [];
for (let i = 1; i <= n; i++) {
  array.push(input[i].split(" ").map(Number));
}

//누적합 구하기
//가로
for (let i = 0; i < n; i++) {
  for (let j = 1; j < m; j++) {
    array[i][j] += array[i][j - 1];
  }
}

//세로
for (let i = 1; i < n; i++) {
  for (let j = 0; j < m; j++) {
    array[i][j] += array[i - 1][j];
  }
}

const k = parseInt(input[n + 1]);

const answer = [];
for (let c = n + 2; c < n + 2 + k; c++) {
  const [i, j, x, y] = input[c].split(" ").map(Number);
  let temp = array[x - 1][y - 1];
  if (j > 1) temp -= array[x - 1][j - 2];
  if (i > 1) temp -= array[i - 2][y - 1];
  if (i > 1 && j > 1) temp += array[i - 2][j - 2];
  answer.push(temp);
}
console.log(answer.join("\n"));

//solve
//누적합 풀이
//브루트포스로 풀어도 시간초과 안나긴 하는데.. 실제 시험에선 그럴리 없으니까 누적합으로 풀자 ㅋ
