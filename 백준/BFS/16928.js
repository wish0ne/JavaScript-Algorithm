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

const [n, m] = input[0].split(" ").map(Number);
const ladders = [];
const snakes = [];
for (let i = 1; i <= n; i++) ladders.push(input[i].split(" ").map(Number));
for (let i = n + 1; i <= n + m; i++)
  snakes.push(input[i].split(" ").map(Number));

const visited = new Array(101).fill(false);

//매번 이동할 수 있는 경우의 수 : 6가지(1~6칸 이동)
function bfs() {
  const queue = new DoublyLinkedList();
  queue.append([1, 0]); //[칸 번호, 횟수]
  visited[1] = true;
  while (!queue.isEmpty()) {
    let [x, count] = queue.deleteHead(); //칸 번호
    if (x === 100) return count;
    for (let i = 1; i < 7; i++) {
      let nx = x + i;
      //사다리인지 확인
      for (let j = 0; j < ladders.length; j++) {
        if (ladders[j][0] === nx) {
          nx = ladders[j][1];
          break;
        }
      }

      //뱀인지 확인
      for (let j = 0; j < snakes.length; j++) {
        if (snakes[j][0] === nx) {
          nx = snakes[j][1];
          break;
        }
      }

      //이동
      if (!visited[nx]) {
        queue.append([nx, count + 1]);
        visited[nx] = true;
      }
    }
  }
}

console.log(bfs());

//메모리 초과 1번 : 항상 앞으로만 가는게 아니라 뱀때문에 되돌아갈수도 있으므로 방문체크 해줘야함~

//해설
const next = new Array(101); //next[x]: x에 도착한 이후에 가야할 곳을 기록
for (let i = 0; i < 102; i++) next[i] = i;
const dist = new Array(101).fill(-1); //거리 배열

for (let i = 1; i <= n + m; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  next[x] = y; //뱀, 사다리인 경우 x에 도착한 이후 가야할 곳을 기록
}

//시작점 처리
dist[1] = 0;
const q = new DoublyLinkedList();
q.append(1);

//bfs
while (!q.isEmpty()) {
  let x = q.deleteHead();
  for (let i = 1; i < 7; i++) {
    let y = x + i;
    if (y > 100) continue; //100번째 칸을 벗어나면 이동하지 않는다는 문제 조건 처리
    y = next[y]; //도착점(일반 칸인경우 x->x+i, 뱀이나 사다리인경우 x->x+i->after[y])
    //방문하지 않은 경우
    if (dist[y] === -1) {
      dist[y] = dist[x] + 1; //거리 + 1
      q.append(y);
    }
  }
}

console.log(dist[100]);
