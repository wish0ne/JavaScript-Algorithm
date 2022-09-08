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

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const [n, m] = input[0].split(" ").map(Number);
const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].trim().split("").map(Number));

function bfs() {
  const queue = new DoublyLinkedList();
  const visited = new Array(n);
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(m);
    for (let j = 0; j < m; j++) visited[i][j] = new Array(2).fill(false);
  }

  queue.append([0, 0, 0, 1]); //x, y, 벽 부술 수 있는지 여부(0이면 가능), count
  visited[0][0][0] = true;

  while (!queue.isEmpty()) {
    const [x, y, isBreak, count] = queue.deleteHead();
    if (x === n - 1 && y === m - 1) {
      return count;
    }
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (!visited[nx][ny][isBreak]) {
        if (board[nx][ny] === 1 && isBreak === 0) {
          queue.append([nx, ny, 1, count + 1]);
          visited[nx][ny][1] = true;
        } else if (board[nx][ny] === 0) {
          queue.append([nx, ny, isBreak, count + 1]);
          visited[nx][ny][isBreak] = true;
        }
      }
    }
  }
  return -1;
}

console.log(bfs());

//오답 : visited 배열을 3차원으로 해줘야함...! 왜냐면 (x,y)에서 벽을 부쉈을때랑 안부쉈을때랑 구분해야하기때문...
//2차원으로 했더니 다른 벽을 부수고 (x,y)을 지나갔을때 때문에 (x,y)에서 벽을 못부수고 지나게됨
//이건 반례를 못찾은게 아니고 그냥 로직부터 틀린거...😭
//https://www.acmicpc.net/board/view/27386

//해설
//정점의 정의 : 하나의 정점에서 할 수 있는 건 항상 같아야함.
//따라서 하나의 정점에서 다른 행동을 할 수 있는 요인 : 벽을 부순 횟수를 정점에 추가해야한다.
const dist = new Array(n);
for (let i = 0; i < n; i++) {
  dist[i] = new Array(m);
  for (let j = 0; j < m; j++) dist[i][j] = new Array(2).fill(0);
}

const q = new DoublyLinkedList();
q.append([0, 0, 0]);
dist[0][0][0] = 1;
while (!q.isEmpty()) {
  const [x, y, z] = q.deleteHead(); //z : 벽을 부순 횟수 (0 or 1)
  for (let k = 0; k < 4; k++) {
    let nx = x + dx[k];
    let ny = y + dy[k];
    if (0 <= nx && nx < n && 0 <= ny && ny < m) {
      //다음칸이 빈칸일때
      if (board[nx][ny] === 0 && dist[nx][ny][z] === 0) {
        dist[nx][ny][z] = dist[x][y][z] + 1;
        q.append([nx, ny, z]);
      }
      //다음칸이 벽이고 벽을 부순횟수가 0번이고 다음칸에 벽을 부수고 간적이 없을때
      if (z === 0 && board[nx][ny] === 1 && dist[nx][ny][1] === 0) {
        dist[nx][ny][1] = dist[x][y][z] + 1;
        q.append([nx, ny, 1]);
      }
    }
  }
}

if (dist[n - 1][m - 1][0] !== 0 && dist[n - 1][m - 1][1] !== 0)
  console.log(Math.min(...dist[n - 1][m - 1]));
else if (dist[n - 1][m - 1][0] !== 0) console.log(dist[n - 1][m - 1][0]);
else if (dist[n - 1][m - 1][1] !== 0) console.log(dist[n - 1][m - 1][1]);
else console.log(-1);
