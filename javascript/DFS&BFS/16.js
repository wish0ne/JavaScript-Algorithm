import fs from "fs";
import DoublyLinkedList from "../Data Structure/DoublyLinkedList.js";
import Combination from "../Algorithm/Combination.js";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const empty = []; //빈 공간 좌표 배열
const virus = []; //바이러스 좌표 배열
//입력받기
const graph = new Array(n);
for (let i = 0; i < n; i++) {
  const arr = input[i + 1].split(" ").map(Number);
  arr.forEach((a, index) => {
    if (a === 0) empty.push([i, index]);
    else if (a === 2) virus.push([i, index]);
  });
  graph[i] = arr;
}

//상 하 좌 우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

//가능한 벽 3개의 조합 구하기
const walls = Combination(empty, 3);

const bfs = (graph, start, visited) => {
  const q = new DoublyLinkedList();
  q.append(start);
  visited[start[0]][start[1]] = true;

  while (!q.isEmpty()) {
    const [x, y] = q.deleteHead();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (graph[nx][ny] === 1) continue;
      if (!visited[nx][ny]) {
        visited[nx][ny] = true;
        graph[nx][ny] = 2;
        q.append([nx, ny]);
      }
    }
  }
};

//안전 영역 개수 세기
const count_safe_area = (graph) => {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === 0) count += 1;
    }
  }
  return count;
};

let safe_area = 0;
//가능한 모든 벽 조합에 대해서 연산
for (let i = 0; i < walls.length; i++) {
  //임시 맵 생성
  const temp = [...graph];
  for (let j = 0; j < n; j++) {
    temp[j] = [...graph[j]];
  }

  //방문 여부 저장 배열 초기화
  const visited = new Array(n);
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(m).fill(false);
  }

  //벽 3개 세움
  temp[walls[i][0][0]][walls[i][0][1]] = 1;
  temp[walls[i][1][0]][walls[i][1][1]] = 1;
  temp[walls[i][2][0]][walls[i][2][1]] = 1;

  //바이러스 전염 시작
  for (let j = 0; j < virus.length; j++) {
    bfs(temp, virus[j], visited);
  }

  //바이러스 확산 끝난 후 안전 영역 개수 비교
  safe_area = Math.max(safe_area, count_safe_area(temp));
}

console.log(safe_area);

// not solve
// 벽을 세울 수 있는 모든 경우를 계산 -> 그중에서 안전영역 최대값 선택
// 최대값을 구해라 -> 모든 경우를 계산한 뒤 최대값을 선택하기 -> 문제 조건 범위 확인하고, 작으면 완전탐색으로 해결
// ⭐⭐완전탐색⭐⭐ BFS/DFS나 DP에서 생각해보기
