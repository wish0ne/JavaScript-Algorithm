import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const array = [];
for (let i = 1; i <= n; i++) array.push(input[i].split(" ").map(Number));

const dx = [0, 0, 1, 1];
const dy = [0, 1, 0, 1];
function solve(array) {
  if (array.length === 1) return array[0][0];
  let temp = [];
  for (let i = 0; i < array.length - 1; i += 2) {
    let row = [];
    for (let j = 0; j < array.length - 1; j += 2) {
      let candidates = [];
      for (let k = 0; k < 4; k++) {
        let x = i + dx[k];
        let y = j + dy[k];
        candidates.push(array[x][y]);
      }
      candidates.sort((a, b) => b - a);
      row.push(candidates[1]);
    }
    temp.push(row);
  }
  return solve(temp);
}
console.log(solve(array));

//solve
//딱봐도 분할정복 문제... 근데 분할정복 아직 낯선듯 ㅎ
