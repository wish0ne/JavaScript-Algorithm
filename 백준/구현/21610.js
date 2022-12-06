import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = [];
for (let i = 1; i <= n; i++) {
  board.push(input[i].split(" ").map(Number));
}

let clouds = new Array(n);
for (let i = 0; i < n; i++) clouds[i] = new Array(n).fill(0);

clouds[n - 1][0] = 1;
clouds[n - 1][1] = 1;
clouds[n - 2][0] = 1;
clouds[n - 2][1] = 1;

const dx = [0, -1, -1, -1, 0, 1, 1, 1];
const dy = [-1, -1, 0, 1, 1, 1, 0, -1];

for (let i = n + 1; i <= n + m; i++) {
  const [d, s] = input[i].split(" ").map(Number);
  const temp = new Array(n);
  for (let i = 0; i < n; i++) temp[i] = new Array(n).fill(false);
  //1. 구름 이동
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (clouds[i][j]) {
        let nx = (i + dx[d - 1] * s) % n;
        let ny = (j + dy[d - 1] * s) % n;
        if (nx < 0) nx += n;
        if (ny < 0) ny += n;
        temp[nx][ny] = true;
        //2. 구름 아래 칸 물 양 1 증가
        board[nx][ny] += 1;
      }
    }
  }

  //3. 물복사 버그 마법
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (temp[i][j]) {
        let count = 0;
        for (let k = 1; k <= 7; k += 2) {
          let nx = i + dx[k];
          let ny = j + dy[k];
          if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
          if (board[nx][ny] > 0) count += 1;
        }
        board[i][j] += count;
      }
    }
  }

  //4. 새 구름 생성
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      //✔이 부분에서 모든 구름 일일히 확인하면 시간초과
      if (board[i][j] >= 2 && !temp[i][j]) {
        board[i][j] -= 2;
        temp[i][j] = true;
      } else temp[i][j] = false;
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      clouds[i][j] = temp[i][j];
    }
  }
}

function print(board) {
  for (let i = 0; i < n; i++) console.log(board[i]);

  console.log("");
}

let count = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    count += board[i][j];
  }
}
console.log(count);

//solve
//구름 좌표값을 배열에 넣어서 includes로 확인하는 코드 -> 시간초과
//2차원 배열 전부 확인하면서 구름있는지 확인하는게 초반에는 비효율적이지만 뒤에 구름좌표값 비교시 O(1)에 가능하므로 시간초과 안나는듯. 2차원배열 초기화하고 복사하는게 더 빠르넹..
