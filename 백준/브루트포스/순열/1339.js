import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = Number(input[0]);

let alphabet = new Array(26).fill(0);

//등장하는 모든 알파벳의 자릿수를 고려
for (let i = 1; i <= n; i++) {
  let length = input[i].trim().length;
  input[i]
    .trim()
    .split("")
    .forEach((char, idx) => {
      alphabet[char.charCodeAt(0) - "A".charCodeAt(0)] += Math.pow(
        10,
        length - idx - 1
      );
    });
}

//전체 자릿수가 가장 큰 알파벳 순으로 정렬
alphabet = alphabet.map((count, idx) => [count, idx]);
alphabet.sort((a, b) => b[0] - a[0]);

//알파벳 - 숫자 매핑
const map = new Map();
for (let i = 0; i < 26; i++) {
  if (alphabet[i][0] === 0) break;
  map.set(String.fromCharCode("A".charCodeAt(0) + alphabet[i][1]), 9 - i);
}

//각 단어를 숫자로 만듦
let answer = 0;
for (let i = 1; i <= n; i++) {
  let temp = "";
  input[i]
    .trim()
    .split("")
    .forEach((char) => {
      temp += map.get(char).toString();
    });
  answer += Number(temp);
}

console.log(answer);

//그리디
//실패 1회
//1) 반례 생각 실패 : 처음에는 순서만 생각했음. 자릿수가 큰것부터 9,8,7...순으로 배정했음
//반례 : BC, AA가 있을때 B에게 9을 배정하게되면 최대값이 안됨(A에게 9를 배정해야함). 각 문자의 가장 큰 자릿수만 고려하는게 아니라 모든 자릿수를 고려해야 최대값을 구할 수 있었음

//해설 : 브루트 포스
//큰 수 k를 가지고 순열 생성
//모든 순열을 가지고 모든 자릿수의 합을 구해서 최대값 갱신
//완전탐색이라 nodejs로는 통과 불과(C++, Java는 가능)

//순열을 최소값에서부터 증가하는 순으로 생성
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

//d(숫자 순열 하나)로 알파벳(letters)매칭 후 a(단어) 합 계산
function calc(a, letters, d) {
  let m = letters.length; //알파벳 개수
  let ans = 0;
  let alpha = new Map();
  for (let i = 0; i < m; i++) alpha.set(letters[i], d[i]); //알파벳마다 숫자 배정

  //배정된 숫자로 단어의 숫자 계산
  for (let s of a) {
    let now = 0;
    //단어의 모든 자릿수 계산
    for (let x of s) {
      now = now * 10 + alpha.get(x); //앞의 자리에 계속 10을 곱한 효과(큰 자릿수 고려)
    }
    ans += now;
  }
  return ans; //합 return
}

const N = Number(input[0]);
const a = new Array(N).fill(""); //단어 배열
let letters = new Set(); //등장하는 알파벳 집합

for (let i = 1; i <= N; i++) {
  a[i - 1] = input[i].trim();
  a[i - 1].split("").forEach((t) => letters.add(t));
}

letters = Array.from(letters);
let m = letters.length;
let d = [];
for (let i = 9 - m + 1; i <= 9; i++) d.push(i); //9-m+1 ~ 9까지의 숫자 (가장 큰 수 m개)

let ans = 0; //최대값
while (true) {
  let now = calc(a, letters, d); //새로운 숫자 조합으로 알파벳 매칭하고 합 계산
  if (ans < now) ans = now; //더 큰 값이면 갱신
  if (!next_permutation(d)) break; //모든 조합을 확인했으면 종료
}

console.log(ans);
