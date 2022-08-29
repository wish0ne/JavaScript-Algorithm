import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = Number(input[0]);
const skills = input[1].trim().split("");

let count = 0;
let l = 0;
let s = 0;
for (let i = 0; i < n; i++) {
  if (isNaN(skills[i])) {
    if (skills[i] === "L") {
      l += 1;
    } else if (skills[i] === "R") {
      if (l > 0) {
        count += 1;
        l -= 1;
      } else break;
    } else if (skills[i] === "S") {
      s += 1;
    } else if (skills[i] === "K") {
      if (s > 0) {
        count += 1;
        s -= 1;
      } else break;
    }
  }
  //숫자
  else count += 1;
}

console.log(count);
