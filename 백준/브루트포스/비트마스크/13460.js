import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = new Array(n);
for (let i = 1; i <= n; i++) board[i - 1] = input[i].trim().split("");

let red = [];
let blue = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "R") red = [i, j];
    else if (board[i][j] === "B") blue = [i, j];
  }
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const INF = 999999999;
let answer = INF;
function move(red, blue, count, prev_tilt) {
  if (count > 9) return -1;
  for (let i = 0; i < 4; i++) {
    if (prev_tilt === i) continue;

    const [new_red, new_blue] = tilt(red, blue, i);
    if (
      new_red[0] === red[0] &&
      new_red[1] === red[1] &&
      new_blue[0] === blue[0] &&
      new_blue[1] === blue[1]
    )
      continue;
    if (new_blue[0] === -1) continue;
    //성공
    if (new_red[0] === -1) {
      answer = Math.min(answer, count + 1);
      continue;
    }
    move(new_red, new_blue, count + 1, i);
  }
  return -1;
}

//기울이기
function tilt(red, blue, i) {
  let [rx, ry] = red;
  let [bx, by] = blue;

  let red_not_move = false;
  let blue_not_move = false;
  while (true) {
    //새로 이동할 구슬의 좌표
    let nrx = rx;
    let nry = ry;
    let nbx = bx;
    let nby = by;

    //red가 구슬에 이미 빠졌으면 이동 불가
    if (rx !== -1) {
      nrx = rx + dx[i];
      nry = ry + dy[i];
    }
    nbx = bx + dx[i];
    nby = by + dy[i];

    if (nrx !== -1) {
      if (board[nrx][nry] === "#") {
        nrx = rx;
        nry = ry;
        red_not_move = true;
      } else if (board[nrx][nry] === "O") {
        nrx = -1;
        nry = -1;
      }
    }

    if (board[nbx][nby] === "#") {
      nbx = bx;
      nby = by;
      blue_not_move = true;
    }
    //파란색 구슬이 빠졌으면 무조건 stop
    if (board[nbx][nby] === "O") {
      bx = -1;
      by = -1;
      break;
    }

    if (nrx === nbx && nry === nby) break; //구슬 두개가 겹칠때
    //구슬 이동
    rx = nrx;
    ry = nry;
    bx = nbx;
    by = nby;
    if (red_not_move && blue_not_move) break; //구슬이 둘다 이동하지 않을때
    if (nrx === -1 && blue_not_move) break; //빨간색 구슬이 빠지고 파란색이 이동할 수 없을때
  }

  return [
    [rx, ry],
    [bx, by],
  ];
}

move(red, blue, 0, -1);
console.log(answer === INF ? -1 : answer);

//경우의 수가 작아서 완전탐색으로 해결
//조건들을 다 채워넣는게 힘들었다... 디버깅 오래걸림
//이럴때는 조건 하나하나씩 적어보고 하나씩 해결해가는게 좋을듯
//오답 1번 : 11회부터 -1을 return해야하므로 현재 count>9 즉 10일때를 체크해야 11이 -1이 나오는데 count>10을 체크해서 실수 ㅠㅠ
//⭐⭐⭐이 실수 자주함!!! 주의하자...

//해설 : 비트마스크
//비트마스크 너무 어렵다...
//참고 : https://velog.io/@wlgns2223/%EB%B0%B1%EC%A4%80-13460-%EA%B5%AC%EC%8A%AC-%ED%83%88%EC%B6%9C2
const LIMIT = 10;
class Result {
  constructor(moved, hole, x, y) {
    this.moved = moved;
    this.hole = hole;
    this.x = x;
    this.y = y;
  }
}

//정수 k를 길이가 10인 4진법 수로 변환
function gen(k) {
  const a = new Array(LIMIT).fill(0); //10번 기울임
  for (let i = 0; i < LIMIT; i++) {
    //k&3 : 어떤 이진수와 연산하면 가장 뒤의 비트 2개가 항상 4가지 중 하나
    //비트 2개로 가능한 숫자는 4개이므로 올바르게 4진법으로 변환가능
    a[i] = k & 3;
    k >>= 2; //다음 이동경로 결정(한 번당 2bit 사용)
  }
  return a;
}

