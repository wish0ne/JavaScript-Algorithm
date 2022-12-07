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

import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [v, e] = input[0].split(" ").map(Number);

// 부모 테이블 초기화
const parent = new Array(v + 1).fill(0);

//모든 간선을 담을 리스트와 최종 비용을 담을 변수
const edges = [];
let result = 0;

// 부모 테이블 상에서 부모를 자기자신으로 초기화
for (let i = 1; i < v + 1; i++) {
  parent[i] = i;
}

// 모든 간선에 대한 정보를 입력받기
for (let i = 1; i < e + 1; i++) {
  const [a, b, cost] = input[i].split(" ").map(Number);
  // 비용순으로 정렬하기 위해서 첫번째 원소를 비용으로 설정
  edges.push([cost, a, b]);
}

//간선을 비용순으로 정렬
edges.sort((a, b) => a[0] - b[0]);

// 간선을 하나씩 확인하며
for (let edge of edges) {
  const [cost, a, b] = edge;
  //사이클이 발생하지 않는 경우에만 집합에 포함
  if (find_parent(parent, a) !== find_parent(parent, b)) {
    union_parent(parent, a, b);
    result += cost;
  }
}

console.log(result);

//solve
//MST 정석 문제
