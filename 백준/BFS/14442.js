class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //연결리스트의 맨 뒤에 추가
  append(value) {
    const node = new Node(value);
    //list가 비었을때
    if (!this.head) {
      this.head = node;
      this.tail = node;
    }
    //list에 node가 존재할때
    else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size += 1;
    return this;
  }

  //연결리스트의 맨 앞을 삭제
  deleteHead() {
    //연결리스트가 비었을때
    if (this.isEmpty()) {
      return null;
    }

    const deletedHead = this.head;
    //리스트에 노드가 하나밖에 없을때
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    }
    //리스트에 노드가 여러개인 경우
    else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size -= 1;
    return deletedHead.value;
  }

  delete(node) {
    if (node === this.head) {
      if (node === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = node.next;
        node.next.prev = null;
      }
    } else if (node === this.tail) {
      this.tail = node.prev;
      node.prev.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
    this.size -= 1;
  }

  print() {
    let iter = this.head;
    let print = "";
    while (iter !== null) {
      print += `${iter.value} `;
      iter = iter.next;
    }
    console.log(print);
  }

  isEmpty() {
    return this.size === 0;
  }
}

import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m, k] = input[0].split(" ").map(Number);

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const map = new Array(n);
for (let i = 1; i <= n; i++) map[i - 1] = input[i].split("").map(Number);

//3차원 방문배열 (x, y, 벽을 부순 횟수)
const visited = new Array(n);
for (let i = 0; i < n; i++) {
  visited[i] = new Array(m);
  for (let j = 0; j < m; j++) visited[i][j] = new Array(k + 1).fill(-1); //0번~k번 부술수있으므로 k+1개 생성
}

function bfs() {
  const queue = new DoublyLinkedList();
  queue.append([0, 0, 0]); //x, y, 벽을 부순 횟수
  visited[0][0][0] = 1; //최소이동횟수 기록
  if (0 === n - 1 && 0 === m - 1) return visited[0][0][0]; //✔예외처리
  while (!queue.isEmpty()) {
    const [x, y, z] = queue.deleteHead();

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      //갈 수 있는 빈칸이면
      if (map[nx][ny] === 0 && visited[nx][ny][z] === -1) {
        if (nx === n - 1 && ny === m - 1) return visited[x][y][z] + 1;
        //벽을 안부수고 감
        queue.append([nx, ny, z]);
        visited[nx][ny][z] = visited[x][y][z] + 1;
      }

      //벽이라면
      else {
        //부수고 갈 수 있으면 가기
        if (z < k && visited[nx][ny][z + 1] === -1) {
          if (nx === n - 1 && ny === m - 1) return visited[x][y][z] + 1;
          queue.append([nx, ny, z + 1]);
          visited[nx][ny][z + 1] = visited[x][y][z] + 1;
        }
      }
    }
  }

  return -1;
}

console.log(bfs());

//벽 부수고 이동하기1 문제와 동일한 문제
//1. 메모리 초과 -> 도착점 확인을 한칸 전에 하고, bfs 파라미터를 3개로 줄여서 해결
//2. 오답 -> while문을 아예 안돌때!!! 즉 시작점==도착점일때 예외처리.... 엣지케이스 꼭 확인하기...

//해설
//맵
const a = new Array(n);
for (let i = 1; i <= n; i++) a[i - 1] = input[i].split("").map(Number);

//최단 거리 저장
const d = new Array(n);
for (let i = 0; i < n; i++) {
  d[i] = new Array(m);
  for (let j = 0; j < m; j++) d[i][j] = new Array(k + 1).fill(0);
}

const q = new DoublyLinkedList();
q.append([0, 0, 0]); //x, y, 벽을 부순 횟수
d[0][0][0] = 1; //최소이동횟수 기록

while (!q.isEmpty()) {
  const [x, y, z] = q.deleteHead();

  for (let i = 0; i < 4; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
    //갈 수 있는 빈칸이면
    if (a[nx][ny] === 0 && d[nx][ny][z] === 0) {
      //벽을 안부수고 감
      q.append([nx, ny, z]);
      d[nx][ny][z] = d[x][y][z] + 1;
    }

    //벽이라면
    if (z + 1 <= k && a[nx][ny] === 1 && d[nx][ny][z + 1] === 0) {
      //부수고 갈 수 있으면 가기
      q.append([nx, ny, z + 1]);
      d[nx][ny][z + 1] = d[x][y][z] + 1;
    }
  }
}

let ans = -1;
//i번 벽을 부수고 도착점에 도달한 모든 경우 중 최소값 찾기
for (let i = 0; i <= k; i++) {
  if (d[n - 1][m - 1][i] === 0) continue; //도달하지 못한 경우
  if (ans === -1) ans = d[n - 1][m - 1][i]; //처음 도달한 값이면 갱신
  else if (ans > d[n - 1][m - 1][i]) ans = d[n - 1][m - 1][i]; //최소값이면 갱신
}
console.log(ans);
