import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const s = input[0].split("").map(Number);

let answer = s[0];
for (let i = 1; i < s.length; i++) {
  if (answer <= 1 || s[i] <= 1) answer += s[i];
  else answer *= s[i];
}
console.log(answer);

//solve 😯
//연산하는 두 수 중 하나라도 0 또는 1이면 더하기, 나머지는 곱하기
