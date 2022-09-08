import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const papers = [];
for (let i = 1; i <= n; i++) papers.push(input[i].split(" ").map(Number));

let a = 0; //-1
let b = 0; //0
let c = 0; //1
cut(n, 0, 0);
console.log(a);
console.log(b);
console.log(c);

function cut(n, x, y) {
  if (check(n, x, y)) {
    if (papers[x][y] === -1) a += 1;
    else if (papers[x][y] === 0) b += 1;
    else c += 1;
    return;
  }
  for (let i = x; i < x + n; i += n / 3) {
    for (let j = y; j < y + n; j += n / 3) {
      cut(n / 3, i, j);
    }
  }
}

function check(n, x, y) {
  let value = papers[x][y];
  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (papers[i][j] !== value) return false;
    }
  }
  return true;
}

//solve
//인덱스 맨날 헷갈리는거... 적어가면서 해보자

//해설
function same(a, x, y, n) {
  for (let i = x; i < x + n; i++) {
    for (let j = y; j < y + n; j++) {
      if (a[x][y] !== a[i][j]) return false;
    }
  }
  return true;
}

function solve(a, cnt, x, y, n) {
  if (same(a, x, y, n)) {
    cnt[a[x][y] + 1] += 1;
    return;
  }
  let m = n / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      solve(a, cnt, x + i * m, y + j * m, m);
    }
  }
}

const cnt = new Array(3).fill(0);
solve(papers, cnt, 0, 0, n);
console.log(cnt.join("\n"));
