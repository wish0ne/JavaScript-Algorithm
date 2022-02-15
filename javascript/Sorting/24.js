import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
const houses = input[1].split(" ").map(Number);

//중앙값이 최소
houses.sort((a, b) => a - b);
if (n % 2 === 0) {
  console.log(houses[n / 2 - 1]);
} else {
  console.log(houses[parseInt(n / 2)]);
}

//오답 1번 -> 중복 없애서 계산했음 ㅠ
//1 10 10 인 경우 답이 10이여야 하는데 중복을 없애서 1 10 만 고려하다 보니 1로 계산
