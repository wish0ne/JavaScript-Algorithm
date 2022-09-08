import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const trees = input[1].split(" ").map(Number);

let start = 0;
let end = Math.max(...trees);
let ans = 0;
while (start <= end) {
  let mid = parseInt((start + end) / 2); //절단기 높이 h
  let tree = 0;
  trees.forEach((t) => {
    if (t > mid) tree += t - mid;
  });
  //가능한 경우
  //나무 양을 줄여도 됨 -> h를 높여보자
  if (tree >= m) {
    ans = mid;
    start = mid + 1;
  } else {
    end = mid - 1;
  }
}
console.log(ans);

//solve
//기본적인 파라메트릭 서치 문제

//해설
//다른게 forEach랑 for문밖에 없는것같은데 시간차이가 꽤 많이난다..? for문쓰자...
function check(a, mid, m) {
  let tot = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] > mid) tot += a[i] - mid;
  }
  return tot >= m; //가능할때만 true
}

let l = 0;
let r = Math.max(...trees);
let answer = 0;
while (l <= r) {
  let mid = parseInt((l + r) / 2);
  //가능할 경우 -> 절단기 높이 높여봄
  if (check(trees, mid, m)) {
    answer = mid;
    l = mid + 1;
  } else r = mid - 1;
}

console.log(answer);
