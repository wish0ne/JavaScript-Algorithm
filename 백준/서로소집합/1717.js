// 특정 원소가 속한 집합 찾기
function find_parent(parent, x) {
  // 루트 노드가 아니라면 루트 노드를 찾을때까지 재귀적으로 호출
  if (parent[x] !== x) parent[x] = find_parent(parent, parent[x]);
  return parent[x];
}

// 두 원소가 속한 집합 합치기
function union_parent(parent, a, b) {
  a = find_parent(parent, a);
  b = find_parent(parent, b);
  if (a < b) parent[b] = a;
  else parent[a] = b;
}

// 예제 입력이 여러줄로 되어 있을 떼
//const readline = require("readline");
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

function solution(input) {
  const [n, m] = input[0].split(" ").map(Number);

  // 부모 테이블 초기화
  const parent = new Array(n + 1).fill(0);

  // 부모 테이블 상에서 부모를 자기자신으로 초기화
  for (let i = 0; i <= n; i++) {
    parent[i] = i;
  }

  let answer = [];
  for (let i = 1; i <= m; i++) {
    const [t, a, b] = input[i].split(" ").map(Number);
    if (t === 0) union_parent(parent, a, b);
    else {
      if (find_parent(parent, a) === find_parent(parent, b)) answer.push("YES");
      else answer.push("NO");
    }
  }
  console.log(answer.join("\n"));
}

//solve
//union find 개념 문제
//fs 썼다가 런타임나서 readline으로 바꿈...어이없어!
