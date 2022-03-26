//가장 긴 증가하는 부분 수열 알고리즘
//dp를 이용하는 방법
const array = [4, 2, 5, 8, 4, 11, 15];
const n = 7;
const dp = new Array(n).fill(1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (array[j] < array[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
}

console.log(dp[n - 1]); //LIS의 길이
