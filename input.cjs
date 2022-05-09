const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 배열로 input 한번에 받음
let input = [];

rl.on("line", function (line) {
  input.push(line); //입력받기
}).on("close", function () {
  solution(input); //입력을 파라미터로  solution함수 실행
});

function solution(input) {
  console.log(input);
}
