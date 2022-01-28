let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);

let arr = [];
//객체값을 배열에 push
for (let i = 0; i < n; i++) {
  let [name, score] = input[i + 1].split(" ");
  arr.push({ name: name, score: score });
}
//객체 중 score을 기준으로 정렬
arr.sort((a, b) => a.score - b.score);

let answer = "";
for (let i of arr) {
  answer += i.name + " ";
}
console.log(answer.trim());
