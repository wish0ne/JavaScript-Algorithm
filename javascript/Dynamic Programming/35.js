import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);

const d = new Array(n);
d[0] = 1;
let idx2 = 0;
let idx3 = 0;
let idx5 = 0;

let value2 = 2;
let value3 = 3;
let value5 = 5;

for (let i = 1; i < n; i++) {
  d[i] = Math.min(value2, value3, value5);
  if (d[i] === value2) {
    idx2 += 1;
    value2 = d[idx2] * 2;
  }
  if (d[i] === value3) {
    idx3 += 1;
    value3 = d[idx3] * 3;
  }
  if (d[i] === value5) {
    idx5 += 1;
    value5 = d[idx5] * 5;
  }
}

console.log(d);
console.log(d[n - 1]);

// not solve 😭
// 이건 그냥 알고리즘을 떠올리지 못함. 풀이 보고도 어려웠던거 보면 알고리즘 자체를 못떠올린 문제
// 핵심 : 못생긴수에 2,3,5를 곱한 수 역시 못생긴수
// 따라서 2,3,5를 곱할 이전 못생긴수를 2,3,5 각각 가지고 있어야함. 각각 가지지 않고 하나로 해결하려다 보니 순서대로오름차순이 해결안된것

// const ugly = [];

// const pow = [];
// for (let i = 0; i < n; i++) {
//   for (let j = 0; j < n; j++) {
//     for (let z = 0; z < n; z++) {
//       pow.push([i, j, z]);
//     }
//   }
// }

// pow.forEach((p) => {
//   ugly.push(Math.pow(2, p[0]) * Math.pow(3, p[1]) * Math.pow(5, p[2]));
// });

// ugly.sort((a, b) => a - b);
// console.log(ugly[n - 1]);
