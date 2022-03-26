import Heap from "../Data Structure/Heap.js";
import fs from "fs";

const INF = 999999999;

//노드의 개수, 간선의 개수를 입력받기
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [n, m, c] = input[0].split(" ").map(Number);

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
for (let i = 1; i < m + 1; i++) {
  const [x, y, z] = input[i].split(" ").map(Number);
  //a번 노드에서 b번 노드로 가는 비용이 c
  graph[x].push([y, z]);
}

const dijkstra = (start) => {
  //시작 노드로 가기 위한 최단 경로는 0으로 설정하여, 큐에 삽입
  let q = new Heap();
  q.add([0, start]); //거리, 노드
  distance[start] = 0;

  //큐가 비어있지 않다면
  while (!q.isEmpty()) {
    //가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
    const [dist, now] = q.poll(); //key값 return

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
dijkstra(c);

let number = 0; //도시 개수
let time = 0; //시간

for (let i = 1; i < n + 1; i++) {
  if (distance[i] !== INF) {
    number += 1;
    time = Math.max(time, distance[i]); //조건문 통해 크기 비교해서 값 업데이트하는것보다 max 활용하는게 더 좋은듯!
  }
}

console.log(number - 1, time); //시작 노드는 제외해야하므로 number-1

//다익스트라 코드 그대로 활용
//시작노드를 제외하는 것만 유의하면 될듯(시작노드는 distance가 0이므로 number+=1에 포함됨)
