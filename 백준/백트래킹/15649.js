import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

//순열 풀이
const [n, m] = input[0].split(" ").map(Number);
const numbers = new Array(n);
for (let i = 0; i < n; i++) numbers[i] = i + 1;

const permutations = Permutation(numbers, m);
const answer = permutations.map((p) => p.join(" "));
//console.log(answer.join("\n"));

function Permutation(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = Permutation(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
}

//solve

//백트래킹 풀이 (순열 풀이보다 훨씬 빠름)
//근데 백트래킹 아직 잘 이해 못한듯... 코드 짜기가 어려움
let answer2 = [];
let arr = [];
function go(v) {
  if (arr.length === m) {
    answer2.push(arr.join(" "));
    return;
  }
  for (let i = 1; i <= n; i++) {
    if (arr.indexOf(i) === -1) {
      arr.push(i);
      go(i);
      arr.pop();
    }
  }
}
go(0);
//console.log(answer2.join("\n"));

//참고 풀이
const visited = new Array(9).fill(false);
const temp = [];
let output = [];
function solve(count) {
  //m개 선택완료하면 더 이상 탐색 중단
  if (count >= m) {
    output.push(temp.join(" "));
    return;
  }
  //1부터 차례대로 선택안한것 선택
  for (let i = 1; i <= n; i++) {
    if (!visited[i]) {
      temp.push(i);
      visited[i] = true;
      solve(count + 1);
      //초기화
      visited[i] = false;
      temp.pop();
    }
  }
}
solve(0);
console.log(output.join("\n"));
