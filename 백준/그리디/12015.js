import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const array = input[1].split(" ").map(Number);

//이분탐색 LIS... 외워두자
//LIS -> O(N^2) 알고리즘, O(NlgN) 알고리즘 2가지 존재
//O(NlgN) -> 매번 array[i]보다 작은 값을 가지는 j들 중 가장 큰 D[j]를 찾는 시간을 O(lgN)으로 단축
//d[i] : 길이가 i+1인 LIS의 마지막 값 중에서 최소값 -> d[i]는 정렬되어있으므로 이분탐색 가능
//but LIS의 길이만 알수있음. 실제 LIS를 알고싶다면 각 원소가 들어간 인덱스를 저장해둬야함

const INF = 999999999;
const d = new Array(n).fill(INF);
let count = 0; //LIS 길이
for (let i = 0; i < n; i++) {
  //이분탐색으로 d[i]에서 array[i]보다 작은 값 중 최대값 찾기
  let idx = binary_search(0, count, array[i]);
  d[idx + 1] = Math.min(d[idx + 1], array[i]);
  if (idx + 1 === count) count += 1;
}
console.log(count);

function binary_search(start, end, target) {
  let ans = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (d[mid] < target) {
      ans = mid;
      start = mid + 1;
    } else end = mid - 1;
  }
  return ans;
}
