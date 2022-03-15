import fs from "fs";
import PriorityQueue from "../Data Structure/PriorityQueue.js";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

//각 노드에 연결되어 있는 노드에 대한 정보를 담는 리스트 만들기
const graph = [];
for (let i = 0; i < n + 1; i++) {
  graph.push([]);
}

const INF = 999999999;
//최단 거리 테이블을 모두 무한으로 초기화
const distance = [];
for (let i = 0; i < n + 1; i++) {
  distance.push(INF);
}

//모든 간선 정보를 입력받기
for (let i = 1; i < m + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  //a번 노드와 b번 노드가 연결됨
  graph[a].push([b, 1]); //[노드, 거리]
  graph[b].push([a, 1]);
}

const dijkstra = (start) => {
  //시작 노드로 가기 위한 최단 경로는 0으로 설정하여, 큐에 삽입
  let q = new PriorityQueue();
  q.add([start, 0], 0); //노드, 거리
  distance[start] = 0;

  //큐가 비어있지 않다면
  while (!q.isEmpty()) {
    //가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    const [now, dist] = q.poll(); //key값 return
    q.remove([now, dist]);

    //현재 노드가 이미 처리된 적이 있는 노드라면 무시
    if (distance[now] < dist) continue;

    //현재 노드와 연결된 다른 인접한 노드들을 확인
    for (let i of graph[now]) {
      const cost = dist + i[1];
      //현재 노드를 거쳐서, 다른 노드로 이동하는 거리가 더 짧은 경우
      if (cost < distance[i[0]]) {
        distance[i[0]] = cost;
        q.add([i[0], cost], cost);
      }
    }
  }
};

dijkstra(1);

let number = 0;
let dist = 0;
let count = 0;
for (let i = n; i > 1; i--) {
  if (distance[i] >= dist) {
    count += 1;
    number = i;
    dist = distance[i];
  }
}
console.log(number, dist, count);

//solve 😀
//다익스트라 알고리즘

// 6 7
// 3 6
// 4 3
// 3 2
// 1 3
// 1 2
// 2 4
// 5 2
