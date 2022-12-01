//약수 빠르게 구하는 알고리즘 => N의 약수를 구할때는 1부터 N의 제곱근까지만 확인하면됨
//                                구한 약수를 가지고 나눈 값 역시 약수가 됨

function getDivisor(n) {
  const divisors = [];
  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      divisors.push(i);
      if (n / i !== i) divisors.push(n / i);
    }
  }
  divisors.sort((a, b) => a - b);
  return divisors;
}
