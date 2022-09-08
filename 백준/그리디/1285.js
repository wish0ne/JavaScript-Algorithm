import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const coins = [];
for (let i = 1; i <= n; i++) coins.push(input[i].trim().split(""));

let answer = 999999999;
go(0, coins);
console.log(answer);
function go(idx, coins) {
  if (idx === n) {
    let count = col_all_swap(coins);
    return count;
  }
  //i번째 행 안뒤집을 경우
  let t1 = go(idx + 1, coins);
  if (answer > t1) answer = t1;
  //i번쨰 행 뒤집은 경우
  row_swap(idx, coins);
  let t2 = go(idx + 1, coins);
  if (answer > t2) answer = t2;
}

function row_swap(idx, coins) {
  for (let i = 0; i < n; i++) {
    if (coins[idx][i] === "T") coins[idx][i] = "H";
    else coins[idx][i] = "T";
  }
}

function col_all_swap(coins) {
  for (let j = 0; j < n; j++) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      if (coins[i][j] === "T") count += 1;
    }
    if (count > n / 2) {
      col_swap(j); //✔안뒤집어도 됨!! T, H중 더 작은거의 개수만 알면됨
    }
  }

  return t_count();
}

function col_swap(idx) {
  for (let i = 0; i < n; i++) {
    if (coins[i][idx] === "T") coins[i][idx] = "H";
    else coins[i][idx] = "T";
  }
}

function t_count() {
  let count = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (coins[i][j] === "T") count += 1;
    }
  }
  return count;
}

//휴... 행이 결정되면 열은 자동 결정된다는거 이용해서 뒤집을 행을 조합으로 모든경우의 수 구해서 풀려했음
//근데!! 메모리 초과나서 이렇게 풀면 안되는구나 해서 고민했는데;; 재귀로 푸니까 됨
//조합말고 재귀로 모든 경우의 수를 구하는 거 연습해야겠음

function flip(x) {
  if (x === "H") return "T";
  else return "H";
}

let ans = n * n;
//state : 행을 바꿀지 말지를 비트마스크로 구현(바꾸는 행 : i번째 비트가 1)
for (let state = 0; state < 1 << n; state++) {
  let tot = 0;
  //각각의 열에 대해서 먼저 뒤집어야할 동전을 뒤집고 T, H의 개수 구함
  //더 작은 개수를 선택해서(T를 선택하면 뒤집지 않는 경우, H를 선택하면 뒤집는 경우) tot에 더함
  //tot이 ans보다 작다면 최소 경우
  for (let j = 0; j < n; j++) {
    let cnt = 0; //T의 갯수
    for (let i = 0; i < n; i++) {
      let cur = coins[i][j];
      //뒤집는 행의 동전이면 뒤집음
      //1<<i : i+1번째 자리가 1이고 나머지가 0 -> i번째가 둘다 1이면 현재 동전 뒤집음
      if ((state & (1 << i)) !== 0) cur = flip(cur);
      if (cur === "T") cnt += 1;
    }
    //cnt : j번째 열의 T의 개수
    //n-cnt : j번째 열의 H의 개수
    //cnt가 더 작으면 j번째열을 뒤집지 않는 경우, n-cnt가 더 작으면 뒤집는 경우
    tot += Math.min(cnt, n - cnt);
  }
  if (ans > tot) ans = tot;
}

console.log(ans);
