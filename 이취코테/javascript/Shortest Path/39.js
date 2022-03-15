import fs from "fs";
import PriorityQueue from "../Data Structure/PriorityQueue.js";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const INF = 999999999;
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const dijkstra = (startX, startY, graph, distance, n) => {
  let q = new PriorityQueue();
  q.add([startX, startY], graph[startX][startY]); //노드, 거리
  distance[startX][startY] = graph[startX][startY];

  //큐가 비어있지 않다면
  while (!q.isEmpty()) {
    //가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    const now = q.poll(); //key값 return
    const dist = q.getPriority(now); //value값 return
    q.remove(now);

    //현재 노드가 이미 처리된 적이 있는 노드라면 무시
    if (distance[now] < dist) continue;

    //현재 노드와 연결된 다른 인접한 노드들을 확인
    for (let i = 0; i < 4; i++) {
      let nx = dx[i] + now[0];
      let ny = dy[i] + now[1];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      const cost = dist + graph[nx][ny];
      //현재 노드를 거쳐서, 다른 노드로 이동하는 거리가 더 짧은 경우
      if (cost < distance[nx][ny]) {
        distance[nx][ny] = cost;
        q.add([nx, ny], cost);
      }
    }
  }
};

const t = parseInt(input[0]);
let index = 1;
for (let test = 0; test < t; test++) {
  const n = parseInt(input[index]);

  const graph = [];
  for (let i = 0; i < n; i++) {
    graph.push(input[index + i + 1].split(" ").map(Number));
  }

  //최단 거리 테이블을 모두 무한으로 초기화
  const distance = [];
  for (let i = 0; i < n; i++) {
    distance.push(new Array(n).fill(INF));
  }

  dijkstra(0, 0, graph, distance, n);

  console.log(distance[n - 1][n - 1]);

  index += n + 1;
}

// solve 😀
// 다익스트라 알고리즘 문제
// N^2이 10,000이상이므로 플로이드 워셜은 적합하지 않음
// 기존 다익스트라 알고리즘(인접그래프)에서 인접행렬 사용하는 방식으로 변경

// 3
// 3
// 5 5 4
// 3 9 1
// 3 2 7
// 5
// 3 7 2 0 1
// 2 8 0 9 1
// 1 2 1 8 1
// 9 8 9 2 0
// 3 6 5 1 5
// 7
// 9 0 5 1 1 5 3
// 4 1 2 1 6 5 3
// 0 7 6 1 6 8 5
// 1 1 7 8 3 2 3
// 9 4 0 7 6 4 1
// 5 8 3 2 4 8 3
// 7 4 8 4 8 3 4
