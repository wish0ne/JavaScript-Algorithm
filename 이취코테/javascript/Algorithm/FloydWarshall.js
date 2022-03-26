import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const INF = 999999999;

//노드의 개수 및 간선의 개수 입력받기
const n = parseInt(input[0]);
const m = parseInt(input[1]);

//2차원 배열(그래프 표현)을 만들고, 모든 값을 무한으로 초기화
const graph = new Array(n + 1);
for (let i = 0; i < n + 1; i++) {
  graph[i] = new Array(n + 1).fill(INF);
}

//자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
for (let a = 1; a < n + 1; a++) {
  graph[a][a] = 0;
}

//각 간선에 대한 정보를 입력받아, 그 값으로 초기화
for (let i = 2; i < m + 2; i++) {
  //A에서 B로 가는 비용은 C라고 설정
  const [a, b, c] = input[i].split(" ").map(Number);
  graph[a][b] = c;
}

//점화식에 따라 플로이드 워셜 알고리즘을 수행
for (let k = 1; k < n + 1; k++) {
  for (let a = 1; a < n + 1; a++) {
    for (let b = 1; b < n + 1; b++) {
      graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
    }
  }
}

//수행된 결과 출력
let answer = "";
for (let a = 1; a < n + 1; a++) {
  for (let b = 1; b < n + 1; b++) {
    //도달할 수 없는 경우 무한 출력
    if (graph[a][b] === INF) answer += "INFINITY ";
    else answer += graph[a][b] + " ";
  }
  answer += "\n";
}
console.log(answer);

// 4
// 7
// 1 2 4
// 1 4 6
// 2 1 3
// 2 3 7
// 3 1 5
// 3 4 4
// 4 3 2
