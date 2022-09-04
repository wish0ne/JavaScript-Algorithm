import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [r, c] = input[0].split(" ").map(Number);
const board = [];
for (let i = 1; i <= r; i++) board.push(input[i].trim().split(""));

let max = 0;
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];
const visited = new Array(26).fill(false); //알파벳 중복 검사
function go(x, y, count) {
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (nx < 0 || nx >= r || ny < 0 || ny >= c) continue;
    let aToN = board[nx][ny].charCodeAt(0) - "A".charCodeAt(0);
    if (visited[aToN]) {
      max = Math.max(max, count);
      continue;
    }
    visited[aToN] = true;
    go(nx, ny, count + 1);
    visited[aToN] = false;
  }
  return;
}
visited[board[0][0].charCodeAt(0) - "A".charCodeAt(0)] = true; //시작값 방문처리하는거 잊지말기
go(0, 0, 1);
console.log(max);

//solve
//쉬운 문제였는데 max값 갱신할때 return해버려서 계속 이상한 답 나왔음🥺

//해설
//ans+1을 return, 매번 재귀돌때 ans=0에서 시작 -> 1씩 더해지면서 돌아옴 = 개수
const [n, m] = input[0].split(" ").map(Number);
const board2 = [];
for (let i = 1; i <= n; i++) board2.push(input[i].trim().split(""));
const check = new Array(26).fill(false);
check[board2[0][0].charCodeAt(0) - "A".charCodeAt(0)] = true;
console.log(go2(board2, check, 0, 0));

function go2(board, check, x, y) {
  let ans = 0;
  for (let k = 0; k < 4; k++) {
    let nx = x + dx[k];
    let ny = y + dy[k];
    if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
      let ch = board[nx][ny].charCodeAt(0) - "A".charCodeAt(0);
      if (!check[ch]) {
        check[ch] = true;
        let temp = go2(board, check, nx, ny);
        if (ans < temp) ans = temp;
        check[ch] = false;
      }
    }
  }
  return ans + 1;
}
