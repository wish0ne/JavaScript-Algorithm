function solution1(board) {
  const dx = [-1, 1, 0, 0]; //상, 하, 좌, 우
  const dy = [0, 0, -1, 1];
  const n = board.length;
  const INF = 999999999;
  let min_cost = INF;

  //dp
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      dp[i][j] = new Array(4).fill(INF);
    }
  }

  const dfs = (x, y, d, cost) => {
    //dp + dfs
    if (dp[x][y][d] < cost) return;
    dp[x][y][d] = Math.min(dp[x][y][d], cost);

    //최소비용 계산
    if (x === n - 1 && y === n - 1) {
      min_cost = Math.min(min_cost, cost);
      return;
    }
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (board[nx][ny] === 1) continue;

      //이동
      board[nx][ny] = 1; //방문처리
      if (cost === 0) dfs(nx, ny, i, cost + 100); //처음은 항상 직선거리
      if (d === i || d + i === 1 || d + 1 === 5) dfs(nx, ny, i, cost + 100);
      else dfs(nx, ny, i, cost + 600);
      board[nx][ny] = 0; //방문처리 초기화
    }
  };
  board[0][0] = 1;
  dfs(0, 0, 0, 0);
  return min_cost;
}

import Heap from "../../Data Structure/Heap.js";

function solution(board) {
  const dx = [-1, 1, 0, 0]; //상, 하, 좌, 우
  const dy = [0, 0, -1, 1];
  const n = board.length;
  const INF = 999999999;
  //✔최단 거리 테이블 3차원으로 생성(방향까지 고려)
  const distance = new Array(n);
  for (let i = 0; i < n; i++) {
    distance[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      distance[i][j] = new Array(4).fill(INF);
    }
  }

  const dijkstra = (x, y) => {
    //시작 노드로 가기 위한 최단 경로는 0으로 설정하여, 큐에 삽입
    let q = new Heap();
    q.add([0, x, y, 1]); //거리, x, y, 방향
    q.add([0, x, y, 3]);
    distance[x][y][1] = 0;
    distance[x][y][3] = 0;

    //큐가 비어있지 않다면
    while (!q.isEmpty()) {
      //가장 최단 거리가 짧은 노드에 대한 정보 꺼내기
      const [dist, x, y, d] = q.poll();

      //현재 노드가 이미 처리된 적이 있는 노드라면 무시
      //if (distance[x][y] < dist) continue;

      //현재 노드와 연결된 다른 인접한 노드들을 확인
      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
        if (board[nx][ny] === 1) continue;

        let cost = dist;
        if (dist === 0) cost += 100; //처음은 항상 직선거리
        else if (d === i || d + i === 1 || d + 1 === 5) cost += 100;
        else cost += 600;

        //✔같을때도 큐에 넣어줘야함.
        if (cost <= distance[nx][ny][i]) {
          distance[nx][ny][i] = cost;
          q.add([cost, nx, ny, i]);
        }
      }
    }
  };

  dijkstra(0, 0);

  //✔도착지에 도달했을때의 4 방향 중 최소값 구해야함
  return Math.min(...distance[n - 1][n - 1]);
}

console.log(
  solution1([
    [0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1],
    [0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0],
  ])
);

//1. dfs -> 시간초과
//dfs + 메모이제이션 같이 쓰면 시간초과 해결가능함!!
//https://dev-hunmin.tistory.com/entry/CC-Lv3-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EA%B2%BD%EC%A3%BC%EB%A1%9C-%EA%B1%B4%EC%84%A4
//✔dp를 dfs에 이용하면 시간을 최소화할 수 있다!

//2. 다익스트라 -> 테스트 케이스 2개 실패 😡
//2차원 x,y 위치만 고려하면 항상 최소값을 찾지 않음 -> 방향도 같이 고려해야함
//각 위치에 도달했을때의 방향까지 고려해줘야함.
//https://programmers.co.kr/questions/30355
//방문확인 배열을 3차원으로 생성하여 모든방향까지 고려해줘야함.
