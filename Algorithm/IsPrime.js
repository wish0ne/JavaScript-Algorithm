//x가 소수인지 아닌지 판별
export default function is_prime_number(x) {
  if (x < 2) return false;
  // 2부터 x의 제곱근까지 모든 수를 확인하며
  for (let i = 2; i < parseInt(Math.sqrt(x)) + 1; i++) {
    //x가 해당 수로 나누어떨어진다면
    if (x % i === 0) return false; //소수가 아님
  }
  return true; //소수임
}

console.log(is_prime_number(0));
console.log(is_prime_number(1));
console.log(is_prime_number(2));
console.log(is_prime_number(4));
console.log(is_prime_number(7));
