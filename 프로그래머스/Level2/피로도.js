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

  isEmpty() {
    return this.size === 0;
  }
}

function solution(k, dungeons) {
  let answer = 0;
  const q = new DoublyLinkedList();
  let visited = new Array(dungeons.length).fill(false);
  q.append([visited, k, 0]);
  while (!q.isEmpty()) {
    let [visited, fatigue, count] = q.deleteHead();
    answer = Math.max(count, answer);
    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && dungeons[i][0] <= fatigue) {
        let temp = [...visited];
        temp[i] = true;
        let nFatigue = fatigue - dungeons[i][1];
        q.append([temp, nFatigue, count + 1]);
      }
    }
  }
  return answer;
}

//solve
//bfs로 풀었는데 dfs나 이중for문으로도 가능한 문제(던전이 최대 8개밖에 안됨)

//dfs풀이
//dfs에서 올라가면서 값 복구시키는 로직 익숙해지기

//계속 유지해야하는 answer는 전역변수로 둬서 dfs에서 return안해도되게 함
//dfs에서 내려갈때마다 값이 바뀌고 올라갈때는 복원되어야하는 count, score는 변수를 바로 변경하지 않고, 파라미터로 바뀐값을 전달함으로써 수동으로 복원하지 않아도 되게함.
function solution2(k, dungeons) {
  let answer = 0;
  const dfs = (count, score) => {
    answer = Math.max(count, answer);
    for (let i = 0; i < dungeons.length; i++) {
      if (!visited[i] && dungeons[i][0] <= score) {
        visited[i] = true;
        dfs(count + 1, score - dungeons[i][1]);
        visited[i] = false;
      }
    }
  };

  const visited = new Array(dungeons.length + 1).fill(false);
  dfs(0, k);
  return answer;
}

//아래 내가 짠 코드랑 위의 간결한 코드랑 비교하면서 공부하기
function solution3(k, dungeons) {
  const dfs = (v, visited, count, maxCount, score) => {
    visited[v] = true;
    for (let i = 1; i < dungeons.length + 1; i++) {
      if (!visited[i] && dungeons[i - 1][0] <= score) {
        count += 1;
        score -= dungeons[i - 1][1];
        [maxCount, score, count] = dfs(i, visited, count, maxCount, score);
      }
    }
    visited[v] = false;
    if (v !== 0) score += dungeons[v - 1][1];
    maxCount = Math.max(count, maxCount);
    count -= 1;
    return [maxCount, score, count];
  };

  const visited = new Array(dungeons.length + 1).fill(false);
  let answer = dfs(0, visited, 0, 0, k)[0];
  return answer;
}

console.log(
  solution2(80, [
    [80, 20],
    [50, 40],
    [30, 10],
  ])
);
