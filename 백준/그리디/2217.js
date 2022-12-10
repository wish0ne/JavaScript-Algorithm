import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const arr = [];
for (let i = 1; i <= n; i++) arr.push(parseInt(input[i]));

arr.sort((a, b) => b - a); //무거운 순 정렬
let answer = 0;
for (let i = 0; i < n; i++) {
  answer = Math.max(answer, arr[i] * (i + 1));
}
console.log(answer);

//solve
//뭔 문젠지 싶었던...ㅋㅋ
//오름차순으로 정렬해도 뒤의 경우가 더 값이 커질 수 있으므로 중간에 작아져도 break하면 안됨
