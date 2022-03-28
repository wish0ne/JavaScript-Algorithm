// 접두사 합을 활용한 구간 합 계산

// 데이터의 개수 N과 전체 데이터 선언
const n = 5;
const data = [10, 20, 30, 40, 50];

// 접두사 합 배열 계산
let sum_value = 0;
let prefix_sum = [0];
for (let i of data) {
  sum_value += i;
  prefix_sum.push(sum_value);
}

// 구간 합 계산
const left = 3;
const right = 4;
console.log(prefix_sum[right] - prefix_sum[left - 1]);
