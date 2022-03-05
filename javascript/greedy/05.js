import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

let [n, m] = input[0].split(" ").map(Number); //n : 볼링공의 개수, m : 공의 최대 무게
const ball = input[1].split(" ").map(Number);
let count = 0;

for (let i = 0; i < n; i++) {
  for (let j = i; j < n; j++) {
    if (ball[i] !== ball[j]) count += 1;
  }
}
console.log(count);

//애매한 solve 😫
//그냥 진짜 단순하게 O(N^2)으로 풀었는데, 시간초과 고려하지 않고 풀었음.
//또 알고리즘을 정확히 떠올리지 못하고 품. 이런 문제가 나올리가 없잖아..

count = 0;

//무게별 공 개수 저장
const weight = new Array(11).fill(0);
ball.forEach((b) => {
  weight[b] += 1;
});

for (let i = 1; i < m + 1; i++) {
  n -= weight[i]; //남은 개수를 구할때 n에서 뺀다는 아이디어 좋은듯!
  count += weight[i] * n;
}
console.log(count);
// 5 3
// 1 3 2 3 2
