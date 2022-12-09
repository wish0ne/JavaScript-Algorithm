import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [a, b, c, m] = input[0].split(" ").map(Number);

let answer = 0;
let fatigue = 0;
for (let i = 0; i < 24; i++) {
  if (fatigue + a > m) {
    fatigue - c < 0 ? (fatigue = 0) : (fatigue -= c); //대입 잘못해서 틀림 ㅜ
  } else {
    fatigue += a;
    answer += b;
  }
}
console.log(answer);

//solve
