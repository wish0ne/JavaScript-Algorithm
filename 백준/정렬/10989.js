import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const numbers = new Array(10001).fill(0);
for (let i = 1; i <= n; i++) {
  numbers[parseInt(input[i])] += 1;
}
let ans = "";
for (let i = 1; i < 10001; i++) {
  for (let j = 0; j < numbers[i]; j++) ans += i + "\n";
}
console.log(ans);

//계수정렬 써도 메모리 초과 났음! nodejs로는 풀 수 없는 문제라고 한다~
