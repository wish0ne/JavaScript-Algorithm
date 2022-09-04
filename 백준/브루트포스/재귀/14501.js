import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const consultings = [];
for (let i = 1; i <= n; i++) consultings.push(input[i].split(" ").map(Number));

const dp = new Array(n).fill(0);
for (let i = 0; i < n; i++) {
  const [t, p] = consultings[i];
  if (i + t <= n) dp[i] = Math.max(dp[i], p);
  for (let j = i + t; j < n; j++) {
    const [nt, np] = consultings[j];
    if (j + nt > n) continue;
    dp[j] = Math.max(dp[j], dp[i] + np);
  }
}

console.log(Math.max(...dp));

//solve
//여전히... 헷갈린다

//해설
//브루트포스 & dp로 모두 풀이 가능
//이전 재귀 호출이 다음 재귀 호출에 영향을 미치지 않을때 브루트포스를 dp로 풀 수 있다.
const inf = 999999999;
const N = parseInt(input[0]);
const t = new Array(N + 1).fill(0);
const p = new Array(N + 1).fill(0);
const d = new Array(N + 1).fill(-1);
for (let i = 1; i <= N; i++) {
  [t[i], p[i]] = input[i].split(" ").map(Number);
}

//d[i] : i일로부터 얻을 수 있는 최대 수익
//최종 정답은 d[1]에 존재
function go(day) {
  if (day === N + 1) return 0; //퇴사 날짜
  if (day > N + 1) return -inf; //범위 넘어감
  if (d[day] !== -1) return d[day];
  let t1 = go(day + 1); //상담 x
  let t2 = p[day] + go(day + t[day]); //상담 o
  d[day] = Math.max(t1, t2);
  return d[day];
}

console.log(go(1));
