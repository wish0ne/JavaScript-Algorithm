import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const members = [];
for (let i = 1; i <= n; i++) {
  let [age, name] = input[i].trim().split(" ");
  members.push([parseInt(age), name]);
}

members.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  else return 0;
});

members.forEach((m) => console.log(m.join(" ")));

//solve
//순서 변경하지 않으려면 0을 return하는거 기억하자!
