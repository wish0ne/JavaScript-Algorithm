import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);

//부모 테이블 초기화
const parent = new Array(n + 1).fill().map((arr, index) => index);
//평소 궁금했던 점 찾음 : https://code-anthropoid.tistory.com/111?category=882356
// 그냥 for문 사용하는게 좋을듯 😯 (속도) : https://stackoverflow.com/questions/35578478/array-prototype-fill-with-object-passes-reference-and-not-new-instance?noredirect=1&lq=1

const union = (a, b) => {
  a = find(parent, a);
  b = find(parent, b);
  if (a < b) parent[b] = a;
  else parent[a] = b;
};

const find = (x) => {
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
};

for (let i = 1; i < m + 1; i++) {
  const [x, a, b] = input[i].split(" ").map(Number);
  switch (x) {
    case 0:
      union(a, b);
      break;
    case 1:
      find(a) === find(b) ? console.log("YES") : console.log("NO");
      break;
    default:
  }
}

//solve😀
//서로소 집합 연산 union, find를 그대로 사용하는 문제 (기억하고 있자) ✔
//n과 m의 범위가 100,000이므로 경로압축기법을 사용하는것 중요
