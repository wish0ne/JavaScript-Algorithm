// 서로소 집합을 활용한 사이클 판별 코드
// 모든 간선을 하나씩 확인하며 union find함수를 호출하는 방식으로 동작
// 무향 그래프에서만 적용 가능

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

let cycle = false; //사이클 발생 여부

for (let i = 1; i < e + 1; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  // 사이클이 발생한 경우 종료
  if (find_parent(parent, a) === find_parent(parent, b)) {
    cycle = true;
    break;
  }
  // 사이클이 발생하지 않았다면 합집합 수행
  else {
    union_parent(parent, a, b);
  }
}

if (cycle) console.log("사이클이 발생했습니다.");
else console.log("사이클이 발생하지 않았습니다.");
