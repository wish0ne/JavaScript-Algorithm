let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const [x, k] = input[m + 1].split(" ").map(Number);

// 출발지가 1이였다가 k로 바뀌니까 플로이드 워셜 알고리즘

// 2차원 리스트(그래프 표현)을 만들고, 모든 값을 무한으로 초기화
const INF = 999;
const graph = new Array(n + 1).fill().map(() => new Array(n + 1).fill(INF));

// 자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
for (let i = 0; i < n + 1; i++) {
  graph[i][i] = 0;
}

//각 간선에 대한 정보를 입력받아, 그 값으로 초기화
for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a][b] = 1;
  graph[b][a] = 1;
}

// 점화식에 따라 플로이드 워셜 알고리즘을 수행
for (let k = 1; k <= n; k++) {
  for (let a = 1; a <= n; a++) {
    for (let b = 1; b <= n; b++) {
      const cost = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      //   graph[a][b] = cost;
      //   graph[b][a] = cost;
      // ❌ 어차피 a,b를 1~n까지 다 돌기 때문에 두번 처리하는 셈이 됨.
      graph[a][b] = cost;
    }
  }
}
//결과 출력
const answer = graph[1][k] + graph[k][x];
answer >= INF ? console.log(-1) : console.log(answer);

// solve 😃
// 플로이드 워셜 알고리즘을 그대로 사용하는 문제였기 때문에 쉬웠지만, 만약 알고리즘을 외워서 풀어야 했다면 못풀었겠지?! 그래서 외워두는게 좋을 것 같다.
// 중간에 똑같은 과정을 두번 처리하는 등의 비효율적으로 코드를 짜는 실수가 많은것같다. 주의!
// 이 문제는 노드가 100이하로 제한되어있기 때문에 O(N^3)의 플로이드 워셜 알고리즘을 써도 충분하지만, 만약 노드 수가 조금이라도 커진다면 시간초과 날것으로 예상.
// 따라서 그럴경우에는 빠른 다익스트라 알고리즘을 이용하여 (1번에서 K번까지) + (K번에서 X번까지) 다익스트라를 2번 돌려서 풀어도 가능할 것 같다.

// 5 7
// 1 2
// 1 3
// 1 4
// 2 4
// 3 4
// 3 5
// 4 5
// 4 5
