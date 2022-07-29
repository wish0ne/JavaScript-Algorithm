import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const Combination = (arr, selectNum) => {
  //하나씩 선택하는 경우 각 원소를 배열에 넣은 배열 return
  if (selectNum === 1) return arr.map((a) => [a]);
  const results = []; //조합이 담길 배열
  arr.forEach((a, index) => {
    //작은 배열로 나눠서 조합을 구함.
    //배열을 앞에서부터 하나씩 잘라서 작은 배열로 만들고 거기서 하나를 제외한 조합을 구함. => 앞의 숫자를 고정한채로 조합을 구하는것.
    const smallerCombination = Combination(arr.slice(index + 1), selectNum - 1);
    smallerCombination.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
};

const [n, s] = input[0].split(" ").map(Number);
const num = input[1].split(" ").map(Number);

let count = 0;
for (let i = 1; i <= n; i++) {
  const combination = Combination(num, i);
  combination.forEach((c) => {
    let sum = c.reduce((prev, curr) => (prev += curr));
    if (sum === s) count += 1;
  });
}
console.log(count);

//solve
//조합으로 완탐

//해설
//재귀로 훨씬 깔끔한 풀이
const [N, M] = input[0].split(" ").map(Number);
const a = input[1].split(" ").map(Number);
let ans = 0;

// i : 현재 넣을지 말지 결정할 인덱스
// s : 현재 부분수열의 합
function go(i, s) {
  if (i === N) {
    if (s === M) ans += 1; //정답을 찾은 경우 : 부분수열이 결정되고 그 합이 원하는 값일때
    return;
  }
  go(i + 1, s + a[i]);
  go(i + 1, s);
}

go(0, 0);
if (M === 0) ans -= 1; //크기가 0인 부분수열이 count되었을때 제거
console.log(ans);
