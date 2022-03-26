// 참고 : https://velog.io/@j-_-eun125/require%EA%B3%BC-import%EB%8A%94-%EB%AD%90%EA%B0%80-%EB%8B%AC%EB%9D%BC
import Heap from "../Data Structure/Heap.js";
import fs from "fs";

const INF = 999999999;

//노드의 개수, 간선의 개수를 입력받기
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);

//시작 노드 번호 입력받기
const start = parseInt(input[1]);

//각 노드에 연결되어 있는 노드에 대한 정보를 담는 리스트 만들기
const graph = [];
for (let i = 0; i < n + 1; i++) {
  graph.push([]);
}

//최단 거리 테이블을 모두 무한으로 초기화
const distance = [];
for (let i = 0; i < n + 1; i++) {
  distance.push(INF);
}

//모든 간선 정보를 입력받기
for (let i = 2; i < m + 2; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  //a번 노드에서 b번 노드로 가는 비용이 c
  graph[a].push([b, c]); //[노드, 거리]
}

const dijkstra = (start) => {
  //시작 노드로 가기 위한 최단 경로는 0으로 설정하여, 큐에 삽입
  let q = new Heap();
  q.add([0, start]); //거리, 노드
  distance[start] = 0;

  //큐가 비어있지 않다면
  while (!q.isEmpty()) {
    //가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    const [dist, now] = q.poll();

    //현재 노드가 이미 처리된 적이 있는 노드라면 무시
    if (distance[now] < dist) continue;

    //현재 노드와 연결된 다른 인접한 노드들을 확인
    for (let i of graph[now]) {
      const cost = dist + i[1];
      //현재 노드를 거쳐서, 다른 노드로 이동하는 거리가 더 짧은 경우
      if (cost < distance[i[0]]) {
        distance[i[0]] = cost;
        q.add([cost, i[0]]);
      }
    }
  }
};

// 다익스트라 알고리즘을 수행
dijkstra(start);

//모든 노드로 가기 위한 최단 거리를 출력
for (let i = 1; i < n + 1; i++) {
  //도달할 수 없는 경우 무한이라고 출력
  if (distance[i] === INF) console.log("INFINITY");
  //도달할 수 있는 경우 거리 출력
  else console.log(distance[i]);
}

// 6 11
// 1
// 1 2 2
// 1 3 5
// 1 4 1
// 2 3 3
// 2 4 2
// 3 2 3
// 3 6 5
// 4 3 3
// 4 5 1
// 5 3 1
// 5 6 2
