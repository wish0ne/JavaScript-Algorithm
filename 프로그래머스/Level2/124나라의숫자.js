function solution(n) {
  let quotient = n;
  let remainder = 0;
  let arr = [];
  while (quotient > 0) {
    remainder = quotient % 3;
    quotient = parseInt(quotient / 3);
    if (remainder === 1) arr.push("1");
    else if (remainder === 2) arr.push("2");
    else {
      quotient -= 1;
      arr.push("4");
    }
  }
  return arr.reverse().join("");
}

function solution1(n) {
  let answer = "";
  const array = [4, 1, 2];
  while (n) {
    answer = array[n % 3] + answer;
    n = parseInt((n - 1) / 3);
  }
  return answer;
}

console.log(solution(18));

//숫자의 자릿수를 먼저 구하고, 그게 몇번째 숫자인지에 따라 한자리씩 채워나갈려고 했는데 좋지 못한 풀이인듯
//⭐10진수를 2진수로 변환하는것처럼 4진수로 변환한다는 생각
//3으로 나누어떨어질때는 (몫-1)을 해줘야하는것도 어려웠음
//n이 5억이하이니까 O(n)으로도 부족함. O(log_3N)으로 풀어야함
