import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const map = new Array(n);
for (let i = 1; i <= n; i++) map[i - 1] = input[i].split(" ").map(Number);

const candy = new Array(n);
for (let i = 0; i < n; i++) candy[i] = new Array(m).fill(-1);
candy[0][0] = map[0][0];

function go(x, y) {
  if (x < 0 || x >= n || y < 0 || y >= m) return -1;
  if (candy[x][y] !== -1) return candy[x][y];
  candy[x][y] =
    Math.max(go(x - 1, y), go(x, y - 1), go(x - 1, y - 1)) + map[x][y];
  return candy[x][y];
}

go(n - 1, m - 1);
console.log(candy[n - 1][m - 1]);

//처음에는 재귀만 생각나서 계속 시간초과 남
//이 문제를 작은 문제로 분할해서 풀 수 있다는 걸 알기 어려웠음 ㅠㅠ
//분할정복이랑 DP 개념에 익숙해지자...! 점화식을 꼭 생각해보자...!

//해설
//방법 1
//D[i][j] : (1,1)에서 출발해서 (i, j)로 이동했을때 가져올 수 있는 최대 사탕 개수
//(i, j)가 어디서 왔는지 집중
const a = new Array(n + 1);
for (let i = 0; i < n + 1; i++) {
  if (i === 0) a[i] = new Array(m + 1).fill(0);
  else {
    a[i] = [0].concat(input[i].split(" ").map(Number));
  }
}
let d = new Array(n + 1);
for (let i = 0; i < n + 1; i++) d[i] = new Array(m + 1).fill(0);

//i-1, j-1 범위 검사 안해도됨 : 배열을 padding값까지 생성, padding값을 0으로 초기화해서 최대값이 있으면 최대값, 모두 0이면 0이 나오도록 함
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    d[i][j] = Math.max(d[i - 1][j], d[i][j - 1], d[i - 1][j - 1]) + a[i][j];
  }
}
console.log(d[n][m]);

//방법 2
//D[i][j] : (1,1)에서 출발해서 (i, j)로 이동했을때 가져올 수 있는 최대 사탕 개수
//(i, j)에서 어디를 갈 수 있는가?에 집중
d = new Array(n + 1);
for (let i = 0; i < n + 1; i++) d[i] = new Array(m + 1).fill(0);
d[1][1] = a[1][1];
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    //d[i][j+1]에 다른 값이 있을수도(다른 칸에서 온 경우) -> max로 비교해야함
    if (j + 1 <= m) d[i][j + 1] = Math.max(d[i][j + 1], d[i][j] + a[i][j + 1]);
    if (i + 1 <= n) d[i + 1][j] = Math.max(d[i + 1][j], d[i][j] + a[i + 1][j]);
    if (i + 1 <= n && j + 1 <= m)
      d[i + 1][j + 1] = Math.max(d[i + 1][j + 1], d[i][j] + a[i + 1][j + 1]);
  }
}
console.log(d[n][m]);

//방법3
//대각선 이동은 처리하지 않아도 됨
//항상 칸의 숫자가 0이상이므로 많은 칸을 방문해서 갈수록 유리 (오른쪽->아래 >= 대각선)
d = new Array(n + 1);
for (let i = 0; i < n + 1; i++) d[i] = new Array(m + 1).fill(0);

for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    d[i][j] = Math.max(d[i - 1][j], d[i][j - 1]) + a[i][j];
  }
}
console.log(d[n][m]);

//방법4
//재귀를 이용한 top down방식으로 구현
d = new Array(n + 1);
for (let i = 0; i < n + 1; i++) d[i] = new Array(m + 1).fill(-1);

//top down에서 재귀함수의 역할 : 칸 하나를 채우는 것
function go2(i, j) {
  if (i < 1 || j < 1) return 0;
  if (d[i][j] >= 0) return d[i][j]; //memoization
  d[i][j] = Math.max(go2(i - 1, j), go2(i, j - 1)) + a[i][j];
  return d[i][j];
}
console.log(go2(n, m));

//방법5
//점화식 변경 : d[i][j] = (i, j)에서 시작해서 (n, m)까지 도착했을때 가져올 수 있는 최대 사탕 개수
//도착이 정해져있고 시작을 이동시키는 방식 (이전까지는 시작이 정해져있고 도착을 이동시키는 방식)
d = new Array(n + 1);
for (let i = 0; i < n + 1; i++) d[i] = new Array(m + 1).fill(-1);
function go3(i, j) {
  if (i > n || j > m) return 0;
  if (d[i][j] >= 0) return d[i][j];
  d[i][j] = Math.max(go3(i + 1, j), go3(i, j + 1)) + a[i][j];
  return d[i][j];
}
console.log(go3(1, 1));
