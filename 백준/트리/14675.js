import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

//단절점 : 해당 정점을 지우면 트리가 2개로 분리
//단절선 : 해당 간선을 지우면 트리가 2개로 분리

const n = parseInt(input[0]); //정점 개수

//트리 생성
const tree = new Array(n + 1);
for (let i = 0; i <= n; i++) tree[i] = [];

for (let i = 1; i < n; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  tree[a].push(b);
  tree[b].push(a);
}

const q = parseInt(input[n]); //질의 개수
const answer = [];
for (let i = n + 1; i <= n + q; i++) {
  const [t, k] = input[i].split(" ").map(Number);

  //k번 정점이 단절점인가
  if (t === 1) {
    if (check(k)) answer.push("yes");
    else answer.push("no");
  }
  //k번 정점이 단절선인가
  else if (t === 2) {
    answer.push("yes");
  }
}
console.log(answer.join("\n"));

function check(v) {
  if (tree[v].length <= 1) return false;
  return true;
}

//solve
//내가 못하는...단순화시켜서 보면 풀리는 문제
//걍 단절선은 모든 경우가 두개로 분리되는거구
//단절점은 연결된 노드가 1개이하일때 제외하면 두개로 분리됨

//처음에는 dfs 돌면서 탐색해야하나 이런식으로 생각했는데
//그냥 그려보면서 단순한 규칙 찾아보자!!
