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
