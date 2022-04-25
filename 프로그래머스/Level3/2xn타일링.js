function solution(n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i < n + 1; i++) {
    dp[i] = (dp[i - 2] + dp[i - 1]) % 1000000007;
  }
  return dp[n];
}

console.log(solution(5));

//전형적인 dp문제. dp복습이 필요하다 ㅠ
//마지막 return할때 나머지를 구해주면 안되고 dp값에 저장할떄 나머지를 구해야함.
