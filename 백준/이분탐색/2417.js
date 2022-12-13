import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = BigInt(input[0]);

//binary search
let answer = BigInt(0);
function binary_search(start, end) {
  while (start <= end) {
    let mid = BigInt((start + end) / BigInt(2));
    if (mid * mid >= n) {
      answer = mid;
      end = mid - BigInt(1);
    } else start = mid + BigInt(1);
  }
}

binary_search(BigInt(0), n);
console.log(answer.toString());

//solve
//쉬운 바이너리 서치 문제~~~
