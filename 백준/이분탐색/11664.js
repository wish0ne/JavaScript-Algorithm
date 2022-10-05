import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().trim().split("\n");

//선분과 점 사이의 거리는 증가->감소->증가
//따라서 삼분탐색을 이용해 최소값을 구하는 문제
// const [a1, a2, a3, b1, b2, b3, c1, c2, c3] = input[0].split(" ").map(Number);

// let left = [a1, a2, a3];
// let right = [b1, b2, b3];

// for (let k = 0; k < 10000; k++) {
//   const [x1, y1, z1] = left;
//   const [x2, y2, z2] = right;

//   let m1 = [x1 + (x2 - x1) / 3, y1 + (y2 - y1) / 3, z1 + (z2 - z1) / 3];
//   let m2 = [x2 - (x2 - x1) / 3, y2 - (y2 - y1) / 3, z2 - (z2 - z1) / 3];

//   if (calc(m1) < calc(m2)) right = m2;
//   else left = m1;
// }

// const [x1, y1, z1] = left;
// const [x2, y2, z2] = right;
// console.log(calc([(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2]));

// function calc(coord) {
//   const [x, y, z] = coord;
//   return Math.sqrt(
//     Math.pow(x - c1, 2) + Math.pow(y - c2, 2) + Math.pow(z - c3, 2)
//   );
// }

//해설
function dist(x1, y1, z1, x2, y2, z2) {
  return Math.sqrt(
    Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
  );
}

const [x1, y1, z1, x2, y2, z2, x3, y3, z3] = input[0].split(" ").map(Number);
let dx = x2 - x1;
let dy = y2 - y1;
let dz = z2 - z1;
let left = 0.0;
let right = 1.0;
let m = 0;

//삼분탐색으로 m 결정
//m : 선분과 점 사이의 거리를 최소로 만드는 선분 AB 위의 점의 비율(0~1사이 값)
while (true) {
  if (Math.abs(right - left) < 1e-9) {
    m = (left + right) / 2;
    break;
  }
  let m1 = left + (right - left) / 3;
  let m2 = right - (right - left) / 3;

  let m1x = x1 + m1 * dx;
  let m1y = y1 + m1 * dy;
  let m1z = z1 + m1 * dz;

  let m2x = x1 + m2 * dx;
  let m2y = y1 + m2 * dy;
  let m2z = z1 + m2 * dz;

  let d1 = dist(m1x, m1y, m1z, x3, y3, z3);
  let d2 = dist(m2x, m2y, m2z, x3, y3, z3);
  if (d1 > d2) left = m1;
  else right = m2;
}

//최소거리를 만드는 선분 위의 점 찾기
let x0 = x1 + m * dx;
let y0 = y1 + m * dy;
let z0 = z1 + m * dz;
//최소 거리 계산
let ans = dist(x0, y0, z0, x3, y3, z3);
console.log(ans);
