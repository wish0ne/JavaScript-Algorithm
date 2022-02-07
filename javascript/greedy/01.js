import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
let arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b); //오름차순 정렬

let num = 0;
let length = 0; //group의 length
for (let i of arr) {
  length += 1;
  if (length === i) {
    num += 1;
    length = 0;
  }
}
console.log(num);

//그리디 문제
//not solve 😡(예외처리 실패) (예외 : 1 1 1 1 5)
//그룹의 최대 개수를 구하기 위해서는 오름차순으로 작은것부터 고려해야 했는데, 반대로 내림차순으로 큰것부터 고려한게 가장 큰 실수
//예외를 잘 찾는것도 중요하다⭐⭐⭐⭐⭐ (예외를 찾지 못하면 문제 완벽히 이해 못한거나 마찬가지)
