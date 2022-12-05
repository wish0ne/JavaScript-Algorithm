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

const [n, m, v] = input[0].split(" ").map(Number);

const graph = new Array(n + 1);
for (let i = 0; i <= n; i++) graph[i] = [];

for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

//번호 작은것부터 탐색하기 위해 정렬
for (let i = 1; i <= n; i++) {
  graph[i].sort((a, b) => a - b);
}

//dfs 수행
const dfs_answer = [];
let visited = new Array(n + 1).fill(false);
function dfs(v) {
  visited[v] = true;
  dfs_answer.push(v);
  for (let i of graph[v]) {
    if (!visited[i]) {
      dfs(i);
    }
  }
}
dfs(v);
console.log(dfs_answer.join(" "));

//bfs 수행
const bfs_answer = [];
visited = new Array(n + 1).fill(false);

const q = new DoublyLinkedList();
q.append(v);
visited[v] = true;

while (!q.isEmpty()) {
  const v = q.deleteHead();
  bfs_answer.push(v);
  for (let i of graph[v]) {
    if (!visited[i]) {
      visited[i] = true;
      q.append(i);
    }
  }
}
console.log(bfs_answer.join(" "));

//solve
//쉬운 bfs/dfs 문제
//번호가 더 작은 정점부터 방문하기 위해 인접리스트 정렬하는것만 추가됨
