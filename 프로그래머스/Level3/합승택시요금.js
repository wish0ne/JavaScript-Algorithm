//s -> 환승노드 -> 각자 집
function solution(n, s, a, b, fares) {
  const INF = Number.MAX_SAFE_INTEGER;
  const graph = new Array(n + 1);
  for (let i = 0; i < n + 1; i++) {
    graph[i] = new Array(n + 1).fill(INF);
  }

  //자기 자신에서 자기 자신으로 가는 비용은 0으로 초기화
  for (let a = 1; a < n + 1; a++) {
    graph[a][a] = 0;
  }

  //각 간선에 대한 정보를 입력받아, 그 값으로 초기화
  for (let i = 0; i < fares.length; i++) {
    //A에서 B로 가는 비용은 C라고 설정
    const [a, b, c] = fares[i];
    graph[a][b] = c;
    graph[b][a] = c;
  }

  //점화식에 따라 플로이드 워셜 알고리즘을 수행
  for (let k = 1; k < n + 1; k++) {
    for (let a = 1; a < n + 1; a++) {
      for (let b = 1; b < n + 1; b++) {
        graph[a][b] = Math.min(graph[a][b], graph[a][k] + graph[k][b]);
      }
    }
  }

  let fare = INF;
  for (let i = 1; i < n + 1; i++) {
    let temp = graph[s][i];
    temp += graph[i][a];
    temp += graph[i][b];
    fare = Math.min(fare, temp);
  }
  return fare;
}

console.log(
  solution(6, 4, 6, 2, [
    [4, 1, 10],
    [3, 5, 24],
    [5, 6, 2],
    [3, 1, 41],
    [5, 1, 24],
    [4, 6, 50],
    [2, 4, 66],
    [2, 3, 22],
    [1, 6, 25],
  ])
);

//solve
//플로이드 워셜 이용하니까 엄청 쉬웠던 문제
