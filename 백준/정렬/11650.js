import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const points = [];
for (let i = 1; i <= n; i++) points.push(input[i].split(" ").map(Number));
points.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  else return a[1] - b[1];
});

let answer = "";
points.forEach((p) => {
  answer += p[0] + " " + p[1] + "\n";
});
console.log(answer);

//solve
