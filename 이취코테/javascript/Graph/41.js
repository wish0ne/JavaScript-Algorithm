import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const find_parent = (parent, x) => {
  if (parent[x] !== x) {
    parent[x] = find_parent(parent, parent[x]);
  }
  return parent[x];
};

const union_parent = (parent, a, b) => {
  a = find_parent(parent, a);
  b = find_parent(parent, b);
  if (a < b) parent[b] = a;
  else parent[a] = b;
};

const [n, m] = input[0].split(" ").map(Number);
const parent = new Array(n + 1).fill(0);

//부모를 자기자신으로 각각 초기화
for (let i = 1; i <= n; i++) {
  parent[i] = i;
}

//입력값에 대해 union 연산 수행
for (let i = 1; i <= n; i++) {
  input[i]
    .split(" ")
    .map(Number)
    .forEach((ele, index) => {
      if (ele !== 0) {
        union_parent(parent, i, index + 1);
      }
    });
}

//같은 집합에 속하는지 확인 (동일한 루트를 가지는지 확인)
const arr = input[n + 1].split(" ").map(Number);
let trip_parent = find_parent(parent, arr[0]);

const set = new Set(input[n + 1].split(" ").map(Number));
let flag = true;
for (let item of set) {
  let next_parent = find_parent(parent, item);
  if (next_parent !== trip_parent) {
    flag = false;
    break;
  }
}
flag ? console.log("YES") : console.log("NO");

//solve 😀
//서로소 집합 문제. 여행 계획의 모든 노드들이 같은 집합에 속하는지 판별하면 된다.

// 5 4
// 0 1 0 1 1
// 1 0 1 1 0
// 0 1 0 0 0
// 1 1 0 0 0
// 1 0 0 0 0
// 2 3 4 3
