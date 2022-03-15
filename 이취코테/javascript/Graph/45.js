import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

class Queue {
  constructor() {
    this._arr = [];
  }
  enqueue(item) {
    this._arr.push(item);
  }
  dequeue() {
    return this._arr.shift();
  }
  isEmpty() {
    return this._arr.length === 0;
  }
}

const test_num = parseInt(input[0]);
let idx = 1;
for (let test = 0; test < test_num; test++) {
  const n = parseInt(input[idx]); //팀의 수
  const team = input[idx + 1].split(" ").map(Number); //작년 등수
  const m = parseInt(input[idx + 2]); //등수가 바뀐 쌍의 수

  const indegree = new Array(n + 1).fill(0); //진입차수
  const graph = []; //그래프
  for (let i = 0; i < n + 1; i++) {
    graph.push(new Array(n + 1).fill(false));
  }

  //간선 입력
  for (let i = n - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      graph[team[j]][team[i]] = true;
      indegree[team[j]] += 1;
    }
  }

  //간선 뒤집기
  //✔이부분 편하게 하기 위해서 graph를 인접리스트가 아니라 인접행렬로 구현하는 아이디어
  for (let j = 0; j < m; j++) {
    const [a, b] = input[idx + 3 + j].split(" ").map(Number);
    //a가 b보다 순위가 높았다면 -> b가 a보다 순위가 높게됨.
    if (graph[a][b]) {
      graph[a][b] = false;
      graph[b][a] = true;
      indegree[a] -= 1;
      indegree[b] += 1;
    } else {
      graph[b][a] = false;
      graph[a][b] = true;
      indegree[b] -= 1;
      indegree[a] += 1;
    }
  }
  idx += 3 + m;

  //위상정렬 시작
  const q = new Queue();

  //진입차수가 0인 노드들을 큐에 삽입
  for (let i = 1; i < n + 1; i++) {
    if (indegree[i] === 0) q.enqueue(i);
  }

  let only = true; //위상정렬의 결과가 오직 하나만 나오는지 여부
  let cycle = false; //사이클이 생기는지 여부
  const result = [];

  //✔정확히 노드의 개수만큼 반복
  for (let node = 0; node < n; node++) {
    if (q.isEmpty()) {
      cycle = true;
      break;
    }
    if (q.length > 1) {
      only = false;
      break;
    }
    const now = q.dequeue();
    result.push(now);

    //현재 원소와 연결된 노드들의 진입차수 1씩 제거
    for (let i = 1; i < n + 1; i++) {
      if (graph[i][now]) {
        indegree[i] -= 1;
        //새롭게 진입차수가 0이 되는 노드를 큐에 삽입
        if (indegree[i] === 0) {
          q.enqueue(i);
        }
      }
    }
  }

  if (cycle) console.log("IMPOSSIBLE");
  else if (!only) console.log("?");
  else {
    let answer = "";
    for (let i = n - 1; i >= 0; i--) {
      answer += result[i] + " ";
    }
    console.log(answer);
    console.log();
  }
}

// not solve 😫
// 인접한 등수의 노드끼리만 간선을 잇는게 아니라, 현재 노드보다 더 낮은 모든 등수의 노드와 간선을 잇는 아이디어
// 떠올렸으나 이게 복잡도가 O(n!)인줄 알고 틀린 아이디어라고 생각... => 복잡도 잘못 생각해서 바보같이 못품
// 복잡도 계속 머릿속으로 잘못생각하고 틀린 아이디어겠구나 하고 포기하는 경우 왜케 많음!!! 복잡도 제발 계산 잘하자
//그리고 얼렁뚱땅 구현 후 디버깅으로 에러잡는 습관 안좋은듯! 문제푸는데 시간이 너무 많이 소요됨. 한번 구현할때 잘하자
