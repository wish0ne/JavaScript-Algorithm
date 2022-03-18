function dfs(graph, v, visited) {
  //현재 노드 방문 처리
  visited[v] = true;
  console.log(v);
  //현재 노드와 연결된 다른 노드를 재귀적으로 방문
  for (let i of graph[v]) {
    if (!visited[i]) dfs(graph, i, visited);
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

dfs(graph, 1, visited);
