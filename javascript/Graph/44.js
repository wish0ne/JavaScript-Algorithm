import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);

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

let parent = new Array(n + 1);
for (let i = 0; i < n + 1; i++) {
  parent[i] = i;
}

const nodes = []; //노드 배열
let edges = []; //간선 배열
let result = 0;

for (let i = 1; i < n + 1; i++) {
  const [x, y, z] = input[i].split(" ").map(Number);
  nodes.push([x, y, z]);
}

for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    edges.push([
      Math.min(
        Math.abs(nodes[i][0] - nodes[j][0]),
        Math.abs(nodes[i][1] - nodes[j][1]),
        Math.abs(nodes[i][2] - nodes[j][2])
      ),
      i,
      j,
    ]);
  }
}
edges.sort((x, y) => x[0] - y[0]); // 비용 기준으로 정렬

//크루스칼 알고리즘
for (let edge of edges) {
  const [cost, a, b] = edge;
  //사이클이 발생하지 않는 경우에만 집합에 포함
  if (find(parent, a) !== find(parent, b)) {
    union(parent, a, b);
    result += cost;
  }
}

console.log(result);

//not solve 😵
//일반적인 크루스칼 알고리즘을 이용해서 풀면 모든 간선을 다 고려하기 때문에 메모리초과 발생. O(N^2)
//N<=2000일때만 O(N^2)가능. N이 100,000이라면 O(NlgN) 이용해야함.

//따라서 고려할 간선의 수를 줄여야함. -> 간선의 cost가 거리가 아닌 x,y,z좌표 차이 중 최소값임을 이용.
//-> 이웃한 두 행성의 간선이 최소후보가 됨. 이웃하지 않은 행성간의 간선은 고려할 필요가 없음.
// 각 노드에 대하여 x축, y축, z축으로 인접한 간선 2개씩 총 6개의 간선만 확인하면 됨. (모든 노드가 서로 연결되어 있기 때문에?)
//즉 이웃한 노드끼리의 간선만 고려하면 된다. 간선에 대한 정보를 생성하고 정렬을 이용해서 MST 수행함으로써 탐색해야할 edge 수를 줄이는것.
//⭐즉 최종 결과물인 MST에서 연결된 정점은 항상 인접하다.
// 그러면 총 고려해야할 간선의 개수는 3*(N-1)이 된다.

parent = new Array(n + 1).fill(0);
edges = [];
result = 0;

for (let i = 1; i < n + 1; i++) {
  parent[i] = i;
}

const x = [];
const y = [];
const z = [];

//입력받기
for (let i = 1; i < n + 1; i++) {
  const data = input[i].split(" ").map(Number);
  x.push([data[0], i]);
  y.push([data[1], i]);
  z.push([data[2], i]);
}

x.sort((a, b) => a[0] - b[0]);
y.sort((a, b) => a[0] - b[0]);
z.sort((a, b) => a[0] - b[0]);

//인접한 노드들로부터 간선 정보를 추출하여 처리
for (let i = 0; i < n - 1; i++) {
  //비용순으로 정렬하기 위해 첫번째 원소를 비용으로 설정
  edges.push([x[i + 1][0] - x[i][0], x[i][1], x[i + 1][1]]);
  edges.push([y[i + 1][0] - y[i][0], y[i][1], y[i + 1][1]]);
  edges.push([z[i + 1][0] - z[i][0], z[i][1], z[i + 1][1]]);
}

//간선을 비용순으로 정렬
edges.sort((a, b) => a[0] - b[0]);

//크루스칼 알고리즘
for (let edge of edges) {
  const [cost, a, b] = edge;
  //사이클이 발생하지 않는 경우에만 집합에 포함
  if (find(parent, a) !== find(parent, b)) {
    union(parent, a, b);
    result += cost;
  }
}

console.log(result);
