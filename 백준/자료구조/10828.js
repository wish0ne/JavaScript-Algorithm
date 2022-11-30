import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const stack = [];
let answer = "";
for (let i = 1; i <= n; i++) {
  const [instruction, number] = input[i].split(" ");
  switch (instruction.trim()) {
    case "push":
      stack.push(number);
      break;
    case "pop":
      if (stack.length === 0) answer += "-1\n";
      else answer += stack.pop() + "\n";
      break;
    case "size":
      answer += stack.length + "\n";
      break;
    case "empty":
      if (stack.length === 0) answer += "1\n";
      else answer += "0\n";
      break;
    case "top":
      if (stack.length === 0) answer += "-1\n";
      else answer += stack[stack.length - 1] + "\n";
      break;
  }
}
console.log(answer);

//solve
//스택 개념 문제
//answer도 문자열로 관리하지 말고 배열에 추가한다음 join('\n')하는게 깔끔할듯
const s = [];
answer = [];
for (let i = 1; i <= n; i++) {
  const arr = input[i].split(" ");
  switch (arr[0].trim()) {
    case "push":
      s.push(arr[1]);
      break;
    case "pop":
      s.length === 0 ? answer.push(-1) : answer.push(s.pop());
      break;
    case "size":
      answer.push(s.length);
      break;
    case "empty":
      s.length === 0 ? answer.push(1) : answer.push(0);
      break;
    case "top":
      s.length === 0 ? answer.push(-1) : answer.push(s[s.length - 1]);
      break;
  }
}
console.log(answer.join("\n"));
