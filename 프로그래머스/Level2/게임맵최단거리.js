// 이동해야하는 칸의 최소값 구하기
// 도착할 수 없는 경우에는 -1 return

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

const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

//bfs
function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;

  const bfs = () => {
    maps[0][0] = -1;
    const q = new DoublyLinkedList();
    q.append([0, 0, 1]);
    while (!q.isEmpty()) {
      const [x, y, count] = q.deleteHead();
      if (x === n - 1 && y === m - 1) return count;
      //상하좌우 이동
      for (let i = 0; i < 4; i++) {
        let nx = x + dx[i];
        let ny = y + dy[i];
        if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
        if (maps[nx][ny] !== 1) continue;
        maps[nx][ny] = -1; //효율성 통과 : ⭐⭐⭐⭐⭐방문처리는 큐에 넣을때 해야한다!!⭐⭐⭐⭐⭐
        q.append([nx, ny, count + 1]);
      }
    }
    return -1;
  };

  let count = bfs();
  return count;
}

//dfs
function solution2(maps) {
  const n = maps.length;
  const m = maps[0].length;
  let min = 999999999;

  const dfs = (x, y, count) => {
    //console.log(x, y, count);
    if (x === n - 1 && y === m - 1) {
      min = Math.min(min, count);
      return;
    }
    //상하좌우 이동
    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      if (maps[nx][ny] === 1) {
        maps[nx][ny] = -1; //✔방문처리
        dfs(nx, ny, count + 1);
        maps[nx][ny] = 1; //✔돌아오고 나서 초기화
      }
    }
  };
  maps[0][0] = -1; //시작 노드 방문처리 해주기 (방문처리를 재귀전에 해주니까)
  dfs(0, 0, 1);
  if (min === 999999999) return -1;
  return min;
}

console.log(
  solution2([
    [1, 0, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
  ])
);

console.log(
  solution2([
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ])
);

//효율성 미통과
//⭐⭐⭐⭐⭐ BFS 방문처리는 큐에 넣을때 해야한다!!⭐⭐⭐⭐⭐
//https://programmers.co.kr/questions/23794

//dfs 공부 부족 : 최단경로같은 문제는 dfs로 풀면 안된다..! (시간복잡도)
//bfs는 가장먼저 도달하는게 최단경로, dfs는 다 해봐야 알수있음
//완전탐색이 아닐경우 dfs보다는 bfs를 생각하는게 맞을듯
//https://programmers.co.kr/questions/18867

//그래도 dfs 코드 이해하기
//⭐⭐⭐⭐⭐dfs/bfs에서 방문처리는 항상 재귀전/큐에넣기전에 해주자!!!
