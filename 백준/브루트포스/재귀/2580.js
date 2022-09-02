import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const board = [];
for (let i = 0; i < 9; i++) {
  board.push(input[i].split(" ").map(Number));
}

const empty = [];
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === 0) empty.push([i, j]);
  }
}

function fill(count) {
  //스도쿠 완성
  if (count === empty.length) {
    for (let i = 0; i < 9; i++) {
      console.log(board[i].join(" "));
    }
    //✔답을 하나라도 찾으면 바로 백트래킹 종료해야해서 return이 아니라 exit
    process.exit();
  }

  //빈칸에 1~9 다 채워봄
  for (let i = 1; i <= 9; i++) {
    //채울 수 있음
    if (check(empty[count], i)) {
      let [x, y] = empty[count];
      board[x][y] = i;
      fill(count + 1);
      //✔초기화 필수!!
      board[x][y] = 0;
    }
  }
}

function check([x, y], num) {
  //가로 세로 확인
  for (let i = 0; i < 9; i++) {
    if (board[i][y] === num) return false;
    if (board[x][i] === num) return false;
  }
  //한 칸 확인
  let sx = parseInt(x / 3) * 3;
  let sy = parseInt(y / 3) * 3;
  for (let i = sx; i < sx + 3; i++) {
    for (let j = sy; j < sy + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}

fill(0);

//오답 1번 :초기화 안해주고 정답 찾으면 return만 해줘서 백트래킹이 안멈춤
//초기화 안해주면 틀린 값이랑 비교해서 답을 찾을수가 없음~

//해설
//exit 안쓰고도 답 하나만 찾아도 종료할 수 있는 방법 기억해두기
//배열로 중복 검사 (O(1))
const n = 9;
const a = [];
for (let i = 0; i < 9; i++) {
  a.push(input[i].split(" ").map(Number));
}

const c = []; //행 검사
const c2 = []; //열 검사
const c3 = []; //사각형 검사
//실제 숫자 = 인덱스이기 때문에 10칸 (0~9)
for (let i = 0; i < n; i++) {
  c.push(new Array(10).fill(false));
  c2.push(new Array(10).fill(false));
  c3.push(new Array(10).fill(false));
}

function square(x, y) {
  return parseInt(x / 3) * 3 + parseInt(y / 3);
}

//채워져 있는 값들로 검사할 값 먼저 채움
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (a[i][j] !== 0) {
      c[i][a[i][j]] = true; //i행에 숫자 a[i][j]가 있으면 true
      c2[j][a[i][j]] = true; //j열에 숫자 a[i][j]가 있으면 true
      c3[square(i, j)][a[i][j]] = true; //square(i, j)번 정사각형에 숫자 a[i][j]가 있으면 true
    }
  }
}

function go(z) {
  if (z === 81) {
    a.forEach((row) => console.log(row.join(" ")));
    return true;
  }
  //몇번째 칸인지를 가지고 행,열을 구함
  let x = parseInt(z / n); //행
  let y = z % n; //열

  //이미 채워진 칸이면
  if (a[x][y] !== 0) return go(z + 1); //돌아올 필요 없으면 바로 return해줌
  else {
    for (let i = 1; i < 10; i++) {
      if (!c[x][i] && !c2[y][i] && !c3[square(x, y)][i]) {
        c[x][i] = true;
        c2[y][i] = true;
        c3[square(x, y)][i] = true;
        a[x][y] = i;

        if (go(z + 1)) return true; //답을 찾은 상태이므로 바로 return

        a[x][y] = 0;
        c[x][i] = false;
        c2[y][i] = false;
        c3[square(x, y)][i] = false;
      }
    }
  }
  return false; //돌아가야 하는 경우이므로 fasle return
}

go(0);
