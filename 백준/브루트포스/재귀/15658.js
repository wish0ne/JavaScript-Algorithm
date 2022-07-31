import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = Number(input[0]);
const a = input[1].split(" ").map(Number);
const [plus, minus, mul, div] = input[2].split(" ").map(Number);

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

const ans = calc(a, 1, a[0], plus, minus, mul, div);
console.log(ans[0] ? ans[0] : 0);
console.log(ans[1] ? ans[1] : 0);

//solve
//연산자 끼워넣기(1)과 동일한 풀이... 재귀에서 연산자의 개수는 상관이 없는게 약간 애매모호했지만 똑같이 풀었더니 해결되었음

//해설은 14888번과 동일
