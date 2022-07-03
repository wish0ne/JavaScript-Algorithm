import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n"); //'/dev/stdin'

const [n, m] = input[0].split(" ").map(Number);
const satisfactions = input[1].split(" ").map(Number);
const costs = input[2].split(" ").map(Number);

satisfactions.sort((a, b) => b - a);
costs.sort((a, b) => a - b);

let answer = 0;
for (let i = 0; i < costs.length; i++) {
  let customer = satisfactions[i] - costs[i];
  if (customer >= 0) answer += customer;
  else break;
}

console.log(answer);
