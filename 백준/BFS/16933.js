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

const [n, m, k] = input[0].split(" ").map(Number);
const map = [];
for (let i = 1; i <= n; i++) {
  map.push(input[i].split("").map(Number));
}

const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

const visited = new Array(n);
for (let i = 0; i < n; i++) visited[i] = new Array(m).fill(k + 1);

//참고 풀이 : https://velog.io/@evelyn82ny/boj-16933
//cost를 이용하여 낮/밤 계산가능(홀/짝)
//현재 벽을 부순 횟수가 더 적을때만 탐색

//음...^^ 이 풀이는 시간초과는 안나는데 17%에서 메모리초과남
//Java에서는 큐를 연결리스트로 구현했으면 메모리초과난다는데 나도 연결리스트로 짜서 그럴까..? ㅠ
function bfs() {
  //예외처리
  if (n === 1 && m === 1 && map[0][0] === 0) return 1;

  const q = new DoublyLinkedList();
  q.append([0, 0, 0, 1]); //x, y, 벽 부순 횟수, 비용
  visited[0][0] = 0;

  while (!q.isEmpty()) {
    const [x, y, wall, cost] = q.deleteHead();
    //console.log(x, y, wall, cost);
    //if (x === n - 1 && y === m - 1) return cost;

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];

      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;

      //현재 부순횟수가 더 작을때만 탐색
      if (visited[nx][ny] <= wall) continue;

      //빈칸으로 이동하는 경우
      if (map[nx][ny] === 0) {
        if (nx === n - 1 && ny === m - 1) return cost + 1;
        visited[nx][ny] = wall;
        q.append([nx, ny, wall, cost + 1]);
      }
      //벽으로 이동하는 경우
      else if (map[nx][ny] === 1) {
        //부술 횟수가 남아있지 않으면 탐색불가
        if (wall >= k) continue;

        //현재 밤인경우
        if (cost % 2 === 0) {
          q.append([x, y, wall, cost + 1]); //제자리 이동
        }
        //현재 낮인경우
        else {
          //벽 부수고 이동
          if (nx === n - 1 && ny === m - 1) return cost + 1;
          visited[nx][ny] = wall; //wall+1이 아닌 wall로 갱신하는 이유 : 중복 탐색 막을 수 있음
          q.append([nx, ny, wall + 1, cost + 1]);
        }
      }
    }
  }
  return -1;
}
console.log(bfs());

//시간초과 풀이 : 4차원 배열(x, y, 벽 부순횟수, 낮/밤) 이용
// const visited = new Array(n);
// for (let i = 0; i < n; i++) {
//   visited[i] = new Array(m);
//   for (let j = 0; j < m; j++) {
//     visited[i][j] = new Array(k + 1);
//     for (let z = 0; z <= k; z++) {
//       visited[i][j][z] = new Array(2).fill(INF);
//     }
//   }
// }

// function bfs() {
//   //예외처리
//   if (n === 1 && m === 1 && map[0][0] === 0) return 1;

//   const queue = new DoublyLinkedList();
//   queue.append([0, 0, 0, 0]); //x, y, 부순 벽 개수, 낮or밤
//   visited[0][0][0][0] = 1;

//   while (!queue.isEmpty()) {
//     const [x, y, wall, day] = queue.deleteHead();
//     const count = visited[x][y][wall][day];
//     //console.log(x, y, wall, day, count);

//     for (let i = 0; i < 4; i++) {
//       let nx = x + dx[i];
//       let ny = y + dy[i];
//       if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
//       //벽인 경우
//       if (map[nx][ny] === 1) {
//         //부술 수 있는 벽이 남아있고 현재 낮인 경우(부수기 가능)
//         if (wall < k && day === 0) {
//           if (visited[nx][ny][wall + 1][1] <= count + 1) continue;
//           //if (nx === n - 1 && ny === m - 1) return count + 1;
//           queue.append([nx, ny, wall + 1, 1]);
//           visited[nx][ny][wall + 1][1] = count + 1;
//         }
//         //부술 수 있는 벽이 남아있고 현재 밤인경우 -> 이 경우에만 제자리 이동 고려하면됨!
//         //시간초과 제약 추가) 제자리이동 + 다음칸 이동 한번에 처리
//         if (wall < k && day === 1) {
//           if (visited[nx][ny][wall + 1][1] <= count + 2) continue;
//           queue.append([nx, ny, wall + 1, 1]);
//           visited[nx][ny][wall + 1][1] = count + 2;
//         }
//       }
//       //빈칸인 경우
//       else if (map[nx][ny] === 0) {
//         if (visited[nx][ny][wall][day * -1 + 1] > count + 1) {
//           //if (nx === n - 1 && ny === m - 1) return count + 1;
//           queue.append([nx, ny, wall, day * -1 + 1]);
//           visited[nx][ny][wall][day * -1 + 1] = count + 1;
//         }
//       }
//     }
//   }
// }

// bfs();
// let min = INF;
// for (let i = 0; i <= k; i++) {
//   for (let j = 0; j < 2; j++) {
//     min = Math.min(min, visited[n - 1][m - 1][i][j]);
//   }
// }
// if (min === INF) console.log(-1);
// else console.log(min);
