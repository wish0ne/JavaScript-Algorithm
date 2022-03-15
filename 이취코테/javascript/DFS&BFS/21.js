import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

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
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      //list에 node가 존재할때
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
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }
    this.size -= 1;
    return deletedHead.value;
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

//입력받기
const [n, l, r] = input[0].split(" ").map(Number);
const cities = [];
for (let i = 1; i < n + 1; i++) {
  cities.push(input[i].split(" ").map(Number));
}

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const bfs = (cities, x, y, visited, l, r, n) => {
  const q = new DoublyLinkedList();
  q.append([x, y]);
  visited[x][y] = true;
  const union = [[x, y]]; //연합
  let union_sum = cities[x][y]; //연합의 인구수
  let end = true;

  while (!q.isEmpty()) {
    const [x, y] = q.deleteHead();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= n) continue;
      if (
        Math.abs(cities[nx][ny] - cities[x][y]) < l ||
        Math.abs(cities[nx][ny] - cities[x][y]) > r
      )
        continue;
      //국경선을 열고 연합 추가
      if (!visited[nx][ny]) {
        end = false; //연합이 하나 이상이라면 인구이동이 일어나므로 종료하지 않음
        visited[nx][ny] = true;
        q.append([nx, ny]);
        union.push([nx, ny]);
        union_sum += cities[nx][ny];
      }
    }
  }

  //연합 인구 이동
  for (let i = 0; i < union.length; i++) {
    const [x, y] = union[i];
    cities[x][y] = parseInt(union_sum / union.length);
  }
  return end;
};

let end = false; //인구 이동 종료 여부
let count = 0; //인구 이동 횟수
while (!end) {
  end = true;
  //방문 여부 저장 배열 초기화
  const visited = new Array(n);
  for (let i = 0; i < n; i++) {
    visited[i] = new Array(n).fill(false);
  }
  //방문하지 않은 모든 나라에 대해서 bfs
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (!visited[i][j]) {
        let end_temp = bfs(cities, i, j, visited, l, r, n);
        if (end && !end_temp) end = !end; //연합이 하나라도 존재하면 종료하지 않음.
      }
    }
  }
  if (!end) count += 1;
}
console.log(count);

//solve 😃
//전형적인 DFS&BFS 문제. 모든 나라의 위치에서 상하좌우로 국경선 열 수 있는지 여부를 확인.
//따라서 모든 나라의 위치에서 BFS를 수행하여 국경선 여부 확인하고, 열 수 있다면 열고 인구이동 처리.
