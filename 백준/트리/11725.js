import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]); //노드 개수

const tree = new Array(n + 1);
for (let i = 0; i <= n; i++) tree[i] = [];
for (let i = 1; i < n; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  tree[a].push(b);
  tree[b].push(a);
}

//dfs 수행
const visited = new Array(n + 1).fill(-1);
visited[1] = 0;

function dfs(v) {
  for (let next of tree[v]) {
    if (visited[next] !== -1) continue;
    visited[next] = v;
    dfs(next);
  }
}

dfs(1);
const answer = [];
for (let i = 2; i <= n; i++) answer.push(visited[i]);
console.log(answer.join("\n"));

//solve
//트리를 DFS로 탐색하는 문제
