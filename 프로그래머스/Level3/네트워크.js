function solution(n, computers) {
  const graph = [];
  for (let i = 0; i < n; i++) graph.push([]);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && computers[i][j] === 1) graph[i].push(j);
    }
  }
  const visited = new Array(n).fill(false);

  let count = 0;
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count += 1;
      dfs(graph, i, visited);
    }
  }
  return count;
}

function dfs(graph, v, visited) {
  visited[v] = true;
  for (let i of graph[v]) {
    if (!visited[i]) dfs(graph, i, visited);
  }
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
);

//solve
//전형적인 dfs/bfs 문제
//비슷한 유형 전에 풀어봐서 쉽게 풀 수 있었음
