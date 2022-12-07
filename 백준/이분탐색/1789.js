import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const s = parseInt(input[0]);

let answer = 0;
function binary_search(start, end) {
  if (start > end) return;
  let mid = parseInt((start + end) / 2);
  let sum = calc_sum(mid);
  if (sum <= s) {
    answer = mid;
    return binary_search(mid + 1, end);
  } else return binary_search(start, mid - 1);
}

//n개 숫자를 이용해 s값을 만들때 n을 최대로 하려면 작은수을 이용해야함 -> 1부터 차례대로 이용
function calc_sum(n) {
  return (n * (n + 1)) / 2;
}

binary_search(1, s);
console.log(answer);

//solve
//어렵다...이렇게 알고보니 간단한 문제가 체감 더 어려움 😥 뭔가 정확한 값을 구하는게 아니라 그런가
//n개의 숫자 합으로 s를 정확히 만들어야하지만 숫자를 적절히 바꾼다면 s를 만들어낼 수 있으므로 정확히 s를 만들수있냐보다 s보다 작게 만들수있는지만 확인하면됨
//이분탐색 안쓰고 그냥 1부터 차례대로 더한다음 s보다 커지면 stop해도됨(그리디)
let sum = 0;
let count = 0;
while (sum <= s) {
  count += 1;
  sum += count;
}
console.log(count - 1);
