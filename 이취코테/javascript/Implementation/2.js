let input = require("fs").readFileSync("../test.txt").toString().split("\n");

let row = parseInt(input[0].split("")[1]);
let col = input[0].split("")[0].charCodeAt(0) - "a".charCodeAt(0) + 1;

const drow = [2, 2, -2, -2, 1, 1, -1, -1];
const dcol = [-1, 1, -1, 1, 2, -2, 2, -2];

let count = 0;
for (let i = 0; i < 8; i++) {
  let nextRow = row + drow[i];
  let nextCol = col + dcol[i];
  if (nextRow <= 8 && nextRow >= 1 && nextCol >= 1 && nextCol <= 8) {
    count += 1;
  }
}
console.log(count);

// 아스키코드 변환 : 문자열.charCodeAt(원하는 문자의 index)
