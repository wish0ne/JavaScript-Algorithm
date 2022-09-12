import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const edges = new Array(n + 1);
for (let i = 0; i < n + 1; i++) {
  edges[i] = [];
}

let max = 0;
for (let i = 1; i <= m; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  max = Math.max(max, c);
  edges[a].push([b, c]);
  edges[b].push([a, c]);
}

const [start, dest] = input[m + 1].split(" ").map(Number);

let l = 0;
let r = max;

let ans = 0;
while (l <= r) {
  let mid = parseInt((l + r) / 2);
  const visited = new Array(n + 1).fill(false);
  //가능 : 중량 늘리기
  if (check(start, visited, mid)) {
    ans = mid;
    l = mid + 1;
  } else {
    r = mid - 1;
  }
}

function check(v, visited, w) {
  visited[v] = true;
  if (v === dest) return true;
  for (let n of edges[v]) {
    const [next, weight] = n;
    if (!visited[next] && weight >= w) {
      let flag = check(next, visited, w);
      if (flag) return true;
    }
  }
  return false;
}
console.log(ans);

//시간초과 1번 : 그래프 전체 순회해서 한 경로당 최소값을 구하고 최소값들의 최대값 구하는 방법
//-> DFS가 아니라 브루트포스이므로 N^2
//solve : 이분탐색(lgN)으로 중량값 정하고 가능한지 여부를 dfs(O(E+V))로 확인

//해설
//최대 무게를 이분탐색으로 결정, 그 무게를 갈 수 있는지를 검사
//검사는 DFS/BFS 이용 (DFS/BFS의 목적 : 한 시작점에서 부터 연결된 모든 정점 방문)
function go(a, check, node, limit) {
  if (check[node]) return false;
  check[node] = true;
  if (node === dest) return true;
  for (let v of a[node]) {
    let [nxt, cost] = v;
    if (cost >= limit) {
      if (go(a, check, nxt, limit)) return true;
    }
  }
  return false;
}
let left = 1;
let right = 1000000000;
let answer = 0;
while (left <= right) {
  let mid = parseInt((left + right) / 2);
  let check = new Array(n + 1).fill(false);
  if (go(edges, check, start, mid)) {
    answer = mid;
    left = mid + 1;
  } else right = mid - 1;
}
console.log(answer);
