import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

let idx = 0;
let count = 0;
while (true) {
  if (parseInt(input[idx]) === 0) break;
  count += 1;
  let n = parseInt(input[idx]); //채워져있는 도미노의 개수

  //도미노 사용 체크 배열
  const visited = [];
  for (let i = 0; i < 10; i++) visited.push(new Array(10).fill(false));
  for (let i = 0; i < 10; i++) {
    visited[i][i] = true;
    visited[i][0] = true;
    visited[0][i] = true;
  }

  //스도쿠 판
  const board = [];
  for (let i = 0; i < 9; i++) board.push(new Array(9).fill(0));

  //스도쿠 검사 배열
  const row_check = [];
  const col_check = [];
  const square_check = [];
  for (let i = 0; i < 9; i++) {
    row_check.push(new Array(10).fill(false));
    col_check.push(new Array(10).fill(false));
    square_check.push(new Array(10).fill(false));
  }

  //도미노 입력
  for (let i = idx + 1; i <= idx + n; i++) {
    const [u, lu, v, lv] = input[i].split(" ");
    let row1 = lu.split("")[0].charCodeAt(0) - "A".charCodeAt(0);
    let col1 = parseInt(lu.split("")[1]);
    let row2 = lv.split("")[0].charCodeAt(0) - "A".charCodeAt(0);
    let col2 = parseInt(lv.split("")[1]);
    visited[u][v] = true;
    visited[v][u] = true;
    board[row1][col1 - 1] = parseInt(u);
    board[row2][col2 - 1] = parseInt(v);
    row_check[row1][u] = true;
    row_check[row2][v] = true;
    col_check[col1 - 1][u] = true;
    col_check[col2 - 1][v] = true;
    square_check[parseInt(row1 / 3) * 3 + parseInt((col1 - 1) / 3)][u] = true;
    square_check[parseInt(row2 / 3) * 3 + parseInt((col2 - 1) / 3)][v] = true;
  }

  //숫자 입력
  const numbers = input[idx + n + 1].split(" ");
  numbers.forEach((number, idx) => {
    let row = number.split("")[0].charCodeAt(0) - "A".charCodeAt(0);
    let col = parseInt(number.split("")[1]);
    board[row][col - 1] = idx + 1;
    row_check[row][idx + 1] = true;
    col_check[col - 1][idx + 1] = true;
    square_check[parseInt(row / 3) * 3 + parseInt((col - 1) / 3)][
      idx + 1
    ] = true;
  });

  //백트래킹
  backtracking(0, 0);

  console.log(`Puzzle ${count}`);
  for (let i = 0; i < 9; i++) {
    console.log(board[i].join(""));
  }

  idx += n + 2;

  function backtracking(i, j) {
    //종료
    if (i === 8 && j === 9) {
      return true;
    }

    if (j === 9) {
      i += 1;
      j = 0;
    }

    //이미 채워져있는 경우
    if (board[i][j] !== 0) return backtracking(i, j + 1);
    //가능한 도미노 모두 채워넣기 (회전가능)
    else {
      for (let x = 1; x < 10; x++) {
        for (let y = x; y < 10; y++) {
          if (!visited[x][y]) {
            //x y 도미노 타일
            //회전가능한 4가지 경우
            //1) (i, j) = x, (i, j+1) = y;
            if (j + 1 < 9 && board[i][j + 1] === 0) {
              if (check(i, j, x) && check(i, j + 1, y)) {
                //가능한 경우
                board[i][j] = x;
                board[i][j + 1] = y;

                visited[x][y] = true;
                visited[y][x] = true;

                row_check[i][x] = true;
                col_check[j][x] = true;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][x] = true;

                row_check[i][y] = true;
                col_check[j + 1][y] = true;
                square_check[parseInt(i / 3) * 3 + parseInt((j + 1) / 3)][
                  y
                ] = true;

                let flag;
                flag = backtracking(i, j + 1);
                if (flag) return true;

                board[i][j] = 0;
                board[i][j + 1] = 0;
                visited[x][y] = false;
                visited[y][x] = false;
                row_check[i][x] = false;
                col_check[j][x] = false;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][x] = false;
                row_check[i][y] = false;
                col_check[j + 1][y] = false;
                square_check[parseInt(i / 3) * 3 + parseInt((j + 1) / 3)][
                  y
                ] = false;
              }
            }
            //2) (i, j) = x, (i+1, j) = y;
            if (i + 1 < 9 && board[i + 1][j] === 0) {
              if (check(i, j, x) && check(i + 1, j, y)) {
                //가능한 경우
                board[i][j] = x;
                board[i + 1][j] = y;
                visited[x][y] = true;
                visited[y][x] = true;
                row_check[i][x] = true;
                col_check[j][x] = true;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][x] = true;
                row_check[i + 1][y] = true;
                col_check[j][y] = true;
                square_check[parseInt((i + 1) / 3) * 3 + parseInt(j / 3)][
                  y
                ] = true;
                let flag;
                flag = backtracking(i, j + 1);
                if (flag) return true;
                board[i][j] = 0;
                board[i + 1][j] = 0;
                visited[x][y] = false;
                visited[y][x] = false;
                row_check[i][x] = false;
                col_check[j][x] = false;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][x] = false;
                row_check[i + 1][y] = false;
                col_check[j][y] = false;
                square_check[parseInt((i + 1) / 3) * 3 + parseInt(j / 3)][
                  y
                ] = false;
              }
            }
            //3) (i, j) = y, (i, j+1) = x;
            if (j + 1 < 9 && board[i][j + 1] === 0) {
              if (check(i, j, y) && check(i, j + 1, x)) {
                //가능한 경우
                board[i][j] = y;
                board[i][j + 1] = x;
                visited[x][y] = true;
                visited[y][x] = true;
                row_check[i][y] = true;
                col_check[j][y] = true;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][y] = true;
                row_check[i][x] = true;
                col_check[j + 1][x] = true;
                square_check[parseInt(i / 3) * 3 + parseInt((j + 1) / 3)][
                  x
                ] = true;
                let flag;
                flag = backtracking(i, j + 1);
                if (flag) return true;
                board[i][j] = 0;
                board[i][j + 1] = 0;
                visited[x][y] = false;
                visited[y][x] = false;
                row_check[i][y] = false;
                col_check[j][y] = false;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][y] = false;
                row_check[i][x] = false;
                col_check[j + 1][x] = false;
                square_check[parseInt(i / 3) * 3 + parseInt((j + 1) / 3)][
                  x
                ] = false;
              }
            }
            //4) (i, j) = y, (i+1, j) = x;
            if (i + 1 < 9 && board[i + 1][j] === 0) {
              if (check(i, j, y) && check(i + 1, j, x)) {
                //가능한 경우
                board[i][j] = y;
                board[i + 1][j] = x;
                visited[x][y] = true;
                visited[y][x] = true;
                row_check[i][y] = true;
                col_check[j][y] = true;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][y] = true;
                row_check[i + 1][x] = true;
                col_check[j][x] = true;
                square_check[parseInt((i + 1) / 3) * 3 + parseInt(j / 3)][
                  x
                ] = true;
                let flag;
                flag = backtracking(i, j + 1);
                if (flag) return true;
                board[i][j] = 0;
                board[i + 1][j] = 0;
                visited[x][y] = false;
                visited[y][x] = false;
                row_check[i][y] = false;
                col_check[j][y] = false;
                square_check[parseInt(i / 3) * 3 + parseInt(j / 3)][y] = false;
                row_check[i + 1][x] = false;
                col_check[j][x] = false;
                square_check[parseInt((i + 1) / 3) * 3 + parseInt(j / 3)][
                  x
                ] = false;
              }
            }
          }
        }
      }
      return false;
    }
  }

  function check(x, y, num) {
    //행 검사
    if (row_check[x][num]) return false;
    //열 검사
    if (col_check[y][num]) return false;
    //사각형 검사
    if (square_check[parseInt(x / 3) * 3 + parseInt(y / 3)][num]) return false;
    return true;
  }
}

