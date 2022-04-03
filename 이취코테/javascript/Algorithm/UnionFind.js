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

// 노드 개수와 간선 개수 입력받기
import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [v, e] = input[0].split(" ").map(Number);

// 부모 테이블 초기화
const parent = new Array(v + 1).fill(0);

// 부모 테이블 상에서 부모를 자기자신으로 초기화
for (let i = 1; i < v + 1; i++) {
  parent[i] = i;
}

// union 연산 각각 수행
for (let i = 1; i < e + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  union_parent(parent, a, b);
}

//각 원소가 속한 집합 출력
console.group("각 원소가 속한 집합");
for (let i = 1; i < v + 1; i++) {
  console.log(find_parent(parent, i));
}
console.groupEnd();

//부모 테이블 내용 출력
console.group("부모 테이블");
for (let i = 1; i < v + 1; i++) {
  console.log(parent[i]);
}
console.groupEnd();
