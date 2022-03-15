import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const s = input[0];

let zero = [];
let one = [];
if (s[0] === "1") {
  one.push(0);
} else {
  zero.push(0);
}
let prev = s[0];
for (let i = 0; i < s.length; i++) {
  if (s[i] !== prev) {
    prev = s[i];
    if (s[i] === "1") one.push(i);
    else zero.push(i);
  }
}

let count = 0;
count = zero.length <= one.length ? zero.length : one.length;
console.log(count);

//solve 😀
//비효율적으로 풀었다. 0과 1의 부분집합?들을 저장할 필요없이 갯수만 저장하면 됨.
let zero_count = 0;
let one_count = 0;
if (s[0] === "1") {
  one_count += 1;
} else {
  zero_count += 1;
}
for (let i = 1; i < s.length; i++) {
  if (s[i] !== s[i - 1]) {
    if (s[i] === "1") one_count += 1;
    else zero_count += 1;
  }
}
console.log(Math.min(zero_count, one_count));
