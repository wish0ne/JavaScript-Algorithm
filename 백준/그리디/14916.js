import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

//5로 나눈 후에 2로 나누어떨어지지 않으면 5의 몫을 1씩 줄여가면서 확인하는 방법
function calc() {
  let five = parseInt(n / 5);
  //5원을 최대 개수부터 줄여가면서 거스롬돈 줄수있는지 확인
  for (let i = five; i >= 0; i--) {
    let temp = n - 5 * i;
    if (temp % 2 === 0) {
      return i + parseInt(temp / 2);
    }
  }
  return -1;
}
console.log(calc());

//풀이2 (가장 빠른 풀이)
//n이 홀수면 5원을 홀수개, 짝수면 짝수개 줘야함
function calc2() {
  let five = parseInt(n / 5); //줄수있는 5원의 최대 개수
  //n이 짝수라면
  if (five > 0 && n % 2 === 0) {
    if (five % 2 === 1) five -= 1;
  } else if (five > 0 && n % 2 === 1) {
    if (five % 2 === 0) five -= 1;
  }
  let temp = n - 5 * five;
  if (temp % 2 === 0) return five + parseInt(temp / 2);
  else return -1;
}

console.log(calc2());

//참고할만한 풀이
//2원씩 줄여가다가 5원으로 나누어떨어질때만 5원 사용하는 방법
//일반적인 그리디라면 5원부터 계산하지만, 이 문제같은경우 그렇게 하면 최적의 해를 찾을 수 없으므로
//5로 나누어떨어질때 5원을 사용하는게 최선의 방법이 됨. 나누어떨어지지 않으면 2원씩 빼줌
let count = 0;
solution(n);
function solution(n) {
  if (n < 0) count = -1;
  else {
    //5로 나누어떨어질때만 5원 사용
    if (n % 5 === 0) count += n / 5;
    else {
      count += 1;
      solution(n - 2);
    }
  }
}
console.log(count);
