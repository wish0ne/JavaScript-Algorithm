import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const INF = 999999999;
//인접행렬 생성
const graph = new Array(n + 1);
for (let i = 0; i <= n; i++) {
  graph[i] = new Array(n + 1).fill(INF);
}

//자기자신으로의 비용은 0으로 초기화
for (let i = 0; i <= n; i++) {
  graph[i][i] = 0;
}

//비용 입력받기
for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a][b] = 1;
}

//플로이드 워셜 알고리즘 수행
for (let k = 1; k <= n; k++) {
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= n; b++) {
      graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
    }
  }
}

//계산 부분
let count = 0;

for (let i = 1; i <= n; i++) {
  let bigger_count = 0;
  let smaller_count = 0;
  for (let j = 1; j <= n; j++) {
    if (graph[i][j] !== INF && i !== j) bigger_count += 1;
  }
  for (let j = 1; j <= n; j++) {
    if (graph[j][i] !== INF && i !== j) smaller_count += 1;
  }
  if (bigger_count + smaller_count === n - 1) count += 1;
}

console.log(count);

// solve 😃 지만 비효율적인것 같다. (더 작은 노드들과 큰 노드들의 개수는 알 필요 없음!)
// 행과 열을 모두 비교해야할때도 for문 두번 돌 필요 없음

//효율적인 코드!
let result = 0;

for (let i = 1; i <= n; i++) {
  let now_count = 0;
  for (let j = 1; j <= n; j++) {
    //현재 index번째의 행과 열을 확인하여 하나라도 INF가 아니면 경로가 존재(=비교 가능)
    if (graph[i][j] !== INF || graph[j][i] !== INF) now_count += 1;
  }
  if (now_count === n) result += 1;
}

console.log(result);
