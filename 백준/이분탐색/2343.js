import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().trim().split("\n");

const [n, m] = input[0].split(" ").map(Number); //강의 수, 블루레이 수
const lectures = input[1].split(" ").map(Number); //강의 시간 (순서대로)

//블루레이 시간 = x
console.log(binary_search(Math.max(...lectures), 10000000000));
function binary_search(start, end) {
  let ans = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    //가능하면 줄여보기
    if (calc(mid)) {
      ans = mid;
      end = mid - 1;
    } else start = mid + 1;
  }
  return ans;
}

//x시간 블루레이 m개로 모든 강의 녹화 가능한지 확인
function calc(x) {
  let temp = 0;
  let count = 1;
  for (let i = 0; i < n; i++) {
    //새 블루레이에 녹화
    if (temp + lectures[i] > x) {
      count += 1;
      temp = lectures[i];
    } else {
      temp += lectures[i];
    }
  }
  if (count > m) return false;
  return true;
}

//오답 : start를 0으로 하면 안됨!! 블루레이 시간이 아무리 작아도 강의 중 최대시간값 이상이여야 최대시간 강의를 담을 수 있음!!!
//🔥🔥🔥이분탐색에서 오답 -> start/end값 주의하자... 생각해보고 설정하기 ㅠ

//해설
//크기가 size인 블루레이로 녹화했을때 m개 이하의 블루레이가 나오는지 확인
function go(a, m, size) {
  let cnt = 1;
  let tot = 0;
  for (let i = 0; i < n; i++) {
    if (tot + a[i] > size) {
      cnt += 1;
      tot = a[i];
    } else tot += a[i];
  }
  return cnt <= m;
}

const a = input[1].split(" ").map(Number);

let left = Math.max(...a); //최소 : 레슨 크기의 최대값
let right = a.reduce((prev, cur) => (prev += cur)); //최대 : 레슨 크기의 총합

let ans = 0;
while (left <= right) {
  let mid = parseInt((left + right) / 2);
  if (go(a, m, mid)) {
    ans = mid;
    right = mid - 1;
  } else left = mid + 1;
}
console.log(ans);