//구슬 이동
//k : 방향
function simulation(a, k, x, y) {
  let n = a.length;
  let m = a[0].length;

  //구슬의 위치가 빈칸이면 종료(하나가 빠져도=빈칸이여도 나머지는 계속 이동가능)
  if (a[x][y] === ".") return new Result(false, false, x, y);

  //구슬 이동 (x,y)->(nx,ny)
  let moved = false;
  while (true) {
    let nx = x + dx[k];
    let ny = y + dy[k];
    //보드는 벽으로 둘러싸여 있기 때문에 삭제해도 되는 조건
    if (nx < 0 || nx >= n || ny < 0 || ny >= m)
      return new Result(moved, false, x, y);

    let ch = a[nx][ny];
    //벽이면 더 이상 이동 불가
    if (ch === "#") return new Result(moved, false, x, y);
    //이동하려는 칸에 구슬이 있어도 이동 불가
    else if ("RB".includes(ch)) return new Result(moved, false, x, y);
    //이동하려는 칸이 빈칸이면 그 칸으로 이동
    else if (ch === ".") {
      [a[x][y], a[nx][ny]] = [a[nx][ny], a[x][y]]; //..R. -> .R..
      x = nx;
      y = ny;
      moved = true;
    }
    //구멍에 빠지는 경우
    else if (ch === "O") {
      a[x][y] = "."; //구슬 변경
      moved = true;
      return new Result(moved, true, x, y);
    }
  }
}

//dirs : 기울이는 방법
function check(a, dirs) {
  let n = a.length;
  let m = a[0].length;

  let hx = 0;
  let hy = 0;
  let rx = 0;
  let ry = 0;
  let bx = 0;
  let by = 0;

  //구멍, 구슬의 위치 파악
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (a[i][j] === "O") {
        hx = i;
        hy = j;
      } else if (a[i][j] === "R") {
        rx = i;
        ry = j;
      } else if (a[i][j] === "B") {
        bx = i;
        by = j;
      }
    }
  }

  let cnt = 0; //이동횟수
  //k번 방향으로 이동(k는 0,1,2,3의 4가지 중 하나)
  for (let k of dirs) {
    cnt += 1;
    let hole1 = false;
    let hole2 = false;
    while (true) {
      let p1 = simulation(a, k, rx, ry); //빨간구슬을 방향 k로 이동
      rx = p1.x;
      ry = p1.y;
      let p2 = simulation(a, k, bx, by); //파란구슬을 방향 k로 이동
      bx = p2.x;
      by = p2.y;

      if (!p1.moved && !p2.moved) break; //두 구슬 다 이동하지 않았을때 종료
      //하나의 구슬만 빠졌을때 종료하지 않는 이유
      //: 하나가 빠진 후 나머지도 빠질 수 있기 때문에 하나 빠졌다고 종료하면 안되고 계속 이동해야함
      if (p1.hole) hole1 = true;
      if (p2.hole) hole2 = true;
    }
    if (hole2) return -1; //파란색 구멍이 빠지면 불가능한 경우
    if (hole1) return cnt; //빨간색만 빠진 경우 이동횟수 return
  }
  return -1;
}

//의미가 없는 방법은 빼고 시뮬레이션
//이전 방향과 같은 방향, 반대 방향은 제외
function valid(dirs) {
  let l = dirs.length;
  for (let i = 0; i < l - 1; i++) {
    if (dirs[i] === 0 && dirs[i + 1] === 1) return false;
    if (dirs[i] === 1 && dirs[i + 1] === 0) return false;
    if (dirs[i] === 2 && dirs[i + 1] === 3) return false;
    if (dirs[i] === 3 && dirs[i + 1] === 2) return false;
    if (dirs[i] === dirs[i + 1]) return false;
  }
  return true;
}

let ans = -1;
//이동방법의 모든 경우의 수 k를 비트마스크로 설정 (2^20가지)
for (let k = 0; k < 1 << (LIMIT * 2); k++) {
  //방법으로 변환 (크기가 10인 4진법 수 생성)
  //각 경우의 수에 대해서 10번을 어떻게 굴릴지 미리 정함
  //k번째 이동 방법 : gen(k) = dir
  let dirs = gen(k);

  if (!valid(dirs)) continue;

  const a = [...board];
  for (let i = 0; i < n; i++) a[i] = [...board[i]];

  let cur = check(a, dirs); //dirs에 따라 이동하는것 체크
  if (cur === -1) continue; //불가능하면 넘어감
  if (ans === -1 || ans > cur) ans = cur; //가능하면 최소값 구함
}

console.log(ans);
