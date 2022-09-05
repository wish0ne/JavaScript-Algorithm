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

const t = parseInt(input[0]);
for (let tc = 1; tc <= t; tc++) {
  const [a, b] = input[tc].split(" ").map(Number);
  const visited = new Array(10000).fill(false);

  let ans = bfs(a, b, visited);
  console.log(ans);
}
function bfs(a, b, visited) {
  const queue = new DoublyLinkedList();
  queue.append([a, ""]);
  visited[a] = true;

  while (!queue.isEmpty()) {
    let [v, command] = queue.deleteHead();
    if (v === b) return command;

    let nv;
    //D
    nv = 2 * v;
    if (nv > 9999) nv %= 10000;
    if (!visited[nv]) {
      queue.append([nv, command + "D"]);
      visited[nv] = true;
    }
    //S
    if (v === 0) nv = 9999;
    else nv = v - 1;
    if (!visited[nv]) {
      queue.append([nv, command + "S"]);
      visited[nv] = true;
    }
    //L :자릿수 왼편 이동
    nv = 0;
    let d4 = v % 10;
    let d3 = (v % 100) - d4;
    let d2 = (v % 1000) - d3 - d4;
    let d1 = v - d2 - d3 - d4;
    nv = d2 * 10 + d3 * 10 + d4 * 10 + d1 / 1000;
    if (!visited[nv]) {
      queue.append([nv, command + "L"]);
      visited[nv] = true;
    }

    //R : 자릿수 오른편 이동
    nv = d4 * 1000 + d1 / 10 + d2 / 10 + d3 / 10;
    if (!visited[nv]) {
      queue.append([nv, command + "R"]);
      visited[nv] = true;
    }
  }
}

//하...진짜 고생한 문제
//시간초과 : 처음에는 string으로 a를 가지고 다니면서 D, S일때는 숫자로 변환하고 L, R일때는 새로운 문자열에 인덱스 맞춰서 복사하는 형식 -> string이 길어져서 시간초과 나는듯
//L, R 연산이 숫자가 자릿수에 따라 달라지니까 엄청 어렵게 느껴졌는데, 최대 4자리 숫자인걸 아니까 4자리라고 생각하고 연산했더니 엄청 쉬운 계산이였음... 문제를 잘읽자!!
//오답 : nv===0일때 9999로 변환하는게 아니라 v===0일때 변환해야함... 😡

//해설
const MAX = 10001;

const T = parseInt(input[0]);
for (let tc = 1; tc <= T; tc++) {
  const [n, m] = input[tc].split(" ").map(Number);
  const check = new Array(MAX).fill(false);
  const dist = new Array(MAX).fill(-1); //dist[i] : a에서 i를 만드는데 걸린 횟수
  const from = new Array(MAX).fill(-1); //from[i] : i를 만든 숫자(from[i]에서 연산 1번을 통해 i를 만듦)
  const how = new Array(MAX).fill(""); //how[i] : i를 어떻게 만들었는지(from[i]에서 how[i]연산을 통해 i를 만듦)
  //모든 연산을 how에 저장하는게 아니라 바로 직전 연산만 저장한다!
  //연산이 얼마나 길어질지 모르기 때문에 메모리초과 날수있음.
  //따라서 바로 직전 연산만 저장한뒤, b에서부터 a까지 역추적하면 연산과정을 알아낼 수 있음

  check[n] = true;
  dist[n] = 0;
  from[n] = -1;

  const queue = new DoublyLinkedList();
  queue.append(n);
  while (!queue.isEmpty()) {
    let now = queue.deleteHead();
    let next;

    next = (now * 2) % 10000;
    if (!check[next]) {
      queue.append(next);
      check[next] = true;
      dist[next] = dist[now] + 1;
      from[next] = now;
      how[next] = "D";
    }

    next = now - 1;
    if (next === -1) next = 9999;
    if (!check[next]) {
      queue.append(next);
      check[next] = true;
      dist[next] = dist[now] + 1;
      from[next] = now;
      how[next] = "S";
    }

    next = (now % 1000) * 10 + parseInt(now / 1000);
    if (!check[next]) {
      queue.append(next);
      check[next] = true;
      dist[next] = dist[now] + 1;
      from[next] = now;
      how[next] = "L";
    }

    next = parseInt(now / 10) + (now % 10) * 1000;
    if (!check[next]) {
      queue.append(next);
      check[next] = true;
      dist[next] = dist[now] + 1;
      from[next] = now;
      how[next] = "R";
    }
  }
  let ans = "";
  print(n, m);
  console.log(ans);

  //역추적
  function print(n, m) {
    if (n === m) return;
    print(n, from[m]); //m을 이전으로 돌려가면서 재귀
    ans += how[m]; //n에서부터 더해지므로 reverse필요없음
  }
}
