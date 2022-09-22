//진법 변환 후 0을 기준으로 파싱
//파싱한 숫자를 소수인지 판별
//소수 판별 : 1. 에라토스테네스의 체 / 2. 2~루트n까지 나눈 나머지가 모두 0이 아님을 확인
//이때 진법변환하면서 int 자료형 표현범위를 넘어설 수 있음 유의
function solution(n, k) {
  let str = n.toString(k); //진법 변환
  const numbers = str.split("0").map(Number); //조건을 0으로 파싱해서 해결하는거 생각못함...
  let answer = 0;
  for (let number of numbers) {
    if (is_prime_number(number)) answer += 1;
  }
  return answer;
}

function solution_my(n, k) {
  let str = n.toString(k);
  let prime = "";
  let answer = 0;
  console.log(str);
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "0") {
      prime = "";
      continue;
    }
    prime += str[i];
    //소수라면
    if (is_prime_number(parseInt(prime))) {
      if (i === str.length - 1 || str[i + 1] === "0") answer += 1;
    }
  }
  return answer;
}

function is_prime_number(x) {
  if (x < 2) return false;
  // 2부터 x의 제곱근까지 모든 수를 확인하며
  for (let i = 2; i < parseInt(Math.sqrt(x)) + 1; i++) {
    //x가 해당 수로 나누어떨어진다면
    if (x % i === 0) return false; //소수가 아님
  }
  return true; //소수임
}

console.log(solution(437674, 3));
