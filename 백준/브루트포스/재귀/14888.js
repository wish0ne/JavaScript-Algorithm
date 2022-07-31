import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = Number(input[0]);
const a = input[1].split(" ").map(Number);
const c = input[2].split(" ").map(Number);

const op = [];
c.forEach((o, idx) => {
  for (let i = 0; i < o; i++) op.push(idx);
});

let max = -1000000001;
let min = 1000000001;

function dfs(idx, value, visited) {
  if (idx === n - 1) {
    max = Math.max(max, value);
    min = Math.min(min, value);
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    if (!visited[i]) {
      visited[i] = true;
      switch (op[i]) {
        case 0:
          dfs(idx + 1, value + a[idx + 1], visited);
          break;
        case 1:
          dfs(idx + 1, value - a[idx + 1], visited);
          break;
        case 2:
          dfs(idx + 1, value * a[idx + 1], visited);
          break;
        case 3:
          dfs(idx + 1, division(value, a[idx + 1]), visited);
          break;
      }
      visited[i] = false;
    }
  }
}

function division(prev, curr) {
  if (prev < 0) {
    return parseInt(-prev / curr) * -1;
  }
  return parseInt(prev / curr);
}

const visited = new Array(n - 1).fill(false);
dfs(0, a[0], visited);
console.log(max ? max : 0);
console.log(min ? min : 0);

//solve
//재귀로 풀려고 생각하다보니 dfs밖에 생각안남. 근데 dfs도 헷갈려서 엄청 오래걸려서 품...😭

//해설
//재귀함수로 간결하게 풀이!
//dfs 올바른 풀이법에 더 가까운 풀이인듯.

//⭐[cur, cur]을 return하고 ans[0], ans[1]를 얻는 과정이 이해하기 어려움...
function calc(a, index, cur, plus, minus, mul, div) {
  if (index === a.length) return [cur, cur];
  const res = [];
  if (plus > 0)
    res.push(calc(a, index + 1, cur + a[index], plus - 1, minus, mul, div));
  if (minus > 0)
    res.push(calc(a, index + 1, cur - a[index], plus, minus - 1, mul, div));
  if (mul > 0)
    res.push(calc(a, index + 1, cur * a[index], plus, minus, mul - 1, div));
  if (div > 0) {
    if (cur >= 0)
      res.push(
        calc(a, index + 1, parseInt(cur / a[index]), plus, minus, mul, div - 1)
      );
    else
      res.push(
        calc(
          a,
          index + 1,
          -parseInt(-cur / a[index]),
          plus,
          minus,
          mul,
          div - 1
        )
      );
  }
  const ans = res[0];
  for (let i of res) {
    ans[0] = Math.max(i[0], ans[0]);
    ans[1] = Math.min(i[1], ans[1]);
  }
  return ans;
}

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);
const [plus, minus, mul, div] = input[2].split(" ").map(Number);

const ans = calc(A, 1, A[0], plus, minus, mul, div);
console.log(ans[0] ? ans[0] : 0);
console.log(ans[1] ? ans[1] : 0);
