import fs from "fs";
import DoublyLinkedList from "../Data Structure/DoublyLinkedList.js";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
const INF = 999999999;
// 상 하 좌 우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

//그래프 생성
const graph = [];
for (let i = 1; i <= n; i++) {
  graph.push(input[i].split(" ").map(Number));
}

const bfs = (start, visited) => {
  //큐 생성
  const q = new DoublyLinkedList();
  q.append(start);
  //현재 노드 방문 처리
  visited[start[0]][start[1]] = true;
  let min_fish = [INF, INF, INF]; //먹을 물고기의 x좌표, y좌표, 거리(시간)
  //큐가 빌때까지 반복
  while (!q.isEmpty()) {
    const [x, y, t] = q.deleteHead();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      //벗어날 경우
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      //상어보다 큰 물고기인 경우
      if (graph[nx][ny] > shark_size) continue;
      //갈 수 있는 곳이고 방문하지 않았으면
      if (visited[nx][ny] === false) {
        visited[nx][ny] = true;
        q.append([nx, ny, t + 1]);

        //물고기가 있으면
        if (graph[nx][ny] > 0 && graph[nx][ny] < shark_size) {
          //도달하는데 걸리는 시간 비교 (최단 거리 찾기)
          if (min_fish[2] > t + 1) {
            min_fish = [nx, ny, t + 1];
          } else if (min_fish[2] === t + 1) {
            //위의 물고기부터 먹음
            if (min_fish[0] > nx) {
              min_fish = [nx, ny, t + 1];
            } else if (min_fish[0] === nx) {
              //또 같다면 왼쪽부터 먹음
              if (min_fish[1] > ny) {
                min_fish = [nx, ny, t + 1];
              }
            }
          }
        }
      }
    }
  }
  //console.log(min_fish);
  return min_fish;
};

let shark_size = 2; //상어 크기
let eat_fish = 0; //먹은 물고기 수
let shark = [0, 0, 0]; //상어 위치, time

//상어 위치 찾기
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === 9) {
      shark = [i, j, 0]; //x좌표, y좌표, time
      graph[i][j] = 0;
      break;
    }
  }
}

while (true) {
  const visited = new Array(n);
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(n).fill(false);
  }
  const [x, y, t] = bfs(shark, visited); //bfs로 먹을 물고기 찾기
  if (t === INF) break; //못찾으면 break
  //물고기 먹음
  graph[x][y] = 0;
  eat_fish += 1;
  //상어 크기 업데이트
  if (eat_fish === shark_size) {
    shark_size += 1;
    eat_fish = 0;
  }
  shark = [x, y, t]; //상어 이동
}

console.log(shark[2]);

//not solve 😭 그래도 혼자 풀어본 코드
//어려웠던 점들
//1) BFS 문제임을 뒤늦게 깨달음 -> 2차원 배열에서의 탐색 문제인 경우 그래프 형태로 바꾼다음 고민하는 연습
//2) DFS/BFS 개념 이해 부족 -> 문제 경험 부족, BFS안의 처리과정에서 현재 노드의 '다음 노드'를 고려하는 점 이해 부족
//3) 매번 BFS를 돌때마다 visited를 초기화 해줘야 한다고 생각했을때 너무 비효율적이라 틀린 아이디어라고 생각해서 멈춤 -> 맞는 코드였음 ㅠ
//⭐⭐약한 DP, DFS/BFS 보완하기⭐⭐
