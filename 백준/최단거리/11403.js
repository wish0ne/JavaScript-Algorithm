import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const INF = 999999999;

//2차원 배열(그래프 표현)을 만들고, 모든 값을 무한으로 초기화
const graph = new Array(n);
for (let i = 0; i < n; i++) {
  graph[i] = new Array(n).fill(INF);
}

//각 간선에 대한 정보를 입력받아, 그 값으로 초기화
for (let i = 1; i <= n; i++) {
  const edge = input[i].split(" ").map(Number);
  //i-1에서 edge[j]까지 비용 1
  edge.forEach((e, idx) => {
    if (e === 1) graph[i - 1][idx] = 1;
  });
}

//점화식에 따라 플로이드 워셜 알고리즘을 수행
for (let k = 0; k < n; k++) {
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < n; b++) {
      graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
    }
  }
}

const answer = new Array(n);
for (let i = 0; i < n; i++) answer[i] = new Array(n).fill(0);

const log = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] !== INF) answer[i][j] = 1;
  }
  log.push(answer[i].join(" "));
}

console.log(log.join("\n"));

//solve
//플로이드 워셜 그대로 사용
