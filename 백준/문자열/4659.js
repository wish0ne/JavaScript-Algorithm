import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

let index = 0;
const answer = [];
while (true) {
  const test = input[index].trim();
  if (test === "end") break;
  if (check(test)) {
    answer.push(`<${test}> is acceptable.`);
  } else answer.push(`<${test}> is not acceptable.`);
  index += 1;
}
console.log(answer.join("\n"));

function check(test) {
  if (!test.match(/[a, e, i, o, u]/)) return false;
  if (test.match(/[a,e,i,o,u]{3}/) || test.match(/[^a,e,i,o,u]{3}/))
    return false;
  if (test.match(/([^e, o])\1+/)) return false;
  return true;
}

//solve
//앞 조건 두개는 정규식으로 풀면되고, 마지막 조건은 정규식 좀 까다로워서 걍 완탐하는게 나을듯
//정규식...어렵다^^
