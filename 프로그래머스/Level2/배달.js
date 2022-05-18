function solution(N, road, K) {
  const INF = 999999999;

  //2차원 배열(그래프 표현)을 만들고, 모든 값을 무한으로 초기화
  const graph = new Array(N + 1);
  for (let i = 0; i < N + 1; i++) {
    graph[i] = new Array(N + 1).fill(INF);
  }

  //자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
  for (let a = 1; a < N + 1; a++) {
    graph[a][a] = 0;
  }

  //각 간선에 대한 정보를 입력받아, 그 값으로 초기화
  for (let i = 0; i < road.length; i++) {
    //A에서 B로 가는 비용은 C라고 설정
    const [a, b, c] = road[i];
    graph[a][b] = Math.min(c, graph[a][b]);
    graph[b][a] = Math.min(c, graph[a][b]);
  }

  //점화식에 따라 플로이드 워셜 알고리즘을 수행
  for (let k = 1; k < N + 1; k++) {
    for (let a = 1; a < N + 1; a++) {
      for (let b = 1; b < N + 1; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }

  let answer = 0;
  for (let i = 1; i < N + 1; i++) console.log(graph[i]);
  for (let i = 1; i < N + 1; i++) if (graph[1][i] <= K) answer += 1;

  return answer;
}

//solve
//플로이드 워셜 알고리즘

console.log(
  solution(
    6,
    [
      [1, 2, 1],
      [1, 3, 2],
      [2, 3, 2],
      [3, 4, 3],
      [3, 5, 2],
      [3, 5, 3],
      [5, 6, 1],
    ],
    4
  )
);
