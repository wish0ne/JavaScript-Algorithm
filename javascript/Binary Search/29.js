import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const [n, c] = input[0].split(" ").map(Number);
const arr = [];
for (let i = 1; i <= n; i++) {
  arr.push(parseInt(input[i]));
}
//이진탐색을 위한 정렬
arr.sort((a, b) => a - b);

let start = 1; //가능한 최소 거리 (min gap)
let end = arr[n - 1] - arr[0]; //가능한 최대 거리(max gap)
let result = 0;

while (start <= end) {
  let mid = parseInt((start + end) / 2); //mid는 가장 인접한 두 공유기 사이의 거리(gap)을 의미
  let value = arr[0];
  let count = 1;

  //현재의 mid값을 이용해 공유기 설치
  //앞에서부터 설치
  for (let i = 1; i < n; i++) {
    if (arr[i] >= value + mid) {
      value = arr[i];
      count += 1;
    }
  }
  //c개 이상의 공유기를 설치할 수 있는 경우 거리 증가
  if (count >= c) {
    start = mid + 1;
    result = mid; //최적의 결과를 저장
  }
  //c개 이상의 공유기를 설치할 수 없는 경우 거리 감소
  else {
    end = mid - 1;
  }
}

console.log(result);

// not solve 😭
// 탐색범위가 10억이므로 이진탐색문제 (파라메트릭 서치 문제)

// 파라메트릭 서치 문제 => 최적화 문제를 결정 문제로 바꾸어 푸는 것!
// 1) 결정문제(정답이 될 수 있는 값인지 아닌지를 쉽게 판단할 수 있음)
// 2) 정답이 될 수 있는 값들이 연속적 (최소값을 구하는 경우 최소값이 x라면 x이상의 값에 대해서는 모두 조건을 만족)
// 위 두 조건을 만족한다면 최적화문제를 파라메트릭 서치 문제로 풀어보자.
// 파라메트릭 문제들 : 백준 2512, 2805, 2470

// 이진탐색으로 "가장 인접한 두 공유기 사이의 거리"를 조절해가며 매순간 공유기를 설치해나간다.
// C보다 많은 개수로 공유기를 설치할 수 있다면 "가장 인접한 두 공유기 사이의 거리"를 증가시켜서 더 큰값에 대해서도 성립하는지 체크하기 위해서 다시 탐색을 수행.
