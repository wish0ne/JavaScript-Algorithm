import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);
const b = input[2].split(" ").map(Number);

const answer = [];
let aIndex = 0;
let bIndex = 0;

while (aIndex < n && bIndex < m) {
  if (a[aIndex] <= b[bIndex]) {
    answer.push(a[aIndex]);
    aIndex += 1;
  } else {
    answer.push(b[bIndex]);
    bIndex += 1;
  }
}

if (aIndex < n) {
  for (let i = aIndex; i < n; i++) answer.push(a[i]);
}
if (bIndex < m) {
  for (let i = bIndex; i < m; i++) answer.push(b[i]);
}

console.log(answer.join(" "));

//solve
//투포인터로 정렬된 두 배열 합치는 기본 개념 문제(merge sort)

//배열 두개 그냥 합치고 정렬해도 됨
const answer2 = a.concat(b);
answer2.sort((a, b) => a - b);
console.log(answer2.join(" "));
