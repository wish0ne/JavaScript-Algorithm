import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);
const m = parseInt(input[1]);

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
  const [a, b, c] = input[i + 1].split(" ").map(Number);
  graph[a][b] = Math.min(graph[a][b], c); //중복 노선 중 최소비용 선택
}

//플로이드 워셜 알고리즘 수행
for (let k = 1; k <= n; k++) {
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= n; b++) {
      graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
    }
  }
}

//답 출력
let answer = "";
for (let a = 1; a <= n; a++) {
  for (let b = 1; b <= n; b++) {
    if (graph[a][b] === INF) answer += "0 ";
    else answer += `${graph[a][b]} `;
  }
  answer += "\n";
}
console.log(answer);

//solve😀
//플로이드 워셜 알고리즘 그래도 사용하는 문제 (전형적인 최단경로 문제)
//✔도시의 개수가 100이하이므로 플로이드 워셜 알고리즘 사용하는것이 효과적
//✔문제의 조건에 두 노드를 연결하는 간선이 여러개일 수 있다는 것 뒤늦게 확인해서 시간 소요

// 5
// 14
// 1 2 2
// 1 3 3
// 1 4 1
// 1 5 10
// 2 4 2
// 3 4 1
// 3 5 1
// 4 5 3
// 3 5 10
// 3 1 8
// 1 4 2
// 5 1 7
// 3 4 2
// 5 2 4
