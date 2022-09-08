import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const students = [];
for (let i = 1; i <= n; i++) {
  let [name, kr, en, mt] = input[i].trim().split(" ");
  students.push([name, parseInt(kr), parseInt(en), parseInt(mt)]);
}
students.sort((a, b) => {
  if (a[1] !== b[1]) return b[1] - a[1];
  if (a[2] !== b[2]) return a[2] - b[2];
  if (a[3] !== b[3]) return b[3] - a[3];
  if (a[0] < b[0]) return -1;
  else return 1;
});

let ans = "";
students.forEach((s) => (ans += s[0] + "\n"));
console.log(ans);

//solve
//양수 return하면 순서 바뀜
