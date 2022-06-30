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
  isEmpty() {
    return this.size === 0;
  }
}

import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

//호수 array 생성
const [r, c] = input[0].split(" ").map(Number);
const lake = new Array(r);
for (let i = 0; i < r; i++) {
  lake[i] = input[i + 1].trim().split("");
}

let now_ice_queue = new DoublyLinkedList();
let now_swan_queue = new DoublyLinkedList();

const swan_visited = new Array(r);
for (let i = 0; i < r; i++) swan_visited[i] = new Array(c).fill(false);
const visited = new Array(r);
for (let i = 0; i < r; i++) visited[i] = new Array(c).fill(false);

//swan, water 위치 찾기
for (let i = 0; i < r; i++) {
  for (let j = 0; j < c; j++) {
    if (lake[i][j] === ".") {
      now_ice_queue.append([i, j]);
      visited[i][j] = true;
    } else if (lake[i][j] === "L") {
      now_swan_queue.append([i, j]);
      now_ice_queue.append([i, j]); //백조가 있는 곳도 물
      visited[i][j] = true;
      swan_visited[i][j] = true;
    }
  }
}
//만나러 가는 백조는 제외
let [x, y] = now_swan_queue.deleteHead();
swan_visited[x][y] = false;

//백조가 만날 수 있는지 확인하는 함수
function can_meet() {
  let temp = new DoublyLinkedList(); //다음에 백조가 이동가능성이 있는 위치들(빙판들) 저장
  while (!now_swan_queue.isEmpty()) {
    const [x, y] = now_swan_queue.deleteHead();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || ny < 0 || nx >= r || ny >= c) continue;
      if (swan_visited[nx][ny]) continue;
      if (lake[nx][ny] === "L") return true; //백조가 만나면 true
      if (lake[nx][ny] === ".") {
        now_swan_queue.append([nx, ny]); //물이면 현재 백조가 이동가능
        swan_visited[nx][ny] = true;
      } else if (lake[nx][ny] === "X") {
        temp.append([nx, ny]); //빙판이면 다음 백조가 이동가능할수도 있음
        swan_visited[nx][ny] = true;
      }
    }
  }
  now_swan_queue = temp;
  return false;
}

//녹을 수 있는 빙판들 녹이는 함수
function melting() {
  let temp = new DoublyLinkedList(); //다음에 녹을 수 있는 빙판들 저장
  //현재 녹을 수 있는 빙판들만 확인하면됨
  while (!now_ice_queue.isEmpty()) {
    const [x, y] = now_ice_queue.deleteHead();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || ny < 0 || nx >= r || ny >= c) continue;
      if (visited[nx][ny]) continue;
      if (lake[nx][ny] === "X") {
        temp.append([nx, ny]);
        lake[nx][ny] = ".";
        visited[nx][ny] = true;
      }
    }
  }
  now_ice_queue = temp;
}

let day = 0;
while (true) {
  if (can_meet()) break; //백조가 만날 수 있는지 확인
  day += 1;
  melting(); //물과 접촉한 빙판 녹임
}

console.log(day);

//not solve
//그냥 일반적인 bfs 탐색 문제인줄 알았는데, N이 1500이라 시간초과&메모리초과 발생

//계산을 줄이는 방법 -> 한번 탐색한 부분은 탐색하지 않아도됨
//백조가 다음에 갈수있는지 확인해야하는 부분 : 현재 백조가 물에서 이동하다가 만난 빙판들
//다음에 녹을 수 있는지 확인해야하는 부분 : 현재 물인 곳에서 이동하다가 만난 빙판들
//참고 : https://yabmoons.tistory.com/64
