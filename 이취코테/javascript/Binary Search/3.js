let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let start = 0;
let end = Math.max(...arr);

let sum = 0;
let answer = 0;
while (start <= end) {
  sum = 0;
  let mid = parseInt((start + end) / 2); //자를 높이 설정
  //잘린 떡 양 구하기
  for (let i = 0; i < n; i++) {
    if (mid < arr[i]) sum += arr[i] - mid;
  }
  //덜 자른 경우
  if (sum < m) {
    end = mid - 1;
  } else {
    answer = mid;
    start = mid + 1;
  }
}

console.log(answer);
