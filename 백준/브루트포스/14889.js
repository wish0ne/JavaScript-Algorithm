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

const n = Number(input[0]); //총 사람 수

const s = [];
for (let i = 1; i <= n; i++) {
  s.push(input[i].trim().split(" ").map(Number));
}

const num = [];
for (let i = 1; i <= n; i++) num.push(i);

const combination = Combination(num, n / 2);

//모든 팀의 경우의 수 계산
let min = 999999999;
combination.forEach((comb) => {
  const set = new Set(comb);
  let first = 0;
  let second = 0;
  let first_member = [];
  let second_member = [];
  for (let i = 1; i <= n; i++) {
    //첫번째 팀
    if (set.has(i)) {
      first_member.forEach((member) => {
        first += s[member - 1][i - 1];
        first += s[i - 1][member - 1];
      });
      first_member.push(i);
    }
    //두번째 팀
    else {
      second_member.forEach((member) => {
        second += s[member - 1][i - 1];
        second += s[i - 1][member - 1];
      });
      second_member.push(i);
    }
  }
  min = Math.min(min, Math.abs(first - second));
});

console.log(min);

//solve
//조합 완탐으로 해결

//해설
//순열 완탐으로 해결 -> 조합보다 훨씬 시간단축
function next_permutation(a) {
  let i = a.length - 1;
  while (i > 0 && a[i - 1] >= a[i]) {
    i -= 1;
  }
  if (i <= 0) return false;
  let j = a.length - 1;
  while (a[j] <= a[i - 1]) {
    j -= 1;
  }

  [a[i - 1], a[j]] = [a[j], a[i - 1]];

  j = a.length - 1;
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i += 1;
    j -= 1;
  }
  return true;
}

const N = Number(input[0]);
const a = [];
for (let i = 1; i <= N; i++) {
  a.push(input[i].trim().split(" ").map(Number));
}

//앞 N/2개는 0, 뒤 N/2개는 1인 배열 생성(두 팀)
const b = [];
for (let i = 0; i < N; i++) {
  if (i < N / 2) b.push(0);
  else b.push(1);
}

let ans = 2147483647;
while (true) {
  //현재 순열대로 팀 생성
  const first = [];
  const second = [];
  for (let i = 0; i < N; i++) {
    if (b[i] === 0) first.push(i);
    else second.push(i);
  }

  //각 팀 능력치 계산
  let one = 0;
  let two = 0;
  for (let i = 0; i < N / 2; i++) {
    for (let j = 0; j < N / 2; j++) {
      if (i === j) continue; //나와 나는 넘어감
      one += a[first[i]][first[j]];
      two += a[second[i]][second[j]];
    }
  }
  let diff = Math.abs(one - two);
  if (ans > diff) ans = diff;
  if (!next_permutation(b)) break;
}

console.log(ans);
