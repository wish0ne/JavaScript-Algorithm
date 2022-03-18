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

//책 풀이가 훨씬 좋은 방법인듯
//바이러스를 낮은 번호부터 큐에 넣고, bfs를 수행하여 방문하지 않은 위치를 차례대로 방문하도록 함
//⭐⭐->이미 퍼진 바이러스는 고려되지 않으면서 새롭게 전염된 바이러스 역시 큐에 낮은 번호부터 추가되므로 자연스럽게 해결가능
//큐의 특징을 잘 활용한 풀이 (LIFO)⭐⭐
import Queue from "../Data Structure/Queue.js";

const data = []; //바이러스에 대한 정보를 담는 배열

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    //바이러스 종류, 시간, x, y 추가
    if (graph[i][j] !== 0) data.push([graph[i][j], 0, i, j]);
  }
}

//번호 낮은 순으로 정렬
data.sort((a, b) => a[0] - b[0]);
//큐에 삽입
const queue = new Queue();
for (let i of data) queue.enqueue(i);

//bfs 진행
while (!queue.isEmpty()) {
  const [virus, time, x, y] = queue.dequeue();
  //s초가 지나거나 큐가 빌때까지 반복
  if (s === time) break;
  //현재 노드에서 4가지 위치를 각각 확인
  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    //해당 위치로 이동할 수 있는 경우
    if (nx >= 0 && nx < n && ny >= 0 && ny < n) {
      //아직 방문하지 않은 위치라면 바이러스 전염
      if (graph[nx][ny] === 0) {
        graph[nx][ny] = virus;
        queue.enqueue([virus, time + 1, nx, ny]);
      }
    }
  }
}

console.log(graph[x - 1][y - 1]);
