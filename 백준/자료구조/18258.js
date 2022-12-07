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

  front() {
    if (!this.head) return -1;
    return this.head.value;
  }

  back() {
    if (!this.tail) return -1;
    return this.tail.value;
  }

  isEmpty() {
    return this.size === 0;
  }
}

import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const queue = new DoublyLinkedList();

const answer = [];
for (let i = 1; i <= n; i++) {
  const [inst, number] = input[i].trim().split(" ");
  if (inst === "push") {
    queue.append(parseInt(number));
  } else if (inst === "pop") {
    queue.isEmpty() ? answer.push(-1) : answer.push(queue.deleteHead());
  } else if (inst === "size") {
    answer.push(queue.size);
  } else if (inst === "empty") {
    queue.isEmpty() ? answer.push(1) : answer.push(0);
  } else if (inst === "front") {
    answer.push(queue.front());
  } else if (inst === "back") {
    answer.push(queue.back());
  }
}
console.log(answer.join("\n"));

//solve
//큐 기본 개념 문제
