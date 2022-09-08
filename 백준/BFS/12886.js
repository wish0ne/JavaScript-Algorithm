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

const [a, b, c] = input[0].split(" ").map(Number);

const visited = new Set();

function bfs() {
  const q = new DoublyLinkedList();
  q.append([a, b, c]);
  visited.add(`${a}-${b}-${c}`);
  while (!q.isEmpty()) {
    const [a, b, c] = q.deleteHead();
    if (check(a, b, c)) return 1;
    if (a !== b) {
      let na;
      let nb;
      if (a > b) {
        na = a - b;
        nb = b + b;
      } else {
        na = a + a;
        nb = b - a;
      }
      if (!visited.has(`${na}-${nb}-${c}`)) {
        q.append([na, nb, c]);
        visited.add(`${na}-${nb}-${c}`);
      }
    }
    if (b !== c) {
      let nb;
      let nc;
      if (b > c) {
        nb = b - c;
        nc = c + c;
      } else {
        nb = b + b;
        nc = c - b;
      }
      if (!visited.has(`${a}-${nb}-${nc}`)) {
        q.append([a, nb, nc]);
        visited.add(`${a}-${nb}-${nc}`);
      }
    }

    if (a !== c) {
      let na;
      let nc;
      if (a > c) {
        na = a - c;
        nc = c + c;
      } else {
        na = a + a;
        nc = c - a;
      }
      if (!visited.has(`${na}-${b}-${nc}`)) {
        q.append([na, b, nc]);
        visited.add(`${na}-${b}-${nc}`);
      }
    }
  }
  return 0;
}

function check(a, b, c) {
  if (a === b && b === c && a === c) return true;
  return false;
}

console.log(bfs());

//solve
//visited배열이 최대 1000^3으로 커질 수 있을것 같아서 고민했는데 배열로 미리 설정하지 말고 집합으로 나오는 가짓수만 넣어서 관리했더니 메모리초과 안나고 통과되었당 그거 말고는 쉬운 문제

//해설
//전체 돌그룹 개수의 합은 절대 변하지 않는다
//-> a,b만 있으면 c를 만들어낼 수 있으므로 복잡도를 세제곱에서 제곱으로 낮출 수 있다.
const checking = new Array(1501);
for (let i = 0; i < 1501; i++) checking[i] = new Array(1501).fill(false);
const [x, y, z] = input[0].split(" ").map(Number);
const s = x + y + z;

//전체 돌 개수의 합이 3으로 나누어떨어지지 않으면 불가능
if (s % 3 !== 0) console.log(0);
else {
  go(x, y);
  if (checking[parseInt(s / 3)][parseInt(s / 3)]) console.log(1);
  else console.log(0);
}

//돌그룹 1번(x), 2번(y)가 시작으로 적절한지 비교
//DFS
function go(x, y) {
  if (checking[x][y]) return;
  checking[x][y] = true;
  let a = [x, y, s - x - y];
  //i : 작은거 j : 큰거
  //모든 경우의 수 확인
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (a[i] < a[j]) {
        let b = [x, y, s - x - y];
        b[i] += a[i];
        b[j] -= a[i];
        go(b[0], b[1]);
      }
    }
  }
}
