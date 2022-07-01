function solution(price, money, count) {
  let answer = 0;
  for (let i = 0; i < count; i++) {
    answer += price * (i + 1);
  }
  return answer < money ? 0 : answer - money;
}

//solve
