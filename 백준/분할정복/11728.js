import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);
const b = input[2].split(" ").map(Number);

const c = new Array(n + m).fill(0); //합친 결과를 담을 배열

let ai = 0;
let bi = 0;
let ci = 0;
while (ai < n && bi < m) {
  if (a[ai] <= b[bi]) {
    c[ci] = a[ai];
    ai += 1;
  } else {
    c[ci] = b[bi];
    bi += 1;
  }
  ci += 1;
}

//남은 것 합치기
while (ai < n) {
  c[ci] = a[ai];
  ci += 1;
  ai += 1;
}
while (bi < m) {
  c[ci] = b[bi];
  ci += 1;
  bi += 1;
}
console.log(c.join(" "));

//solve
//머지 소트의 개념

//해설
let i = 0;
let j = 0;
let k = 0;
while (i < n || j < m) {
  //a를 채울 경우
  if (j >= m || (i < n && a[i] <= b[j])) {
    c[k] = a[i];
    k += 1;
    i += 1;
  } else {
    c[k] = b[j];
    k += 1;
    j += 1;
  }
}
console.log(c.join(" "));
