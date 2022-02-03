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
let maxResult = 0;

for (let i = 1; i < m + 1; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  edges.push([c, a, b]);
}

edges.sort((x, y) => x[0] - y[0]); // 비용 기준으로 정렬

for (let edge of edges) {
  const [cost, a, b] = edge;
  //사이클이 발생하지 않는 경우에만 집합에 포함
  if (find(parent, a) !== find(parent, b)) {
    union(parent, a, b);
    result += cost;
    //✔ 크루스칼 알고리즘은 그리디 알고리즘으로, 간선이 최소인것부터 선택하기 때문에 max를 사용할 필요 없이 그냥 나중의 cost가 항상 최대가 된다.
    // maxResult = Math.max(maxResult, cost);
    maxResult = cost;
  }
}

console.log(result - maxResult); //비용 max인 간선 제거

//solve😀
//최소신장트리 알고리즘(크루스칼 알고리즘)을 그대로 사용하는 문제 (기억하고 있자) ✔
//최소신장트리 2개를 만드는 것이므로, 전체에서 최소신장트리를 만든 후에 가장 비용이 큰 간선을 제거하면 된다.

// 7 12
// 1 2 3
// 1 3 2
// 3 2 1
// 2 5 2
// 3 4 4
// 7 3 6
// 5 1 5
// 1 6 2
// 6 4 1
// 6 5 3
// 4 5 3
// 6 7 4
