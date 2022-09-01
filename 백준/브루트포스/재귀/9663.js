import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const board = new Array(n);
for (let i = 0; i < n; i++) board[i] = new Array(n).fill(false);

//한 행에 하나의 퀸
//각 행에 어떤 열에 놓을지를 결정해야함
//모든 행에 놓을 수 없음 -> 불가능한 경우 -> 이전 퀸으로 돌아가야함
//마지막 행까지 놓음 -> 가능한 경우의 수 + 1

let count = 0;
function go(x, y) {
  //세로 검사
  for (let j = 0; j < x; j++) {
    //세로 겹침 : 실패
    if (board[j][y]) return;
  }
  //대각선 검사
  let a = x;
  let b = y;
  let c = 1;

  while (a - c >= 0 && b - c >= 0) {
    if (board[a - c][b - c]) return;
    c += 1;
  }
  c = 1;
  while (a - c >= 0 && b + c < n) {
    if (board[a - c][b + c]) return;
    c += 1;
  }
  //필요없는 부분...
  // c = 1;
  // while (a + c < n && b - c >= 0) {
  //   if (board[a + c][b - c]) return;
  //   c += 1;
  // }
  // c = 1;
  // while (a + c < n && b + c < n) {
  //   if (board[a + c][b + c]) return;
  //   c += 1;
  // }

  //경우의 수 + 1
  if (x === n - 1) {
    count += 1;
    return;
  }

  //각 행에서 모든 열에 놓아봄 : board[x][i]
  for (let i = 0; i < n; i++) {
    board[x + 1][i] = true;
    go(x + 1, i);
    board[x + 1][i] = false;
  }
}

go(-1, 0);
console.log(count);

//시간초과 1번 : 세로 먼저 다 확인하고 -> 대각선 확인하는게 효율적인데 세로 가능할때마다 대각선 확인해서 시간초과남
//백트래킹 그냥 dfs랑 동일한 로직인데 괜히 어렵다...!! 푸는데 짱 오래걸림
//해설들으면서 안거... : 대각선 확인할때 아래는 확인할 필요가 없다... 위에서부터 놓기 때문에..! 바보같음;

//해설
//열, 대각선을 체크할때 배열을 활용해서 시간복잡도를 O(1)로 만듦
//대각선 확인하는 방법 알아두자 / 배열 확인하는 방법 알아두잘
const a = new Array(n);
for (let i = 0; i < n; i++) a[i] = new Array(n).fill(false);
const check_col = new Array(n).fill(false); //열 확인 배열
const check_dig = new Array(n * 2 - 1).fill(false); // / 대각선 확인 배열
const check_dig2 = new Array(n * 2 - 1).fill(false); // \ 대각선 확인 배열

//현재 행, 대각선에 다른 퀸이 이미 있는지 확인
function check(row, col) {
  if (check_col[col]) return false;
  if (check_dig[row + col]) return false;
  if (check_dig2[row - col + n - 1]) return false;
  return true;
}

function calc(row) {
  if (row === n) return 1;
  let ans = 0;
  //row행에 있는 퀸의 위치는 col열
  for (let col = 0; col < n; col++) {
    //이 col에 퀸이 올 수 있는지 확인
    if (check(row, col)) {
      //퀸 놓음 처리
      check_dig[row + col] = true;
      check_dig2[row - col + n - 1] = true;
      check_col[col] = true;
      //실제로 퀸 놓음
      a[row][col] = true;
      ans += calc(row + 1); //다음 행에 퀸 놓음
      //원상복구
      check_dig[row + col] = false;
      check_dig2[row - col + n - 1] = false;
      check_col[col] = false;
      a[row][col] = false;
    }
  }
  return ans;
}

console.log(calc(0));
