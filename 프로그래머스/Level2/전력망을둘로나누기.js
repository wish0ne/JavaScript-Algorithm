function solution(n, wires) {
  const graph = new Array(n + 1);
  for (let i = 0; i < n + 1; i++) graph[i] = [];

  wires.forEach((wire) => {
    const [v1, v2] = wire;
    graph[v1].push(v2);
    graph[v2].push(v1);
  });

  //간선 하나씩 제거해보기(완전탐색)
  let answer = 101;
  for (let i = 1; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      const visited = new Array(n + 1).fill(false);
      visited[i] = true;
      let count = 0;
      count = dfs(graph[i][j], visited, count);
      answer = Math.min(answer, Math.abs(n - count * 2));
    }
  }

  function dfs(v, visited, count) {
    visited[v] = true;
    count += 1;
    for (let i of graph[v]) {
      if (!visited[i]) {
        count = dfs(i, visited, count);
      }
    }
    return count;
  }

  return answer;
}

//solve
//모든 간선을 하나씩 제거해보면서 최적해 구함(완전탐색)
//dfs에서 값 return하는거 공부하기
