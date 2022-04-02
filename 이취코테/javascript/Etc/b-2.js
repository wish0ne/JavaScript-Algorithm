import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

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

const [l, c] = input[0].split(" ").map(Number);
const char = input[1].split(" ");

const combs = Combination(char, l);
const answer = [];
const mos = ["a", "e", "i", "o", "u"];
for (let comb of combs) {
  let moCount = 0;
  for (let mo of mos) {
    //최소 하나의 모음 포함
    if (comb.includes(mo)) {
      moCount += 1;
    }
  }
  //자음 두개이상, 모음 하나이상 포함
  if (moCount <= l - 2 && moCount > 0) {
    comb.sort();
    answer.push(comb.join(""));
  }
}
answer.sort();
for (let i of answer) console.log(i);

//solve
//처음부터 조건에 맞는 조합만 구하려 하지 말고, 모든 조합을 구한 뒤에 조건에 맞는 것만 찾아내는 방법이 훨씬 쉬움
