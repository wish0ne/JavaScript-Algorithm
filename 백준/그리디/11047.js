import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

let [n, k] = input[0].split(" ").map(Number);
const a = [];
for (let i = 1; i <= n; i++) a.push(Number(input[i]));

let count = 0;
for (let i = n - 1; i >= 0; i--) {
  const c = parseInt(k / a[i]);
  count += c;
  k -= c * a[i];
}
console.log(count);

//solve
//쉬운 그리디 문제

//해설
//동전이 배수관계이므로 그리디 사용

let [N, K] = input[0].split(" ").map(Number);
const A = [];
for (let i = 1; i <= N; i++) A.push(Number(input[i]));

let ans = 0;
for (let i = N - 1; i > -1; i--) {
  ans += parseInt(K / A[i]);
  K %= A[i];
}
console.log(ans);
