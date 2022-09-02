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

const n = parseInt(input[0]);
const [r1, c1, r2, c2] = input[1].split(" ").map(Number);

const dr = [-2, -2, 0, 0, 2, 2];
const dc = [-1, 1, -2, 2, -1, 1];

const board = [];
for (let i = 0; i < n; i++) board.push(new Array(n).fill(-1));

function bfs() {
  const queue = new DoublyLinkedList();
  queue.append([r1, c1]);
  board[r1][c1] = 0;

  while (!queue.isEmpty()) {
    let [r, c] = queue.deleteHead();
    for (let i = 0; i < 6; i++) {
      let nr = r + dr[i];
      let nc = c + dc[i];
      if (nr < 0 || nr >= n || nc < 0 || nc >= n) continue;
      if (board[nr][nc] === -1) {
        queue.append([nr, nc]);
        board[nr][nc] = board[r][c] + 1;
      }
    }
  }
}

bfs();
console.log(board[r2][c2]);

//solve
//아주 기본적인 bfs 문제였다 기초익히기 좋음

//해설
const dx = [-2, -2, 0, 0, 2, 2];
const dy = [-1, 1, -2, 2, -1, 1];

const dist = []; //최소 이동 횟수 저장 배열
for (let i = 0; i < 200; i++) dist.push(new Array(200).fill(-1));

const N = parseInt(input[0]);
const [sx, sy, ex, ey] = input[1].split(" ").map(Number);

const q = new DoublyLinkedList();
//시작점 처리
q.append([sx, sy]);
dist[sx][sy] = 0;

while (!q.isEmpty()) {
  let [x, y] = q.deleteHead();
  for (let i = 0; i < 6; i++) {
    let nx = x + dx[i];
    let ny = y + dy[i];
    //범위 검사
    if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
      //방문한 적 없으면
      if (dist[nx][ny] === -1) {
        q.append([nx, ny]);
        dist[nx][ny] = dist[x][y] + 1;
      }
    }
  }
}

console.log(dist[ex][ey]);
