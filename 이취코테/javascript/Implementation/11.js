import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
const k = parseInt(input[1]);

const apple = [];
for (let i = 2; i < 2 + k; i++) {
  apple.push(input[i].split(" ").map(Number));
}

const l = parseInt(input[k + 2]);
const lArr = [];
for (let i = k + 3; i < l + k + 3; i++) {
  const [x, c] = input[i].split(" ");
  lArr.push([parseInt(x), c.trim()]);
}

const board = new Array(n + 2).fill().map(() => new Array(n + 2).fill(0)); //padding
//사과 놓기
for (let i = 0; i < k; i++) {
  board[apple[i][0]][apple[i][1]] = 1;
}

const snake = [[1, 1]];
//상 좌 하 우
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];
let snake_direction = 3; //시작은 오른쪽으로 이동
let game_over = false; // 게임 종료 여부
let time = 0; //게임 시간

const move_snake = (snake, snake_direction) => {
  const nx = snake[0][0] + dx[snake_direction];
  const ny = snake[0][1] + dy[snake_direction];

  //게임 오버인지 확인
  //벽에 부딪히면 종료
  if (nx <= 0 || nx > n || ny <= 0 || ny > n) return true;

  //자기 몸에 부딪히면 종료
  //✔ snake[i] === [nx, ny] 이렇게 비교하면 비교가 안됨. 왜?
  //당연함.. 깊은복사해서 비교하면 false뜨는것처럼 완전 다른 배열이니까 당연히 항상 false뜸. 배열을 비교하는게 아니라 값을 비교해야함!
  //JSON.stringfy(snake[i])처럼 문자열로 변환해서 비교하는 방법도 존재.
  for (let i = 0; i < snake.length; i++) {
    if (snake[i][0] === nx && snake[i][1] === ny) {
      return true;
    }
  }
  //+) board에 뱀이 있는 곳은 2로 표시해주면 몸통과 충돌하는지 확인할때 O(1)로 확인가능.

  //게임 오버 아니라면 머리 늘림
  snake.unshift([nx, ny]);

  //사과가 있는 경우
  if (board[nx][ny] === 1) {
    board[nx][ny] = 0; //사과 먹음
  } else {
    snake.pop(); //꼬리 비움
  }
  return false;
};

const rotation_snake = (snake_direction, d) => {
  //왼쪽으로 90도 회전
  if (d === "L") {
    snake_direction = (snake_direction + 1) % 4;
  }
  //오른쪽으로 90도 회전
  else {
    snake_direction = snake_direction - 1 < 0 ? 3 : snake_direction - 1;
  }
  return snake_direction;
};

while (true) {
  //뱀 이동
  time += 1;
  game_over = move_snake(snake, snake_direction);
  if (game_over) break;

  //이동해야하면
  //✔ lArr.length를 체크해주지 않아서 에러
  if (lArr.length > 0 && lArr[0][0] === time) {
    const [x, c] = lArr.shift();
    //뱀 회전
    snake_direction = rotation_snake(snake_direction, c);
  }
}

console.log(time);

//solve 😀
//시뮬레이션 문제.
//에러 2군데 디버깅하는데 시간 좀 잡아먹음.
