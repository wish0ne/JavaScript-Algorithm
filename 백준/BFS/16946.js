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

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const [n, m] = input[0].split(" ").map(Number);
const map = new Array(n);
for (let i = 1; i <= n; i++) map[i - 1] = input[i].trim().split("").map(Number);

//그룹 저장할 2차원 배열
const group = [];
for (let i = 0; i < n; i++) group.push(new Array(m).fill(-1));

//각 그룹의 개수 저장할 1차원 배열
const groupSize = [];

//그룹 생성
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0 && group[i][j] === -1) bfs(i, j, groupSize.length);
  }
}

function bfs(x, y, index) {
  const queue = new DoublyLinkedList();
  queue.append([x, y]);
  group[x][y] = index;
  let size = 0;
  while (!queue.isEmpty()) {
    const [x, y] = queue.deleteHead();
    size += 1;
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (map[nx][ny] === 1) continue;
      if (group[nx][ny] !== -1) continue;
      queue.append([nx, ny]);
      group[nx][ny] = index;
    }
  }
  groupSize.push(size);
}

//각 위치에서 이동할 수 있는 칸의 개수 구하기
const answer = new Array(n);
for (let i = 0; i < n; i++) answer[i] = new Array(m).fill(0);

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    //벽에서 이동할 수 있는 칸의 개수 구하기
    //인접한 그룹의 size 총합 + 1
    if (map[i][j] === 1) {
      let count = 0;
      let can_group = new Set();
      //4방향 인접한 그룹 확인
      for (let k = 0; k < 4; k++) {
        let nx = i + dx[k];
        let ny = j + dy[k];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (group[nx][ny] < 0) continue;
        can_group.add(group[nx][ny]);
      }
      //인접 그룹의 총합 구하기
      can_group.forEach((i) => (count += groupSize[i]));
      answer[i][j] = (count + 1) % 10;
    }
  }
}

for (let i = 0; i < n; i++) {
  console.log(answer[i].join(""));
}

//1. 그룹 생성 이상하게 해서 메모리초과.. 왜이렇게 했는지 모르겠음;
//2. 모든 벽을 bfs 시작점으로 수행 -> visited를 (x, y, 각 벽의 좌표) 3차원으로 체크하니까 당연히 메모리초과나지!!
//3. 그룹 생성 잘 해서 성공 ^^ 각 점에 대해서 bfs로 그룹 지정 + 각 벽마다 인접한 그룹의 총합 구함

//해설
//이동할 수 있는 빈 칸을 모두 그룹짓고 각 벽의 인접한 그룹의 칸 수의 합을 구함
//풀이 완전 동일하다~ 방문배열 추가로 둬서 메모리 늘어남

//각 빈칸의 그룹 저장
const group2 = [];
for (let i = 0; i < n; i++) group2.push(new Array(m).fill(-1));

//방문 확인
const check = [];
for (let i = 0; i < n; i++) check.push(new Array(m).fill(false));

const group_size = []; //그룹별 사이즈 저장

function bfs2(sx, sy) {
  let g = group_size.length; //새로운 그룹 번호
  const q = new DoublyLinkedList();
  q.append([sx, sy]);
  group2[sx][sy] = g;
  check[sx][sy] = true;
  let cnt = 1; //그룹 사이즈
  while (!q.isEmpty()) {
    let [x, y] = q.deleteHead();
    for (let k = 0; k < 4; k++) {
      let nx = x + dx[k];
      let ny = y + dy[k];
      if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
        if (!check[nx][ny] && map[nx][ny] === 0) {
          check[nx][ny] = true;
          group2[nx][ny] = g;
          q.append([nx, ny]);
          cnt += 1;
        }
      }
    }
  }
  group_size.push(cnt);
}

//방문하지 않은 모든 빈칸에 대해서 그룹 확인
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0 && !check[i][j]) bfs2(i, j);
  }
}

let ans = "";
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (map[i][j] === 0) ans += "0"; //빈칸이면 0
    else {
      let near = new Set(); //같은 그룹 여러번 세지 않기 위해 set 사용
      //인접한 그룹 모두 저장
      for (let k = 0; k < 4; k++) {
        let nx = i + dx[k];
        let ny = j + dy[k];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
          if (map[nx][ny] === 0) near.add(group2[nx][ny]);
        }
      }
      let a = 1;
      near.forEach((g) => (a += group_size[g])); //인접한 그룹의 사이즈 총합
      ans += a % 10;
    }
  }
  ans += "\n";
}
console.log(ans);
