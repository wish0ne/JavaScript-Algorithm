import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, r, c] = input[0].split(" ").map(Number);

function fastPowering(base, power) {
  if (power === 0) return 1;
  if (power === 1) return base;
  if (power % 2 === 0) {
    const multiplier = fastPowering(base, power / 2);
    return multiplier * multiplier;
  } else {
    return base * fastPowering(base, power - 1);
  }
}

function go(x, y, n, count) {
  if (n === 0) {
    if (x === r && y === c) {
      console.log(count);
      process.exit();
    }
  } else {
    let d = fastPowering(2, n - 1);
    let k = fastPowering(d, 2);
    if (r < x + d) {
      //왼쪽 위
      if (c < y + d) go(x, y, n - 1, count);
      //오른쪽 위
      else go(x, y + d, n - 1, count + k);
    } else {
      //왼쪽 아래
      if (c < y + d) go(x + d, y, n - 1, count + k * 2);
      //오른쪽 아래
      else go(x + d, y + d, n - 1, count + k * 3);
    }
  }
}

//go(0, 0, n, 0);

//시간초과...
//각 단계마다 4번씩 돌면 -> 4^15번이니까 시간초과
//시간초과가 나는건 쓸모없는것까지 탐색하기 때문이다!!! -> 쓸모없는게 어딘지 찾아보자
//각 단계마다 4번 다 돌 필요가 없었음 (r, c)가 속한 부분만 탐색하면 됨 -> 15번만에 해결가능!!

//해설
function power2(k) {
  return Math.pow(2, k);
}

function go2(n, x, y) {
  if (n === 1) return x * 2 + y; //4칸일때 좌표에 따른 방문횟수
  else {
    if (x < power2(n - 1)) {
      //왼쪽 위
      if (y < power2(n - 1)) return go2(n - 1, x, y);
      //오른쪽 위
      else return go2(n - 1, x, y - power2(n - 1)) + power2(2 * n - 2);
    } else {
      //왼쪽 아래
      if (y < power2(n - 1))
        return go2(n - 1, x - power2(n - 1), y) + power2(2 * n - 2) * 2;
      //오른쪽 아래
      else
        return (
          go2(n - 1, x - power2(n - 1), y - power2(n - 1)) +
          power2(2 * n - 2) * 3
        );
    }
  }
}

console.log(go2(n, r, c));
