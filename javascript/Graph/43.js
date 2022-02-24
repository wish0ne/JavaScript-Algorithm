import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const find = (parent, x) => {
  if (parent[x] !== x) parent[x] = find(parent, parent[x]);
  return parent[x];
};

const union = (parent, a, b) => {
  a = find(parent, a);
  b = find(parent, b);
  if (a < b) parent[b] = a;
  else parent[a] = b;
};

const parent = new Array(n + 1);
for (let i = 0; i < n + 1; i++) {
  parent[i] = i;
}

const edges = []; //간선 배열
let result = 0;

for (let i = 1; i < m + 1; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  edges.push([c, a, b]);
}

edges.sort((x, y) => x[0] - y[0]); // 비용 기준으로 정렬

//크루스칼 알고리즘
for (let edge of edges) {
  const [cost, a, b] = edge;
  //사이클이 발생하지 않는 경우에만 집합에 포함
  if (find(parent, a) !== find(parent, b)) {
    union(parent, a, b);
  } else {
    result += cost; //집합에 포함하지 않는 간선들만 더함 (절약할 수 있는 금액)
  }
}
console.log(result);

// solve 😀
// 최소신장트리 문제-> 크루스칼 알고리즘
