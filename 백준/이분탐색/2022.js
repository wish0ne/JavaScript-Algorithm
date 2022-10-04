import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [x, y, c] = input[0].split(" ").map(Number);

//피타고라스 정리와 닮음을 이용하여 c를 구할 수 있다고 한다..난 모르겠음;
//정답이 실수인 이분탐색 문제
//left = mid + 1 -> left = mid
//right = mid - 1 -> right = mid
//while (left <= right)
// -> for(let k=0; k<10000; k++) : 이분탐색을 10000번 수행 (오차가 1/2^10000 이내가 됨)
// -> while(abs(right-left) > 1e-6) : right와 left가 소수점 6자리까지 같음

let left = 0;
let right = Math.min(x, y);

while (Math.abs(right - left) > 1e-6) {
  let mid = parseFloat((left + right) / 2);
  let d = mid; //d를 이분탐색으로 결정
  //d로 c를 구해보기
  let h1 = Math.sqrt(x * x - d * d);
  let h2 = Math.sqrt(y * y - d * d);
  let h = (h1 * h2) / (h1 + h2);

  //c를 줄이려면 d를 키워야함
  if (h > c) left = mid;
  //c를 늘리려면 d를 줄여야함
  else right = mid;
}

console.log(left.toFixed(3));

left = 0;
right = Math.min(x, y);

for (let k = 0; k < 10000; k++) {
  let mid = parseFloat((left + right) / 2);
  let d = mid; //d를 이분탐색으로 결정
  //d로 c를 구해보기
  let h1 = Math.sqrt(x * x - d * d);
  let h2 = Math.sqrt(y * y - d * d);
  let h = (h1 * h2) / (h1 + h2);

  //c를 줄이려면 d를 키워야함
  if (h > c) left = mid;
  //c를 늘리려면 d를 줄여야함
  else right = mid;
}
console.log(left.toFixed(3));
