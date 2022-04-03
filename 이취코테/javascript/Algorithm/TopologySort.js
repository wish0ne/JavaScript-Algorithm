import DoublyLinkedList from "../Data Structure/DoublyLinkedList.js";

//노드의 개수와 간선 개수 입력받기
import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [v, e] = input[0].split(" ").map(Number);
//모든 노드에 대한 진입차수는 0으로 초기화
const indegree = new Array(v + 1).fill(0);
//각 노드에 연결된 간선 정보를 담기 위한 연결리스트(그래프) 초기화
const graph = new Array(v + 1);
for (let i = 1; i < v + 1; i++) {
  graph[i] = [];
}

//방향 그래프의 모든 간선 정보 입력받기
for (let i = 1; i < e + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b); //a에서 b로 이동가능
  indegree[b] += 1; //진입차수 1 증가
}

//위상 정렬 함수
function topology_sort() {
  const result = []; //알고리즘 수행 결과를 담을 리스트
  const q = new DoublyLinkedList();

  //처음 시작할때는 진입차수가 0인 노드를 큐에 삽입
  for (let i = 1; i < v + 1; i++) {
    if (indegree[i] === 0) q.append(i);
  }

  //큐가 빌때까지 반복
  while (!q.isEmpty()) {
    //큐에서 원소 꺼내기
    const now = q.deleteHead();
    result.push(now);
    //해당 원소와 연결된 노드들의 진입차수에서 1 빼기
    for (let i of graph[now]) {
      indegree[i] -= 1;
      //새롭게 진입차수가 0이 되는 노드를 큐에 삽입
      if (indegree[i] === 0) q.append(i);
    }
  }

  //위상정렬 결과 출력
  for (let i of result) console.log(i);
}

topology_sort();
