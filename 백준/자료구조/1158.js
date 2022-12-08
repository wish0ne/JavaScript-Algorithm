import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, k] = input[0].split(" ").map(Number);

const answer = [];
const array = [];

for (let i = 1; i <= n; i++) array.push(i);

let idx = n - 1;
while (array.length > 0) {
  idx = (idx + k) % array.length;
  answer.push(array[idx]);
  array.splice(idx, 1);
  idx -= 1;
}
console.log(`<${answer.join(", ")}>`);

//solve
//걍 splice써서 삭제해도 시간 별로 안걸림
//원형에서 인덱스 설정하는거 진짜 많이 나오는데 계속 헷갈리는듯
//숫자 쭉 이어서 써보고 나머지도 써보면서 규칙 찾기

//큐를 이용한 풀이(시간은 훨씬 오래 걸림)
//앞에서부터 하나씩 빼면서, k번째가 아니면 다시 뒤에 넣고 k번쨰면 그대로 삭제
const answer2 = [];
const number = [];
for (let i = 1; i <= n; i++) number.push(i);
while (number.length > 0) {
  for (let i = 0; i < k - 1; i++) {
    number.push(number.shift());
  }
  answer2.push(number.shift());
}
console.log(`<${answer2.join(", ")}>`);
