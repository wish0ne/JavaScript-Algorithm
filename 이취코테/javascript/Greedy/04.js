import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
const coin = input[1].split(" ").map(Number);
coin.sort((a, b) => b - a); //내림차순

// 9 6 4 3 1 1 amount = 17
let amount = 1;
let sum = 0;
while (true) {
  for (let i = 0; i < coin.length; i++) {
    if (coin[i] > amount) continue;
    sum += coin[i];
    if (sum === amount) {
      break;
    }
    if (sum > amount) {
      sum -= coin[i];
    }
  }
  if (sum !== amount) {
    console.log(amount);
    break;
  }
  sum = 0;
  amount += 1;
}

//sovle..? 맞았는지 안맞았는지도 모르겠음
//해답)
//정렬을 이용한 그리디 알고리즘 문제.
//화폐 단위가 작은 동전부터 하나씩 확인하면서 최적의 해를 계산할 수 있음.
//이 문제는 그리디 알고리즘이 익숙하지 않다면 쉽게 이해되지 않는 문제! 따라서 그리디 알고리즘 유형의 문제를 더 많이 접해봐야할 필요가 있다⭐⭐
coin.sort((a, b) => a - b);
let target = 1;
for (let x of coin) {
  // 만들 수 없는 금액을 찾았을 때 반복 종료
  if (target < x) break;
  target += x;
}
console.log(target);
