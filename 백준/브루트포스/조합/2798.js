import fs from "fs";
const readFile = "./input.txt";
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

const [n, m] = input[0].split(" ").map(Number);
const cards = input[1].split(" ").map(Number);

let answer = 0;
let minDiff = 999999999;

const combination = Combination(cards, 3);
combination.forEach((card) => {
  let sum = card.reduce((prev, sum) => (prev += sum));
  if (sum <= m && m - sum < minDiff) {
    answer = sum;
    minDiff = m - sum;
  }
});

console.log(answer);

//solve
//조합을 이용한 완전탐색
//3개를 뽑는걸로 정해져있으니까 3중 for문 써서 풀어도됨