//solve
//인덱스 때문에 디버깅하느라 3시간 걸림...
//visited는 i,j가 아니라 x,y쓰는거랑, 사각형 검사할때 괄호때문에;;
//구현문제는 디버깅에 너무 오래 걸리는 문제 -> 정신 똑바로차리자..
//디버깅은 처음부터 차근차근 읽어보는게 빠른듯

//해설
let n = 9;
let dx = [0, 1];
let dy = [1, 0];

let tc = 1;
let index = 0;
while (true) {
  //스도쿠 중복 체크 배열
  const c = []; //행
  const c2 = []; //열
  const c3 = []; //사각형
  const domino = []; //도미노 사용 체크 배열
  for (let i = 0; i < 10; i++) {
    c.push(new Array(10).fill(false));
    c2.push(new Array(10).fill(false));
    c3.push(new Array(10).fill(false));
    domino.push(new Array(10).fill(false));
  }
  //스도쿠 판
  const a = [];
  for (let i = 0; i < 9; i++) a.push(new Array(9).fill(0));

  const m = parseInt(input[index]);
  if (m === 0) break;

  //도미노 입력
  for (let i = 1; i <= m; i++) {
    let [n1, s1, n2, s2] = input[index + i].split(" ");
    n1 = parseInt(n1);
    n2 = parseInt(n2);
    const [x1, y1] = convert(s1.split(""));
    const [x2, y2] = convert(s2.split(""));
    //도미노 놓기
    a[x1][y1] = n1;
    a[x2][y2] = n2;
    //도미노 사용 체크
    domino[n1][n2] = true;
    domino[n2][n1] = true;
    //스도쿠 중복 체크
    check(x1, y1, n1, true);
    check(x2, y2, n2, true);
  }
  //숫자 입력
  const temp = input[index + m + 1].split(" ");
  for (let i = 1; i < 10; i++) {
    let s = temp[i - 1];
    const [x, y] = convert(s.split(""));
    a[x][y] = i; //숫자 놓기
    check(x, y, i, true); //스도쿠 중복 체크
  }
  console.log(`Puzzle ${tc}`);

  go(0);
  tc += 1;
  index += m + 2;

  function convert(s) {
    return [
      s[0].charCodeAt(0) - "A".charCodeAt(0),
      s[1].charCodeAt(0) - "1".charCodeAt(0),
    ];
  }

  function square(x, y) {
    return parseInt(x / 3) * 3 + parseInt(y / 3);
  }

  function can(x, y, num) {
    return !c[x][num] && !c2[y][num] && !c3[square(x, y)][num];
  }

  function check(x, y, num, what) {
    c[x][num] = what;
    c2[y][num] = what;
    c3[square(x, y)][num] = what;
  }

  function check_range(x, y) {
    return x >= 0 && x < n && y >= 0 && y < n;
  }

  function go(z) {
    if (z === 81) {
      for (let i = 0; i < n; i++) console.log(a[i].join(""));
      return true;
    }

    let x = parseInt(z / n); //행
    let y = z % n; //열

    if (a[x][y] !== 0) return go(z + 1); //이미 채워져있는 칸
    else {
      //도미노 100개를 모두 체크하므로 가로 세로 2개만 체크하면 숫자 바뀌는건 자동체크됨!
      for (let k = 0; k < 2; k++) {
        let nx = x + dx[k];
        let ny = y + dy[k];

        if (!check_range(nx, ny)) continue; //판 벗어나면 안됨
        if (a[nx][ny] !== 0) continue; //도미노 두칸 다 빈칸이여야함

        //놓을 수 있는 도미노 모두 놓아보기
        for (let i = 1; i < 10; i++) {
          for (let j = 1; j < 10; j++) {
            if (i === j) continue;
            if (domino[i][j]) continue; //사용한 도미노 불가
            //스도쿠 규칙에 맞게 놓을 수 있는 도미노인 경우
            if (can(x, y, i) && can(nx, ny, j)) {
              //도미노 중복 체크
              check(x, y, i, true);
              check(nx, ny, j, true);
              //도미노 사용 체크
              domino[i][j] = true;
              domino[j][i] = true;
              //도미노 놓기
              a[x][y] = i;
              a[nx][ny] = j;

              if (go(z + 1)) return true;

              //원상복구
              check(x, y, i, false);
              check(nx, ny, j, false);
              domino[i][j] = false;
              domino[j][i] = false;
              a[x][y] = 0;
              a[nx][ny] = 0;
            }
          }
        }
      }
      return false;
    }
  }
}
