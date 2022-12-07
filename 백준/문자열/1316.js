import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
let count = 0;
for (let i = 1; i <= n; i++) {
  if (check(input[i].trim().split(""))) count += 1;
}
console.log(count);

function check(input) {
  const check = new Array(26).fill(-1);
  for (let i = 0; i < input.length; i++) {
    let index = input[i].charCodeAt(0) - "a".charCodeAt(0);
    if (check[index] === -1 || check[index] === i - 1) check[index] = i;
    else return false;
  }
  return true;
}

//solve

//배열을 이용한 풀이
//배열에 처음으로 등장하는 알파벳을 넣음.
//탐색한 글자가 배열에 존재하면서 마지막 요소가 아니라면 그룹 단어 아님
let answer = 0;
for (let i = 1; i <= n; i++) {
  if (solve(input[i].trim())) answer += 1;
}
console.log(answer);

function solve(input) {
  const first = [];
  for (let i = 0; i < input.length; i++) {
    let index = first.indexOf(input[i]);
    if (index === -1) first.push(input[i]);
    else if (index !== first.length - 1) {
      return false;
    }
  }
  return true;
}
