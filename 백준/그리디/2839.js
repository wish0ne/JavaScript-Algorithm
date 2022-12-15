import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

let n = parseInt(input[0]);

let count = 0;
while (n >= 3) {
  if (n % 5 === 0) {
    count += n / 5;
    n %= 5;
  }
  if (n >= 3) {
    count += 1;
    n -= 3;
  }
}
n > 0 ? console.log(-1) : console.log(count);

//solve
//쉬운 그리디 문제
