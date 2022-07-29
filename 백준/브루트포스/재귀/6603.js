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

let tc = 0;
while (true) {
  if (Number(input[tc]) === 0) break;
  const s = input[tc].split(" ").map(Number);
  const k = s.shift();

  const combination = Combination(s, 6);

  combination.forEach((c) => {
    c.sort((a, b) => a - b);
  });
  combination.sort((a, b) => {
    for (let i = 0; i < 6; i++) {
      if (a[i] === b[i]) continue;
      else return a[i] - b[i];
    }
  });

  combination.forEach((c) => console.log(c.join(" ")));

  tc += 1;
  console.log("");
}

//solve
//조합으로 모든 경우의 수 구함

//해설
//재귀로 간결하게 해결!! 훨씬 깔끔한 풀이방법
//k개 중 6개 선택 -> 각 숫자마다 선택할지/안할지 두가지를 고려하면 모든 경우의 수를 고려하게 됨.

//k개의 수가 오름차순으로 제공되고, solve에서 index번쨰 수를 선택하는것이 선택하지 않는것보다 우선이므로 사전순으로 나오게됨 -> 정렬 불필요

//a : 입력으로 주어진 수
//index : 선택할지 말지 결정해야 하는 인덱스
//lotto : 현재까지 선택한 숫자들
function solve(a, index, lotto) {
  //6개 선택 완료
  if (lotto.length === 6) {
    console.log(lotto.join(" "));
    return;
  }
  //6개 선택하지 않았는데 index가 끝남 : 불가능한 경우
  if (index === a.length) return;
  solve(a, index + 1, lotto.concat(a[index])); //index 선택
  //✔array.push는 새로운 length를 반환하므로 lotto.concat(a[index])를 해야 계속 배열을 가지고 연산할 수 있음!!
  solve(a, index + 1, lotto); //index 선택x
}

let i = 0;
while (true) {
  const [N, ...a] = input[i].split(" ").map(Number);
  if (N === 0) break;
  solve(a, 0, []);
  i += 1;
  console.log("");
}
