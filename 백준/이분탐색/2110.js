import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, c] = input[0].split(" ").map(Number);
const houses = [];
for (let i = 1; i <= n; i++) houses.push(parseInt(input[i]));

houses.sort((a, b) => a - b);

let start = 0;
let end = houses[n - 1] - houses[0];
let ans = 0;
while (start <= end) {
  let mid = parseInt((start + end) / 2); //공유기 사이 최대 거리
  //해당 사이 거리 유지한채로 공유기 c개 놓을 수 있음 -> 거리 늘려보기
  if (check(mid)) {
    ans = mid;
    start = mid + 1;
  }
  //공유기 놓을 자리 부족 -> 거리 줄여야함
  else end = mid - 1;
}
console.log(ans);

//x거리 유지한채 공유기 c개 놓을 수 있는지 체크
function check(x) {
  let count = 1;
  let prev = houses[0];
  for (let i = 1; i < n; i++) {
    if (houses[i] - prev >= x) {
      count += 1;
      prev = houses[i];
    }
  }
  return count >= c;
}

//solve
//오답 1번 : end값 잘못 정함
//공유기 사이 최대 거리를 이분탐색으로 결정하면서 가능한지(공유기 c개를 놓을 수 있는지) 확인

//해설
//a : 집의 위치 배열
//c : 공유기 개수
//mid : 가장 인접한 두 공유기 사이의 거리
function possible(a, c, mid) {
  let cnt = 1;
  let last = a[0];
  for (let house of a) {
    //공유기 설치 가능
    if (house - last >= mid) {
      cnt += 1;
      last = house;
    }
  }
  return cnt >= c;
}

let answer = 1;
let l = 1;
let r = houses[n - 1] - houses[0];
while (l <= r) {
  let mid = parseInt((l + r) / 2);
  if (possible(houses, c, mid)) {
    answer = Math.max(answer, mid);
    l = mid + 1;
  } else r = mid - 1;
}
console.log(answer);
