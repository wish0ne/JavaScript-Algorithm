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
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().trim().split("\n");

const [n, k] = input[0].split(" ").map(Number);

function solution() {
  if (k < 5) return 0;

  const words = [];
  let set = new Set();
  const default_set = new Set(["a", "n", "t", "i", "c"]);
  for (let i = 1; i <= n; i++) {
    let temp = input[i].trim().split("");
    words.push(temp);
    temp.forEach((t) => {
      if (!default_set.has(t)) set.add(t);
    });
  }

  //✔배울 수 있는 갯수보다 전체 글자의 수가 작은 경우 -> Combination 안돌기때문에 따로 체크해줘야함
  if (set.size <= k - 5) return n;
  //✔k가 딱 5개이면 "antatica"일때만 가능함. 예외처리 해줘야함
  if (k === 5) {
    let count = 0;
    words.forEach((w) => {
      if (w.join("") === "antatica") count += 1;
    });
    return count;
  }
  set = Array.from(set);
  let combs = Combination(set, k - 5); //가르칠 k-5개 단어 선택

  let max = 0;
  combs.forEach((comb) => {
    //각 조합에 대해 계산
    let count = 0;
    let temp = new Set(comb);
    //모든 단어 검사
    for (let i = 0; i < n; i++) {
      let flag = true;
      for (let j = 4; j < words[i].length - 4; j++) {
        if (!temp.has(words[i][j]) && !default_set.has(words[i][j])) {
          flag = false;
          break;
        }
      }
      if (flag) count += 1;
    }
    max = Math.max(max, count);
  });

  return max;
}

console.log(solution());

//진짜 이게 머야...^^
//메모리 초과 : 알파벳 5개를 빼주고 조합돌려야함. 26C13이면 메모리초과 당연함
//오답 1 : k-5가 알파벳 5개를 제외한 나머지 알파벳수보다 크면 combination이 안돔!! 3개중에 4개를 선택할 순 없으니까... 즉 모든 단어가 가능한 경우이므로 바로 n을 return해줘야함
//오답 2 : k가 딱 5개일때 "antatica"만 가능함. 이 경우도 예외처리 해줘야함
//흑흑 엣지케이스를 생각해보자
//그리고 Combination을 사용할때 조합이 안돌 수 있는 경우를 꼭!! 생각해보자⭐

//해설
function count(mask, words) {
  let cnt = 0;
  for (let word of words) {
    //배우지 않은 알파벳이 단어에 있는지 검사
    //(1<<26)-1-mask : 배우지 않은 알파벳의 비트만 1이 됨
    if ((word & ((1 << 26) - 1 - mask)) === 0) cnt += 1;
  }
  return cnt;
}

//26개 알파벳 중에 k개를 선택했을때 읽을 수 있는 단어 count
//mask : 배운 알파벳의 비트마스크
function go(index, k, mask, words) {
  if (k < 0) return 0;
  if (index === 26) return count(mask, words); //알파벳 전부 결정 : count
  let ans = 0;
  let t1 = go(index + 1, k - 1, mask | (1 << index), words); //index번째 알파벳을 배우는경우
  if (ans < t1) {
    ans = t1;
  }
  //antic은 꼭 배워야함
  if (
    ![
      "a".charCodeAt(0) - "a".charCodeAt(0),
      "n".charCodeAt(0) - "a".charCodeAt(0),
      "t".charCodeAt(0) - "a".charCodeAt(0),
      "i".charCodeAt(0) - "a".charCodeAt(0),
      "c".charCodeAt(0) - "a".charCodeAt(0),
    ].includes(index)
  ) {
    let t2 = go(index + 1, k, mask, words);
    if (ans < t2) {
      ans = t2;
    }
  }
  return ans;
}

const words = new Array(n).fill(0);
for (let i = 1; i <= n; i++) {
  let s = input[i].trim(); //trim() 꼭 해주기..
  for (let x of s) {
    words[i - 1] |= 1 << (x.charCodeAt(0) - "a".charCodeAt(0)); //words[i] : i번째 단어를 구성하는 알파벳을 비트마스크 형태로 저장
  }
}

console.log(go(0, k, 0, words));

//참고
console.log((1 << 26).toString(2));
console.log(((1 << 26) - 1).toString(2));
