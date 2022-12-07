import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
let arr = new Set();
for (let i = 1; i <= n; i++) arr.add(input[i].trim());
arr = Array.from(arr);
arr.sort((a, b) => {
  if (a.length !== b.length) return a.length - b.length;
  else {
    if (a < b) return -1;
    else if (a === b) return 0;
    else return 1;
  }
});
console.log(arr.join("\n"));

//solve
//문자열 정렬 문제
