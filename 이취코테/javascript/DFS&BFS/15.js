import fs from "fs";
import DoublyLinkedList from "../Data Structure/DoublyLinkedList.js";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const [n, m, k, x] = input[0].split(" ").map(Number);
const graph = [];
for (let i = 0; i < n + 1; i++) {
  graph.push([]);
}
for (let i = 1; i < m + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
}

const visitied = new Array(n + 1).fill(false);

const length = new Array(n + 1).fill(0);
const bfs = (graph, start, visitied) => {
  const queue = new DoublyLinkedList();
  queue.append(start);
  visitied[start] = true;
  while (!queue.isEmpty()) {
    let v = queue.deleteHead();
    for (let i of graph[v]) {
      if (!visitied[i]) {
        if (length[i] === 0) length[i] = length[v] + 1; //❌오답 2
        queue.append(i);
        visitied[i] = true;
      }
    }
  }
};

bfs(graph, x, visitied);
let answer = "";
if (length.indexOf(k) === -1) {
  console.log(-1);
} else {
  length.forEach((ele, index) => {
    if (ele === k) answer += index + "\n";
  });
}
console.log(answer);

//❌오답 2번, ⏳시간초과 2번...
//오답 1 ) 존재하지 않을 시 -1 출력하는것 빼먹음 (^^ 바보같은 실수)
//오답 2 ) 예외처리 실패. 각 노드의 방문 거리는 최소값을 유지해야 하기 때문에 len을 +1시켜서 하는 방법은 옳지 않음.
//따라서 현재 방문 노드의 length가 0일때(처음 방문했을때)만 이전 노드의 length+1값을 줘야함.
//시간초과 1) console.log자체가 시간이 오래걸리므로, answer값에 저장 후 console.log는 한번만 하기
//시간초과 2) shift()를 할때 시간소요가 크다고 한다(O(n)). 자바스크립트에는 연결리스트가 없기 때문에 직접 구현해서 사용했더니 해결!

// 7 7 2 1
// 1 2
// 1 3
// 2 3
// 2 4
// 2 5
// 3 6
// 3 7

//다른 풀이 추가
const visitied2 = new Array(n + 1).fill(false);
const bfs2 = (graph, start, visitied) => {
  const queue = new DoublyLinkedList();
  let area = 0; //출발 도시로부터 거리
  queue.append([start, area]);
  visitied[start] = true;
  const answer = []; //최단거리가 K인 도시를 저장할 배열
  while (!queue.isEmpty()) {
    const [node, len] = queue.deleteHead();
    if (len > k) break;
    if (len === k) answer.push(node);
    for (let i of graph[node]) {
      if (!visitied[i]) {
        queue.append([i, len + 1]);
        visitied[i] = true;
      }
    }
  }
  return answer;
};

const answer2 = bfs2(graph, x, visitied2);
answer2.sort((a, b) => a - b);
answer2.length === 0 ? console.log(-1) : console.log(answer2.join("\n"));

//현재 노드까지의 거리를 저장하고, 그 거리가 k이면 answer에 추가하는 풀이
//bfs 다 돌 필요 없이 거리가 k+1인 노드까지만 확인하면 되서 시간을 줄일 수 있는듯
//거리가 k인 노드까지만 확인하게도 가능할 것 같은데 (len이 k+1이면 큐에 넣지 않게 하는 등) 복잡해질 수 있을 것 같음
//첫번쨰 풀이방법에 비해 조금 더 빠르긴 하지만 좀 덜 명확한 풀이인듯
