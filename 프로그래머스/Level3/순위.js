function solution(n, results) {
  let answer = 0;
  const parent_graph = [];
  const child_graph = [];
  for (let i = 0; i < n + 1; i++) {
    parent_graph.push([]);
    child_graph.push([]);
  }

  for (let result of results) {
    const [a, b] = result;
    parent_graph[b].push(a);
    child_graph[a].push(b);
  }

  for (let i = 1; i < n + 1; i++) {
    //나를 이긴 사람 수(부모)
    const parent = new Set();
    function find_parent(node) {
      parent_graph[node].forEach((v) => {
        if (!parent.has(v)) {
          parent.add(v);
          find_parent(v);
        }
      });
    }
    find_parent(i);

    //내가 이긴 사람 수(자식)
    const child = new Set();
    function find_child(node) {
      child_graph[node].forEach((v) => {
        if (!child.has(v)) {
          child.add(v);
          find_child(v);
        }
      });
    }
    find_child(i);
    console.log(parent.size, child.size);
    if (parent.size + child.size === n - 1) answer += 1;
  }
  return answer;
}

console.log(
  solution(5, [
    [4, 1],
    [3, 1],
    [2, 1],
    [5, 4],
    [5, 2],
    [5, 3],
  ])
);

//solve
//1. 처음에는 toplogy sort로 풀어보려고 했는데 오답이 너무 많이 나왔음
//반례 못찾다가 겨우 찾아서 topology sort로는 안풀림을 깨달음
//2. 두번째로 자신을 이긴 수, 자신이 이긴 수를 합해서 n-1이 되면 순위가 명확하다는 알고리즘 이용
//그러나 child구하는거에서 계속 재귀함수 돌아야해서 시간초과남
//3. 이부분을 child를 저장하는 graph 하나 더 만들어서 풀었더니 시간 엄~~~~~~청 단축됨
//~> 괜히 복잡하게 하지말고 쉽게쉽게 가자

//플로이드 워셜로 푸는 방법 (이취코테 38번과 동일)
function solution(n, results) {
  const INF = 999999999;
  const graph = new Array(n + 1);
  for (let i = 0; i < n + 1; i++) {
    graph[i] = new Array(n + 1).fill(INF);
  }

  //자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
  for (let a = 1; a < n + 1; a++) {
    graph[a][a] = 0;
  }

  //각 간선에 대한 정보를 입력받아, 그 값으로 초기화
  for (let result of results) {
    //A에서 B로 가는 비용은 C라고 설정
    const [a, b] = result;
    graph[b][a] = 1;
  }

  //플로이드 워셜
  for (let k = 1; k < n + 1; k++) {
    for (let a = 1; a < n + 1; a++) {
      for (let b = 1; b < n + 1; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }

  let answer = 0;
  for (let i = 1; i < n + 1; i++) {
    let count = 0;
    for (let j = 1; j < n + 1; j++) {
      if (graph[i][j] !== INF || graph[j][i] !== INF) count += 1;
    }
    if (count === n) answer += 1;
  }
  return answer;
}
