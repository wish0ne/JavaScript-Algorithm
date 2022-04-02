import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [m, n] = input[0].split(" ").map(Number);

const array = new Array(n + 1).fill(true); //처음엔 모든 수가 소수인 것으로 초기화(0과 1은 제외);
array[1] = false; // ✔ 1은 소수가 아님

//에라토스테네스의 체 알고리즘
//2부터 n의 제곱근까지의 모든 수를 확인하며
for (let i = 2; i < parseInt(Math.sqrt(n)) + 1; i++) {
  //i가 소수인 경우(남은 수인 경우)
  if (array[i] === true) {
    //i를 제외한 i의 모든 배수를 지우기
    let j = 2;
    while (i * j <= n) {
      array[i * j] = false;
      j += 1;
    }
  }
}
for (let i = m; i < n + 1; i++) {
  if (array[i]) console.log(i);
}
