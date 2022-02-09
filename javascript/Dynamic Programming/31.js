import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const t = parseInt(input[0]);

//가능한 이전으로의 이동방향 3가지
const dx = [1, 0, -1];
const dy = [-1, -1, -1];

for (let i = 1; i < 2 * t; i += 2) {
  //입력받기
  const [n, m] = input[i].split(" ").map(Number);
  const graph = [];
  const arr = input[i + 1].split(" ").map(Number);
  for (let j = 0; j < n * m; j += m) {
    graph.push(arr.slice(j, j + m));
  }

  //dp테이블 생성
  const d = [];
  for (let j = 0; j < n; j++) {
    d.push(new Array(m).fill(0));
  }

  //dp
  for (let x = 0; x < n; x++) {
    d[x][0] = graph[x][0];
  }
  for (let y = 1; y < m; y++) {
    for (let x = 0; x < n; x++) {
      //가능한 이동방향 3가지
      for (let j = 0; j < 3; j++) {
        let px = x + dx[j];
        let py = y + dy[j];
        //예외처리
        if (px < 0 || px >= n || py < 0 || py >= m) continue;
        d[x][y] = Math.max(d[x][y], d[px][py] + graph[x][y]);
      }
    }
  }

  //마지막 열에서 최대값 출력
  let max = 0;
  for (let j = 0; j < n; j++) {
    max = Math.max(max, d[j][m - 1]);
  }
  console.log(max);
}

//dp...또 not solve 😡
//DP : ⭐⭐모든 케이스를 고려⭐⭐한 후, 최선의 값 찾는 경우 vs Greedy : 최선의 값들을 통해 답 찾기
//1. DP table에 무엇을 기록할지 생각 -> 문제에서 요구하는 답
//2. 점화식 생각 -> dp table에 어떻게 답을 기록할지 생각 (하나하나를 보지말고 전체를 생각)

// 2
// 3 4
// 1 3 3 2 2 1 4 1 0 6 4 7
// 4 4
// 1 3 1 5 2 2 4 1 5 0 2 3 0 6 1 2
