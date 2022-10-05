//가장 긴 증가하는 부분 수열 알고리즘
//dp를 이용하는 방법 : O(N^2)
const array = [4, 2, 5, 8, 4, 11, 15];
const n = 7;
const dp = new Array(n).fill(1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (array[j] < array[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
}

console.log(dp[n - 1]); //LIS의 길이

//이분탐색을 이용하는 방법 : O(NlgN)
const INF = 999999999;
const d = new Array(n).fill(INF);
let count = 0;
for (let i = 0; i < n; i++) {
  //이분탐색으로 d[i]에서 array[i]보다 작은 값 중 최대값 찾기
  let idx = binary_search(0, count, array[i]);
  d[idx + 1] = Math.min(d[idx + 1], array[i]);
  if (idx + 1 === count) count += 1;
}
console.log(count); //LIS의 길이

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
