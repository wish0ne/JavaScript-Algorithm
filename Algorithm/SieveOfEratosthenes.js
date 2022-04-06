//에라토스테네스의 체 알고리즘을 사용하여 1부터 N까지 모든 소수를 출력

//1이 소수인지 판별해야 한다면 array[1] = false 추가
const n = 1000; //2부터 1,000까지의 모든 수에 대하여 소수 판별
const array = new Array(n + 1).fill(true); //처음엔 모든 수가 소수인 것으로 초기화(0과 1은 제외);
array[0] = false;
array[1] = false;

//에라토스테네스의 체 알고리즘
//2부터 n의 제곱근까지의 모든 수를 확인하며
for (let i = 2; i < parseInt(Math.sqrt(n)) + 1; i++) {
  //i가 소수인 경우(남은 수인 경우)
  if (array[i] === true) {
    //i를 제외한 i의 모든 배수를 지우기
    let j = 2;
    while (i * j <= n) {
      array[i * j] = false;
      j += 1;
    }
  }
}

//모든 소수 출력
let answer = "";
for (let i = 2; i < n + 1; i++) {
  if (array[i]) answer += i + " ";
}
console.log(answer);
