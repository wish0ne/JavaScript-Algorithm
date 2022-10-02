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

const [n, m] = input[0].split(" ").map(Number); //n명, m번 비교

const graph = new Array(n + 1);
for (let i = 0; i <= n; i++) graph[i] = [];

const indegree = new Array(n + 1).fill(0);

for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number); //a가 b의 앞에 위치 (a -> b)
  graph[a].push(b);
  indegree[b] += 1;
}

const queue = new DoublyLinkedList();
for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) queue.append(i);
}

let answer = "";

while (!queue.isEmpty()) {
  const v = queue.deleteHead();
  answer += v + " ";
  for (let n of graph[v]) {
    indegree[n] -= 1;
    if (indegree[n] === 0) {
      queue.append(n);
    }
  }
}

console.log(answer);

//solve
//위상정렬 개념 문제

//해설
//위상정렬 알고리즘

//bfs 풀이 (동일하므로 생략)
//dfs 풀이
const a = new Array(n + 1);
for (let i = 0; i <= n; i++) a[i] = [];

const check = new Array(n + 1).fill(false);

for (let i = 1; i <= m; i++) {
  const [x, y] = input[i].split(" ").map(Number); //x가 y의 앞에 위치 (x -> y)
  a[y].push(x); //간선 뒤집어서 저장
}

let ans = "";

//dfs
function go(x) {
  check[x] = true;
  for (let y of a[x]) {
    if (!check[y]) go(y);
  }
  ans += x + " "; //스택에서 빠져나올때(더 이상 방문할 정점이 없을때) 출력
}

for (let i = 1; i <= n; i++) {
  if (!check[i]) go(i);
}

console.log(ans);
