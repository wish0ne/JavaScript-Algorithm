import Queue from "../Data Structure/Queue.js";

function bfs(graph, start, visited) {
  //큐 자료구조 이용
  const queue = new Queue();
  queue.enqueue(start);
  //현재 노드 방문 처리
  visited[start] = true;
  //큐가 빌때까지 반복
  while (!queue.isEmpty()) {
    //큐에서 하나의 원소를 뽑아 출력
    const v = queue.dequeue();
    console.log(v);
    //해당 원소와 연결된, 아직 방문하지 않은 원소들을 큐에 삽입
    for (let i of graph[v]) {
      if (!visited[i]) {
        queue.enqueue(i);
        visited[i] = true;
      }
    }
  }
}
//각 노드가 연결된 정보를 리스트 자료형으로 표현(2차원 배열)
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];

//각 노드가 방문된 정보를 1차원 배열로 표현
const visited = new Array(9).fill(false);

bfs(graph, 1, visited);
