import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, k] = input[0].split(" ").map(Number);
const count = new Array(100001).fill(0);

const arr = input[1].split(" ").map(Number);

let end = 0;
let length = 0;
let answer = 0;

for (let start = 0; start < n; start++) {
  while (count[arr[end]] < k && end < n) {
    count[arr[end]] += 1;
    end += 1;
    length += 1;
  }
  answer = Math.max(answer, length);
  count[arr[start]] -= 1;
  length -= 1;
}

console.log(answer);

//solve
//투포인터 알고리즘 외워두자...ㅜ 맨날 헷갈려
