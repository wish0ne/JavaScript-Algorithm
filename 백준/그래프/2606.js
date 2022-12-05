import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]); //컴퓨터 수
const m = parseInt(input[1]);

const graph = new Array(n + 1);
for (let i = 0; i <= n; i++) graph[i] = [];

for (let i = 2; i <= m + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const visited = new Array(n + 1).fill(false);

let count = 0;
function dfs(v) {
  visited[v] = true;
  for (let i of graph[v]) {
    if (!visited[i]) {
      count += 1;
      dfs(i);
    }
  }
}
dfs(1);
console.log(count);

//solve
//쉬운 그래프 탐색 문제
