//완전탐색
//파라미터 : 현재 위치, 현재까지 양의 수, 현재까지 늑대의 수, ⭐다음으로 방문할 수 있는 노드 집합⭐
//⭐늑대가 양보다 많다면 탐색하지 않음(불가능한 경우)⭐
//방문할 수 있다면 현재 노드의 자식 노드들을 탐색노드집합에 추가
//탐색노드집합의 모든 노드를 방문하며 dfs 수행

//⭐⭐dfs 수행할때 다음으로 방문하는 노드만 기억하는게 아니라 방문할 수 있는 노드의 집합을 관리하는게 색다른 문제
function solution(info, edges) {
  //그래프 생성
  const graph = new Array(info.length);
  for (let i = 0; i < info.length; i++) graph[i] = [];

  edges.forEach((edge) => {
    const [a, b] = edge;
    graph[a].push(b);
    graph[b].push(a);
  });

  const visited = new Array(info.length).fill(false);
  visited[0] = true;
  let answer = 0;
  dfs(0, 0, 0, []);
  function dfs(now, sheep, wolf, next) {
    //현재 노드의 양/늑대 처리
    if (info[now] === 0) sheep += 1;
    else wolf += 1;
    answer = Math.max(answer, sheep);
    //늑대가 더 많으면 진행 불가능
    if (sheep <= wolf) return false;

    //진행 가능하면 현재 노드의 자식 노드를 탐색노드집합에 추가
    for (let i of graph[now]) {
      if (!visited[i]) next.push(i);
    }
    //탐색노드집합의 모든 노드에 대해 dfs 수행
    next.forEach((n) => {
      let temp = next.filter((i) => i !== n); //다음으로 방문하는 노드를 탐색노드집합에서 제외
      visited[n] = true;
      dfs(n, sheep, wolf, temp);
      visited[n] = false;
    });
  }
  return answer;
}

function solution_my(info, edges) {
  //그래프 생성
  const graph = new Array(info.length);
  for (let i = 0; i < info.length; i++) graph[i] = [];

  edges.forEach((edge) => {
    const [a, b] = edge;
    graph[a].push(b);
    graph[b].push(a);
  });

  let answer = 0;

  const visited = new Array(info.length).fill(false);
  visited[0] = true;
  go(0, 1, 0, []);
  function go(now, sheep, wolf, next) {
    //최대 양 검사
    answer = Math.max(sheep, answer);

    for (let i of graph[now]) {
      if (!visited[i]) next.push(i);
    }
    next.forEach((n) => {
      let temp = next.filter((i) => i !== n);
      visited[n] = true;
      if (info[n] === 0) go(n, sheep + 1, wolf, temp);
      else if (info[n] === 1) {
        if (sheep > wolf + 1) go(n, sheep, wolf + 1, temp);
      }
      visited[n] = false;
    });
  }

  return answer;
}
//🔥visited 원상복구때문에 디버깅 오래함
//🔥반례 및 시간초과) wolf가 더 많으면 아예 재귀 돌지 않기 -> 문제 잘 읽자...문제조건임

console.log(
  solution(
    [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [
      [0, 1],
      [1, 2],
      [1, 4],
      [0, 8],
      [8, 7],
      [9, 10],
      [9, 11],
      [4, 3],
      [6, 5],
      [4, 6],
      [8, 9],
    ]
  )
);
