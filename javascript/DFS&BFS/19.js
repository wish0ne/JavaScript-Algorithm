import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);
let [add, sub, mul, div] = input[2].split(" ").map(Number);

let max_num = -1000000000;
let min_num = 1000000000;

const dfs = (i, value) => {
  if (i === n) {
    min_num = Math.min(value, min_num);
    max_num = Math.max(value, max_num);
  } else {
    if (add > 0) {
      add -= 1;
      dfs(i + 1, value + arr[i]);
      add += 1;
    }
    if (sub > 0) {
      sub -= 1;
      dfs(i + 1, value - arr[i]);
      sub += 1;
    }
    if (mul > 0) {
      mul -= 1;
      dfs(i + 1, value * arr[i]);
      mul += 1;
    }
    if (div > 0) {
      div -= 1;
      dfs(i + 1, parseInt(value / arr[i]));
      div += 1;
    }
  }
};
dfs(1, arr[0]);
console.log(max_num);
console.log(min_num);

// 어이없게.. 계속 고민한 문제
// 내 풀이는 맞았고.. 나눗셈에서 몫만 안취해서 답이 안나온거였는데 풀이가 틀린줄 알고 하루종일 고민했다.. 🙃
// 처음에 계속 틀렸던건 DFS에서 재귀를 돌고 돌아올때 변수 파라미터들은 다시 그 시점값으로 복구가 되는데, 배열은 복구가 안됐던걸 몰랐음. 그래서 강제로 복구시키고자 재귀를 돌고 난 뒤 다시 그 값을 +1 시켜줌.
