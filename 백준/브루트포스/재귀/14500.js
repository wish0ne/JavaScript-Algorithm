import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const paper = [];
for (let i = 1; i <= n; i++) {
  paper.push(input[i].split(" ").map(Number));
}

const tetrominos = [
  [[1, 1, 1, 1]],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [1, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
];

let max = 0;
tetrominos.forEach((tetromino) => {
  let temp = rotation(tetromino);
  //회전
  for (let i = 0; i < 4; i++) {
    max = Math.max(count(temp), max);
    temp = rotation(temp);
  }
  //x축 대칭
  temp = symmetry_x(tetromino);
  for (let i = 0; i < 4; i++) {
    temp = rotation(temp);
    max = Math.max(count(temp), max);
  }
  //y축 대칭
  temp = symmetry_y(tetromino);
  for (let i = 0; i < 4; i++) {
    temp = rotation(temp);
    max = Math.max(count(temp), max);
  }
  //원점 대칭
  temp = symmetry_x(tetromino);
  temp = symmetry_y(temp);
  for (let i = 0; i < 4; i++) {
    temp = rotation(temp);
    max = Math.max(count(temp), max);
  }
});

console.log(max);

function count(tetromino) {
  const row = tetromino.length; //행 길이 계산
  const col = tetromino[0].length; //열 길이 계산

  let max = 0;
  let count = 0;
  for (let i = 0; i < n - row + 1; i++) {
    for (let j = 0; j < m - col + 1; j++) {
      //합 계산
      for (let x = 0; x < row; x++) {
        for (let y = 0; y < col; y++) {
          count += tetromino[x][y] * paper[x + i][y + j];
        }
      }
      max = Math.max(max, count);
      count = 0;
    }
  }
  return max;
}

function symmetry_x(tetromino) {
  const n = tetromino.length; //행 길이 계산
  const m = tetromino[0].length; //열 길이 계산
  //결과 배열
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = new Array(m).fill(0);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[i][m - j - 1] = tetromino[i][j];
    }
  }
  return result;
}

function symmetry_y(tetromino) {
  const n = tetromino.length; //행 길이 계산
  const m = tetromino[0].length; //열 길이 계산
  //결과 배열
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = new Array(m).fill(0);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[n - i - 1][j] = tetromino[i][j];
    }
  }
  return result;
}

function rotation(tetromino) {
  const n = tetromino.length; //행 길이 계산
  const m = tetromino[0].length; //열 길이 계산
  //결과 배열
  const result = new Array(m);
  for (let i = 0; i < m; i++) {
    result[i] = new Array(n).fill(0);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[j][n - i - 1] = tetromino[i][j];
    }
  }
  return result;
}

//실패 2번
//1) 대칭 후에도 회전4번 확인하는거 빼먹음
//2) 변수 관리를 잘못해서 계속 원래 배열을 회전함;; 그래서 회전 한번만 된 효과..
//완전 구현 문제 아직도 어려운듯...💀
//회전/x축대칭/y축대칭 정리해놓으면 좋을듯

//해설
//앞 4가지 도형은 재귀함수(시작점에서 3칸 이동하는 형태가 반복)
//마지막 도형은 재귀함수로 불가능하므로 for문 이용

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const [N, M] = input[0].split(" ").map(Number);
const a = [];
for (let i = 1; i <= N; i++) {
  a.push(input[i].split(" ").map(Number));
}
const c = new Array(N);
for (let i = 0; i < N; i++) c[i] = new Array(M).fill(false);

let ans = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    //모든 칸에서 이동
    go(i, j, 0, 0);
    let temp;
    //마지막 도형은 for문으로 확인
    if (j + 2 < M) {
      temp = a[i][j] + a[i][j + 1] + a[i][j + 2];
      //ㅗ 모양
      if (i - 1 >= 0) {
        let temp2 = temp + a[i - 1][j + 1];
        if (ans < temp2) ans = temp2;
      }
      // ㅜ 모양
      if (i + 1 < N) {
        let temp2 = temp + a[i + 1][j + 1];
        if (ans < temp2) ans = temp2;
      }
    }
    if (i + 2 < N) {
      temp = a[i][j] + a[i + 1][j] + a[i + 2][j];
      //ㅏ 모양
      if (j + 1 < M) {
        let temp2 = temp + a[i + 1][j + 1];
        if (ans < temp2) ans = temp2;
      }
      //ㅓ 모양
      if (j - 1 >= 0) {
        let temp2 = temp + a[i + 1][j - 1];
        if (ans < temp2) ans = temp2;
      }
    }
  }
}
console.log(ans);

//임의의 한 칸에서 시작해서 3개 칸 연속해서 방문하는 함수
//cnt : 방문한 칸 개수(최대 4칸)
function go(x, y, sum, cnt) {
  //최대값 업데이트
  if (cnt === 4) {
    if (ans < sum) ans = sum;
    return;
  }
  if (x < 0 || x >= N || y < 0 || y >= M) return; //범위 벗어나는 경우
  if (c[x][y]) return; //이미 방문한 경우
  c[x][y] = true;
  //인접한 4칸으로 이동가능
  for (let k = 0; k < 4; k++) {
    go(x + dx[k], y + dy[k], sum + a[x][y], cnt + 1);
  }
  //dfs는 원상복구 절대 없음
  c[x][y] = false; //브루트포스라서 원상복구 필요⭐
  //이게 dfs와 브루트포스의 차이점!
}
