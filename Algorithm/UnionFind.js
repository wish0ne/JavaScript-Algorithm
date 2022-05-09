// 특정 원소가 속한 집합 찾기
function find_parent(parent, x) {
  // 루트 노드가 아니라면 루트 노드를 찾을때까지 재귀적으로 호출
  if (parent[x] !== x) parent[x] = find_parent(parent, parent[x]);
  return parent[x];
}

// 두 원소가 속한 집합 합치기
function union_parent(parent, a, b) {
  a = find_parent(parent, a);
  b = find_parent(parent, b);
  if (a < b) parent[b] = a;
  else parent[a] = b;
}

function solution(n, paths, gates, summits) {
  // 부모 테이블 초기화
  const parent = new Array(n + 1).fill(0);

  // 부모 테이블 상에서 부모를 자기자신으로 초기화
  for (let i = 1; i < v + 1; i++) {
    parent[i] = i;
  }

  //출입구
  for (let gate of gates) {
    parent[i] = -1;
  }

  //산봉우리
  for (let summit of summit) {
    parent[i] = 0;
  }

  const graph = new Array(n + 1);
  for (let i = 0; i <= n; i++) graph[i] = [];

  for (let path of paths) {
    const [i, j, w] = path;
    graph[i].push([j, w]); //노드, 비용
    graph[j].push([i, w]);
  }

  const answers = [0, 999999999];

  for (let gate of gates) {
    let v = gate;
    while (end) {
      for (let i of graph[v]) {
        union_parent(parent, v, i);
      }
    }
  }
}

console.log(
  solution(
    7,
    [
      [1, 2, 5],
      [1, 4, 1],
      [2, 3, 1],
      [2, 6, 7],
      [4, 5, 1],
      [5, 6, 1],
      [6, 7, 1],
    ],
    [3, 7],
    [1, 5]
  )
);
