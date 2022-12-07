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
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

//모든 노드에 대한 진입차수는 0으로 초기화
const indegree = new Array(n + 1).fill(0);

//각 노드에 연결된 간선 정보를 담기 위한 연결리스트(그래프) 초기화
const graph = new Array(n + 1);
for (let i = 1; i < n + 1; i++) {
  graph[i] = [];
}

//방향 그래프의 모든 간선 정보 입력받기
for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b); //a에서 b로 이동가능
  indegree[b] += 1; //진입차수 1 증가
}

//위상 정렬 함수
function topology_sort() {
  const q = new DoublyLinkedList();

  //처음 시작할때는 진입차수가 0인 노드를 큐에 삽입
  for (let i = 1; i < n + 1; i++) {
    if (indegree[i] === 0) {
      q.append(i);
      answer[i - 1] = 1;
    }
  }

  //큐가 빌때까지 반복
  while (!q.isEmpty()) {
    //큐에서 원소 꺼내기
    const now = q.deleteHead();
    //해당 원소와 연결된 노드들의 진입차수에서 1 빼기
    for (let i of graph[now]) {
      indegree[i] -= 1;
      //새롭게 진입차수가 0이 되는 노드를 큐에 삽입
      if (indegree[i] === 0) {
        q.append(i);
        answer[i - 1] = answer[now - 1] + 1;
      }
    }
  }
}

const answer = new Array(n).fill(0);
topology_sort();
console.log(answer.join(" "));

//solve
//위상정렬 개념 문제
