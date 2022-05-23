// a : 트리의 각 점의 가중치
// edges : 트리의 간선 정보
// 트리의 모든 점들의 가중치를 0으로 만드는 최소 횟수(불가능하면 -1)

//재귀 DFS 풀이 (런타임 에러)
function solution1(a, edges) {
  if (a.reduce((prev, curr) => prev + curr) !== 0) return -1;

  const n = a.length; //노드 개수

  //트리 생성
  const tree = new Array(n);
  for (let i = 0; i < n; i++) tree[i] = [];
  for (let edge of edges) {
    const [a, b] = edge;
    tree[a].push(b);
    tree[b].push(a);
  }

  const visited = new Array(n).fill(false);
  let answer = 0;
  let sum = a[0];
  const dfs = (v) => {
    visited[v] = true;
    for (let i of tree[v]) {
      if (!visited[i]) {
        sum += a[i];
        dfs(i);
        answer += Math.abs(a[i]);
        //a[v] += a[i];
      }
    }
  };
  dfs(0);

  if (a[0] !== 0) return -1;
  return answer;
}

//Iterative DFS 풀이
function solution(a, edges) {
  if (a.reduce((prev, curr) => prev + curr) !== 0) return -1;

  const n = a.length; //노드 개수

  //트리 생성
  const tree = new Array(n);
  for (let i = 0; i < n; i++) tree[i] = [];
  for (let edge of edges) {
    const [a, b] = edge;
    tree[a].push(b);
    tree[b].push(a);
  }

  const visited = new Array(n).fill(false);
  let answer = 0n; //최소횟수가 정수범위를 넘어가는 경우가 존재 ~> BigInt로 처리해야함
  const dfs = () => {
    const stack = [[0, -1]];

    while (stack.length) {
      const [node, parent] = stack.pop();
      if (visited[node]) {
        answer += BigInt(Math.abs(a[node]));
        a[parent] += a[node];
        continue;
      }
      stack.push([node, parent]);
      visited[node] = true;
      for (let i of tree[node]) {
        if (!visited[i]) {
          stack.push([i, node]);
        }
      }
    }
  };
  dfs();

  if (a[0] !== 0) return -1;
  return answer;
}

//풀이는 엄청 간단한 문젠데 이상하게 어렵고 삽질함
//탐색으로 풀어야하는걸 알기까지 시간이 오래걸림... (union find로 삽질함)
//이런 유형의 그래프 문제는 dfs/bfs나 union find 둘중 하나일텐데, 그 둘중에 어떤 알고리즘을 써야하는지 빨리 알아차리는게 중요한듯 (그리고 난 똥멍청인듯^)
//⭐dfs/bfs에서 재귀 끝나고 위로 올라가면서 계산하는 경우!!⭐ 좀 더 공부해야함
//그리고 dfs에서 재귀에서 런타임 에러가 발생하면 Iterative DFS로 바꿔서 풀어야함

console.log(
  solution1(
    [-5, 0, 2, 1, 2],
    [
      [0, 1],
      [3, 4],
      [2, 3],
      [0, 3],
    ]
  )
);

// function solution(a, edges) {
//   if (a.reduce((prev, curr) => prev + curr) !== 0) return -1;
//   let answer = 0;

//   const v = a.length; //노드 개수
//   const e = edges.length; //간선 개수

//   // 특정 원소가 속한 집합 찾기
//   function find_parent(parent, x, count) {
//     // 루트 노드가 아니라면 루트 노드를 찾을때까지 재귀적으로 호출
//     if (parent[x] !== x) parent[x] = find_parent(parent, parent[x], count + 1);
//     return [parent[x], count];
//   }

//   // 두 원소가 속한 집합 합치기
//   function union_parent(parent, a, b) {
//     let ac = 0;
//     let bc = 0;
//     [a, ac] = find_parent(parent, a, 1);
//     [b, bc] = find_parent(parent, b, 1);
//     //a가 부모
//     if (Math.abs(node[a]) * ac > Math.abs(node[b]) * bc) {
//       parent[b] = a;
//       node[a] += node[b];
//       answer += Math.abs(node[b]);
//       node[b] = 0;
//     } else {
//       parent[a] = b;
//       node[b] += node[a];
//       answer += Math.abs(node[a]);
//       node[a] = 0;
//     }
//     console.log(answer);
//   }

//   // 부모 테이블, 노드 테이블 초기화
//   const parent = new Array(v).fill(0);
//   const node = new Array(v).fill(0);

//   // 부모 테이블 상에서 부모를 자기자신으로 초기화
//   for (let i = 0; i < v; i++) {
//     parent[i] = i;
//     node[i] = a[i];
//   }

//   // union 연산 각각 수행
//   for (let i = 0; i < e; i++) {
//     const [a, b] = edges[i];
//     union_parent(parent, a, b);
//     console.log("parent", parent);
//     console.log("node", node);
//     console.log("");
//   }
//   if (node.reduce((prev, curr) => prev + curr) !== 0) return -1;
//   return answer;
// }
