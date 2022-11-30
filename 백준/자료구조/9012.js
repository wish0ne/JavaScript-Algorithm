import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const t = parseInt(input[0]);
const answer = [];
for (let i = 1; i <= t; i++) {
  const str = input[i].split("");
  const isVPC = check(str);
  isVPC ? answer.push("YES") : answer.push("NO");
}

function check(str) {
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") stack.push("(");
    else if (str[i] === ")") {
      if (stack.length === 0) return false;
      else stack.pop();
    }
  }
  if (stack.length === 0) return true;
  else return false;
}

console.log(answer.join("\n"));

//solve
//자주나오는 스택 문제이긴한데 응용해서 복잡하게 나오면 스택 못떠올릴수도 있을듯..?
//자주나오는 유형인만큼 기억해두자
