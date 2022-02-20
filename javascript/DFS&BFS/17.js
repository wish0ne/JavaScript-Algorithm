import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

//입력받기
const graph = new Array(n);
for (let i = 1; i < n + 1; i++) {
  graph[i - 1] = input[i].split(" ").map(Number);
}
const [s, x, y] = input[n + 1].split(" ").map(Number);

const bfs = (now_virus, num, virus) => {
  virus[num - 1] = []; // 현재 바이러스 번호에 해당하는 좌표배열 초기화
  //현재 방향에서 상하좌우 전염
  while (now_virus.length !== 0) {
    const [x, y] = now_virus.pop();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (graph[nx][ny] !== 0) continue;
      graph[nx][ny] = num;
      virus[num - 1].push([nx, ny]);
    }
  }
};

const virus = new Array(k).fill().map(() => []); //❌런타임에러 -> k를 n으로 잘못 사용
//그래프 돌면서 초기 바이러스 찾음
for (let a = 0; a < n; a++) {
  for (let b = 0; b < n; b++) {
    if (graph[a][b] !== 0) {
      virus[graph[a][b] - 1].push([a, b]);
    }
  }
}

//s초동안 전염
for (let i = 0; i < s; i++) {
  //바이러스 좌표마다 순차적으로 전염 수행
  //❌런타임에러 -> k를 n으로 잘못 사용
  for (let a = 0; a < k; a++) {
    bfs(virus[a], a + 1, virus); //현재 번호에 해당하는 바이러스 좌표배열, 바이러스 번호, 바이러스 배열
  }
}

console.log(graph[x - 1][y - 1]);

// not solve 😡
// 1. 런타임에러 -> virus의 좌표를 저장하는 배열에서 k를 n으로 잘못써서 발생한거였음!!! 변수 실수로 런타임에러가 생길 수 있다
// 2. 시간초과 -> 이미 퍼진 바이러스는 또 퍼질 수 없음(상하좌우에 이미 퍼져있기 때문). 이부분 중복처리해서 시간초과 발생 -> 중복처리 어떻게 해결할지 생각이 잘 안났음...뭔가 어려웠던 문제
