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

import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const check = new Array(n + 1);
for (let i = 0; i <= n; i++) check[i] = new Array(n + 1).fill(true);

const ice = new Array(n);
for (let i = 0; i < n; i++) ice[i] = i + 1;

for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  check[a][b] = false;
  check[b][a] = false;
}

const combinations = Combination(ice, 3);
let count = 0;
for (let combination of combinations) {
  const [a, b, c] = combination;
  if (!check[a][b]) continue;
  if (!check[a][c]) continue;
  if (!check[b][c]) continue;
  count += 1;
}
console.log(count);

//solve
//체감 난이도 왜케 어려워 ㅋㅋ ㅠ
//조합 전체 구하면 백만인데, 백만을 각각 만개 불가능 조합 검사해야하니까 시간초과 어케 줄일지 막막했음
//걍 불가능 조합 검사 시간을 2차원배열 써서 O(1)로 줄이면 되는데!! 바보

//그리고 조합, 순열 갖다쓰면 시간 오래걸리는듯 ㅠ 이 문제는 3개만 고르면 되니까 3중 for문으로 구하면 시간 엄청 단축가능
//쉽게 생각하자 쉽게...ㅜ

const able = new Array(n + 1);
for (let i = 0; i <= n; i++) able[i] = new Array(n + 1).fill(true);

for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  able[a][b] = false;
  able[b][a] = false;
}

let answer = 0;
//✔j, k는 1부터 시작이 아니라 i+1, j+1부터 시작해야 중복 없음
for (let i = 1; i <= n; i++) {
  for (let j = i + 1; j <= n; j++) {
    if (!able[i][j]) continue;
    for (let k = j + 1; k <= n; k++) {
      if (!able[i][k]) continue;
      if (!able[j][k]) continue;
      answer += 1;
    }
  }
}
console.log(answer);
