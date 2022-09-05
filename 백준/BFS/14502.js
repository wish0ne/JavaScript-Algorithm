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

const Combination = (arr, selectNum) => {
  //하나씩 선택하는 경우 각 원소를 배열에 넣은 배열 return
  if (selectNum === 1) return arr.map((a) => [a]);
  const results = []; //조합이 담길 배열
  arr.forEach((a, index) => {
    //작은 배열로 나눠서 조합을 구함.
    //배열을 앞에서부터 하나씩 잘라서 작은 배열로 만들고 거기서 하나를 제외한 조합을 구함. => 앞의 숫자를 고정한채로 조합을 구하는것.
    const smallerCombination = Combination(arr.slice(index + 1), selectNum - 1);
    smallerCombination.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
};

import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const [n, m] = input[0].split(" ").map(Number);
const board = [];
for (let i = 1; i <= n; i++) board.push(input[i].split(" ").map(Number));

const empty = [];
const viruses = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (board[i][j] === 0) empty.push([i, j]);
    else if (board[i][j] === 2) viruses.push([i, j]);
  }
}
let max = 0;
const can_walls = Combination(empty, 3);
can_walls.forEach((walls) => {
  //벽 세워보기
  walls.forEach((wall) => {
    board[wall[0]][wall[1]] = 1;
  });

  //바이러스 전파
  let count = virus();
  max = Math.max(max, count);

  //벽 취소
  walls.forEach((wall) => {
    board[wall[0]][wall[1]] = 0;
  });
});
console.log(max);

function virus() {
  const visited = [];
  for (let i = 0; i < n; i++) visited.push(new Array(m).fill(false));
  const q = new DoublyLinkedList();
  viruses.forEach((virus) => {
    q.append(virus);
    visited[virus[0]][virus[1]] = true;
  });
  while (!q.isEmpty()) {
    const [x, y] = q.deleteHead();
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (board[nx][ny] === 1) continue;
      if (!visited[nx][ny]) {
        q.append([nx, ny]);
        visited[nx][ny] = true;
      }
    }
  }

  //안전영역 : board가 2, 1인 곳 제외, visited가 true인곳 제외
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === 0 && !visited[i][j]) count += 1;
    }
  }
  return count;
}

//solve
//풀어본 문제라 바로 풀었다

//해설
//이 문제는 최소를 구하는 문제가 아니라, 하나의 정점(바이러스)에서 시작해서 연결된 모든 정점을 방문하는 성질을 이용하는 것이므로
//dfs/bfs로 모두 풀이 가능하다

//bfs버전
function bfs(a) {
  let n = a.length;
  let m = a[0].length;
  //board 복사
  const b = [];
  for (let i = 0; i < n; i++) b.push(new Array(m).fill(0));

  const q = new DoublyLinkedList();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      b[i][j] = a[i][j];
      if (b[i][j] === 2) q.append([i, j]);
    }
  }
  //바이러스에서 시작 -> 인접 노드로 이동
  while (!q.isEmpty()) {
    const [x, y] = q.deleteHead();
    for (let k = 0; k < 4; k++) {
      let nx = x + dx[k];
      let ny = y + dy[k];
      if (nx >= 0 && nx < n && ny >= 0 && ny < m && b[nx][ny] === 0) {
        b[nx][ny] = 2;
        q.append([nx, ny]);
      }
    }
  }
  //안전영역 개수 세기
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (b[i][j] === 0) cnt += 1;
    }
  }
  return cnt;
}

let ans = 0;
//벽 3개 선택
for (let x1 = 0; x1 < n; x1++) {
  for (let y1 = 0; y1 < m; y1++) {
    if (board[x1][y1] !== 0) continue; //빈칸이 아니면
    for (let x2 = 0; x2 < n; x2++) {
      for (let y2 = 0; y2 < m; y2++) {
        if (board[x2][y2] !== 0) continue;
        for (let x3 = 0; x3 < n; x3++) {
          for (let y3 = 0; y3 < m; y3++) {
            if (board[x3][y3] !== 0) continue;
            if (x1 === x2 && y1 === y2) continue;
            if (x1 === x3 && y1 === y3) continue;
            if (x2 === x3 && y2 === y3) continue;
            //벽 3개 선택완료
            board[x1][y1] = 1;
            board[x2][y2] = 1;
            board[x3][y3] = 1;
            //바이러스 전파 및 안전영역 개수 return
            let cur = bfs(board);
            if (ans < cur) ans = cur;
            //벽 원상복구
            board[x1][y1] = 0;
            board[x2][y2] = 0;
            board[x3][y3] = 0;
          }
        }
      }
    }
  }
}
console.log(ans);

//dfs버전
function dfs(b, x, y) {
  for (let k = 0; k < 4; k++) {
    let nx = x + dx[k];
    let ny = y + dy[k];
    if (nx >= 0 && nx < n && ny >= 0 && ny < m && b[nx][ny] === 0) {
      b[nx][ny] = 2;
      dfs(b, nx, ny);
    }
  }
}

function go() {
  //원본배열 복사
  const b = [];
  for (let i = 0; i < n; i++) b.push(new Array(m).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      b[i][j] = board[i][j];
    }
  }

  //바이러스 하나 찾을때마다 전파시킴
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (b[i][j] === 2) dfs(b, i, j);
    }
  }

  //안전영역 개수 return
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (b[i][j] === 0) cnt += 1;
    }
  }
  return cnt;
}

let ans2 = 0;
//벽 3개 선택
for (let x1 = 0; x1 < n; x1++) {
  for (let y1 = 0; y1 < m; y1++) {
    if (board[x1][y1] !== 0) continue; //빈칸이 아니면
    for (let x2 = 0; x2 < n; x2++) {
      for (let y2 = 0; y2 < m; y2++) {
        if (board[x2][y2] !== 0) continue;
        for (let x3 = 0; x3 < n; x3++) {
          for (let y3 = 0; y3 < m; y3++) {
            if (board[x3][y3] !== 0) continue;
            if (x1 === x2 && y1 === y2) continue;
            if (x1 === x3 && y1 === y3) continue;
            if (x2 === x3 && y2 === y3) continue;
            //벽 3개 선택완료
            board[x1][y1] = 1;
            board[x2][y2] = 1;
            board[x3][y3] = 1;
            //바이러스 전파 및 안전영역 개수 return
            let cur = go();
            if (ans2 < cur) ans2 = cur;
            //벽 원상복구
            board[x1][y1] = 0;
            board[x2][y2] = 0;
            board[x3][y3] = 0;
          }
        }
      }
    }
  }
}
console.log(ans2);
