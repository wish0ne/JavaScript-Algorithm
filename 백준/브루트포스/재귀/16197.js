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

import { timeStamp } from "console";
import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].trim().split(""));

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const coins = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "o") coins.push([i, j]);
  }
}

const visited = new Array(n);
for (let i = 0; i < n; i++) {
  visited[i] = new Array(m);
  for (let j = 0; j < m; j++) visited[i][j] = new Array(2).fill(false);
}

coins.push(0);
function bfs() {
  const queue = new DoublyLinkedList();
  queue.append(coins);

  while (!queue.isEmpty()) {
    const [coin1, coin2, count] = queue.deleteHead();
    if (count > 9) return -1;
    const [x1, y1] = coin1;
    const [x2, y2] = coin2;

    //방문처리
    visited[x1][y1][0] = true;
    visited[x2][y2][1] = true;

    //상하좌우 이동
    for (let i = 0; i < 4; i++) {
      let nx1 = x1 + dx[i];
      let ny1 = y1 + dy[i];
      let nx2 = x2 + dx[i];
      let ny2 = y2 + dy[i];

      //동전 떨어짐
      let fall = 0;
      if (nx1 < 0 || nx1 >= n || ny1 < 0 || ny1 >= m) fall += 1;
      if (nx2 < 0 || nx2 >= n || ny2 < 0 || ny2 >= m) fall += 1;
      if (fall === 1) return count + 1; //정답
      if (fall > 1) continue;

      //벽이라면 제자리
      //✔오답 : visited 확인보다 먼저 해야함
      if (board[nx1][ny1] === "#") {
        nx1 = x1;
        ny1 = y1;
      }
      if (board[nx2][ny2] === "#") {
        nx2 = x2;
        ny2 = y2;
      }

      if (visited[nx1][ny1][0] && visited[nx2][ny2][1]) continue;
      //if (board[nx1][ny1] === "#" && board[nx2][ny2] === "#") continue; //✔메모리 초과 해결

      queue.append([[nx1, ny1], [nx2, ny2], count + 1]);
    }
  }
  return -1;
}

const answer = bfs();
console.log(answer);

//메모리 초과 ) 큐에 들어가는 갯수를 줄이기 위해 조건을 추가해야한다.
//오답 ) 벽이라면 제자리 처리하는 걸 방문 check 및 board check보다 먼저 해야함 (왜? ;;)

//해설
//재귀 이용(dfs에 가까움)
let x1 = -1;
let y1 = -1;
let x2 = -1;
let y2 = -1;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === "o") {
      if (x1 === -1) {
        x1 = i;
        y1 = j;
      } else {
        x2 = i;
        y2 = j;
      }
      board[i][j] = "."; //동전 있는 칸도 빈칸으로 만듦
    }
  }
}

function go(step, x1, y1, x2, y2) {
  if (step === 11) return -1; //불가능한 경우
  let fall1 = false;
  let fall2 = false;
  if (x1 < 0 || x1 >= n || y1 < 0 || y1 >= m) fall1 = true;
  if (x2 < 0 || x2 >= n || y2 < 0 || y2 >= m) fall2 = true;
  if (fall1 && fall2) return -1; //불가능한 경우 : 두 동전 다 떨어진 경우
  if (fall1 || fall2) return step; //정답인 경우 : 하나만 떨어진 경우에 최소횟수 return

  let ans = -1;
  for (let k = 0; k < 4; k++) {
    let nx1 = x1 + dx[k];
    let ny1 = y1 + dy[k];
    let nx2 = x2 + dx[k];
    let ny2 = y2 + dy[k];

    //벽이면 이동하지 않음
    if (nx1 >= 0 && nx1 < n && ny1 >= 0 && ny1 < m && board[nx1][ny1] === "#") {
      nx1 = x1;
      ny1 = y1;
    }
    if (nx2 >= 0 && nx2 < n && ny2 >= 0 && ny2 < m && board[nx2][ny2] === "#") {
      nx2 = x2;
      ny2 = y2;
    }
    let temp = go(step + 1, nx1, ny1, nx2, ny2);
    if (temp === -1) continue; //불가능한 경우면 넘어감
    if (ans === -1 || ans > temp) ans = temp; //가능하면 최소값 return
  }
  return ans;
}

console.log(go(0, x1, y1, x2, y2));
