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

  //맨 앞에 추가
  push(value) {
    const node = new Node(value);
    //list가 비었을때
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.size += 1;
    return this;
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

  //맨 뒤를 삭제
  deleteTail() {
    if (this.isEmpty()) {
      return -1;
    }
    const deleted = this.tail;
    if (!this.head.next) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = deleted.prev;
      this.tail.next = null;
    }
    this.size -= 1;
    return deleted.value;
  }

  //연결리스트의 맨 앞을 삭제
  deleteHead() {
    //연결리스트가 비었을때
    if (this.isEmpty()) {
      return -1;
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

  isEmpty() {
    return this.size === 0;
  }

  getHead() {
    return this.head ? this.head.value : -1;
  }

  getTail() {
    return this.tail ? this.tail.value : -1;
  }
}

import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const list = new DoublyLinkedList();
const answer = [];
for (let i = 1; i <= n; i++) {
  const inst = input[i].split(" ");
  switch (inst[0].trim()) {
    case "push_front":
      list.push(parseInt(inst[1]));
      break;
    case "push_back":
      list.append(parseInt(inst[1]));
      break;
    case "pop_front":
      answer.push(list.deleteHead());
      break;
    case "pop_back":
      answer.push(list.deleteTail());
      break;
    case "size":
      answer.push(list.size);
      break;
    case "empty":
      list.isEmpty() ? answer.push(1) : answer.push(0);
      break;
    case "front":
      answer.push(list.getHead());
      break;
    case "back":
      answer.push(list.getTail());
      break;
  }
}

console.log(answer.join("\n"));

//solve
//이중연결리스트 자료구조 이용한 문제
//N이 10,000이라서 unshift, shift 써도 됨 근데 왜
//배열 unshift, shift쓰는게 왜 더 빠르지..?
const deque = [];
const answer2 = [];
for (let i = 1; i <= n; i++) {
  const inst = input[i].split(" ");
  switch (inst[0].trim()) {
    case "push_front":
      deque.unshift(parseInt(inst[1]));
      break;
    case "push_back":
      deque.push(parseInt(inst[1]));
      break;
    case "pop_front":
      deque.length === 0 ? answer2.push(-1) : answer2.push(deque[0]);
      deque.shift();
      break;
    case "pop_back":
      deque.length === 0 ? answer2.push(-1) : answer2.push(deque.pop());
      break;
    case "size":
      answer2.push(deque.length);
      break;
    case "empty":
      deque.length === 0 ? answer2.push(1) : answer2.push(0);
      break;
    case "front":
      deque.length === 0 ? answer2.push(-1) : answer2.push(deque[0]);
      break;
    case "back":
      deque.length === 0
        ? answer2.push(-1)
        : answer2.push(deque[deque.length - 1]);
      break;
  }
}

console.log(answer2.join("\n"));
