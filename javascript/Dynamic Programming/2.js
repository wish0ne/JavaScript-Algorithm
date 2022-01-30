let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const x = parseInt(input[0]);

const d = new Array(x + 1).fill(0);
for (let i = 2; i <= x; i++) {
  d[i] = d[i - 1] + 1;
  if (i % 5 == 0) d[i] = Math.min(d[i], d[i / 5] + 1);
  if (i % 3 == 0) d[i] = Math.min(d[i], d[i / 3] + 1);
  if (i % 2 == 0) d[i] = Math.min(d[i], d[i / 2] + 1);
}

console.log(d[x]);

//---
//new Array(N)보다 []를 쓰는것이 더 좋은 코드?라고 한다.
const N = 5; // 길이 N을 5라고 가정
let arr;
(arr = []).length = N; // 배열의 길이 설정
arr.fill(0);
//참고 : https://zerodice0.tistory.com/202 -> 배열을 초기화할때는 []를 쓰도록 하자 ✔
//참고2 : https://withhsunny.tistory.com/71
