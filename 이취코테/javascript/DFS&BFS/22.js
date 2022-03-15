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

//하, 상, 우, 좌
const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

const vrx = [
  [0, 1],
  [-1, 0],
  [-1, 0],
  [0, 1],
];
const vry = [
  [0, -1],
  [1, 0],
  [0, -1],
  [1, 0],
];

const hrx = [
  [0, -1],
  [1, 0],
  [0, -1],
  [1, 0],
];
const hry = [
  [-1, 0],
  [0, 1],
  [0, 1],
  [-1, 0],
];

const bfs = (board, robot, visited, n) => {
  const q = new DoublyLinkedList();
  q.append(robot);
  visited.add("0-0-0-1");

  while (!q.isEmpty()) {
    const [[x1, y1], [x2, y2], r, t] = q.deleteHead();
    //console.log(x1, y1, x2, y2, r, t);
    //상하좌우 이동
    for (let i = 0; i < 4; i++) {
      let nx1 = x1 + dx[i];
      let ny1 = y1 + dy[i];
      let nx2 = x2 + dx[i];
      let ny2 = y2 + dy[i];
      if (
        nx1 < 0 ||
        nx1 >= n ||
        ny1 < 0 ||
        ny1 >= n ||
        nx2 < 0 ||
        nx2 >= n ||
        ny2 < 0 ||
        ny2 >= n
      )
        continue;
      if (board[nx1][ny1] === 1 || board[nx2][ny2] === 1) continue;
      if (!visited.has(`${nx1}-${ny1}-${nx2}-${ny2}`)) {
        if (
          (nx1 === n - 1 && ny1 === n - 1) ||
          (nx2 === n - 1 && ny2 === n - 1)
        ) {
          return t + 1;
        }
        q.append([[nx1, ny1], [nx2, ny2], r, t + 1]);
        visited.add(`${nx1}-${ny1}-${nx2}-${ny2}`);
      }
    }
    //회전 이동
    //가로일때
    if (r === 0) {
      for (let i = 0; i < 4; i++) {
        let nx1 = x1 + vrx[i][0];
        let ny1 = y1 + vry[i][0];
        let nx2 = x2 + vrx[i][1];
        let ny2 = y2 + vry[i][1];
        if (
          nx1 < 0 ||
          nx1 >= n ||
          ny1 < 0 ||
          ny1 >= n ||
          nx2 < 0 ||
          nx2 >= n ||
          ny2 < 0 ||
          ny2 >= n
        )
          continue;
        if (board[nx1][ny1] === 1 || board[nx2][ny2] === 1) continue; //벽이 있는 칸으로는 회전 불가
        //회전하는 방향에 벽이 있으면 안됨
        if (i === 0 && board[nx2][ny2 + 1] === 1) continue;
        if (i === 1 && board[nx1][ny1 - 1] === 1) continue;
        if (i === 2 && board[nx1][ny1 + 1] === 1) continue;
        if (i === 3 && board[nx2][ny2 - 1] === 1) continue;
        if (!visited.has(`${nx1}-${ny1}-${nx2}-${ny2}`)) {
          if (
            (nx1 === n - 1 && ny1 === n - 1) ||
            (nx2 === n - 1 && ny2 === n - 1)
          ) {
            return t + 1;
          }
          q.append([[nx1, ny1], [nx2, ny2], 1, t + 1]);
          visited.add(`${nx1}-${ny1}-${nx2}-${ny2}`);
        }
      }
    }
    //세로일때
    else {
      for (let i = 0; i < 4; i++) {
        let nx1 = x1 + hrx[i][0];
        let ny1 = y1 + hry[i][0];
        let nx2 = x2 + hrx[i][1];
        let ny2 = y2 + hry[i][1];
        if (
          nx1 < 0 ||
          nx1 >= n ||
          ny1 < 0 ||
          ny1 >= n ||
          nx2 < 0 ||
          nx2 >= n ||
          ny2 < 0 ||
          ny2 >= n
        )
          continue;
        if (board[nx1][ny1] === 1 || board[nx2][ny2] === 1) continue;
        //회전하는 방향에 벽이 있으면 안됨
        if (i === 0 && board[nx1 + 1][ny1] === 1) continue;
        if (i === 1 && board[nx2 - 1][ny2] === 1) continue;
        if (i === 2 && board[nx2 + 1][ny2] === 1) continue;
        if (i === 3 && board[nx1 - 1][ny1] === 1) continue;
        if (!visited.has(`${nx1}-${ny1}-${nx2}-${ny2}`)) {
          if (
            (nx1 === n - 1 && ny1 === n - 1) ||
            (nx2 === n - 1 && ny2 === n - 1)
          ) {
            return t + 1;
          }
          q.append([[nx1, ny1], [nx2, ny2], 0, t + 1]);
          visited.add(`${nx1}-${ny1}-${nx2}-${ny2}`);
        }
      }
    }
  }
};

function solution(board) {
  const robot = [[0, 0], [0, 1], 0, 0]; //가로 : 0, 세로 : 1
  const n = board.length;
  const visited = new Set();
  const time = bfs(board, robot, visited, n);
  return time;
}

console.log(
  solution([
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ])
);

//not solve 😭
//틀린 이유들
//✔ 1. 문제 조건 잘못 읽음(회전가능한 조건에서 대각선 고려하지 않음)
//✔ 2. visited로 방문처리할때 2차원 배열에서 하나하나 체크하려고 했음 -> 틀린 방법. 노드크기가 1x1일때만 가능한 방법인듯
//왜냐면 크기가 1x1일때는 2차원 배열에서 bfs돌떄마다 체크하는거나 = 방문 좌표 배열에 기록해서 찾는거나 똑같으니까 가능했던거고
//지금같이 크기가 2x1일때는 bfs돌때마다 2차원 배열에 기록하면 안됨. 너무 고려해야할 사항이 많음
//따라서 보통은 visited를 true/false로 관리하지만 여기서는 좌표값으로 관리해야한다!
//⭐이럴때는 set으로 관리하면 된다⭐ -> 좌표값을 문자열로 만들고 set에 저장.
//회전할때 무조건 큰 좌표가 x2, y2가 되게 했으므로 중복을 방지했음.
//테스트케이스 10, 12, 14번에서 틀렸다고 나와서 구글링해보니 구분자가 없는 경우 의도치않은 키의 중복이 발생할 수 있다고 한다. 그래서 문자열 사이에 '-' 넣어주니까 해결됨. https://howtolivelikehuman.tistory.com/171
//구분자를 넣어줌으로써 왜 해결되는지 잘 모르겠음..?
