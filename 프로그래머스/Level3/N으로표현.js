function solution(N, number) {
  const dp = [];
  for (let i = 0; i <= 8; i++) dp.push([]);
  dp[1].push(N); //사용횟수 1인 경우 추가

  if (N === number) return 1;
  for (let i = 2; i <= 8; i++) {
    dp[i].push(parseInt(`${dp[i - 1][0]}${N}`));
    let j = i - 1;
    while (j >= i / 2) {
      for (let ele1 of dp[j]) {
        for (let ele2 of dp[i - j]) {
          dp[i].push(ele1 + ele2);
          dp[i].push(ele1 - ele2);
          dp[i].push(ele1 * ele2);
          if (ele2 !== 0) dp[i].push(parseInt(ele1 / ele2));
          if (ele1 !== ele2) {
            dp[i].push(ele2 - ele1);
            if (ele1 !== 0) dp[i].push(parseInt(ele2 / ele1));
          }
        }
      }
      j--;
    }
    //console.log(dp[i]);
    if (dp[i].includes(number)) return i;
  }
  return -1;
}

console.log(solution(5, 12));
console.log(solution(2, 11));

// 아이디어를 생각못함
// dp는 과거의 값을 테이블에 저장해두고 다시 재사용하겠다는 생각으로 시작해보기
// 처음에는 그냥 (사용횟수-1)에 N을 사칙연산하는것만 추가했는데 이렇게 하면 안됨
// 사용횟수가 4인경우를 구할때는 (1,3), (2,2), (3,1)을 고려해야함
// 이때 (1,3)과 (3,1)은 +, *에서는 동일하니까 제외, (2,2)는 앞뒤가 똑같으니까 제외
