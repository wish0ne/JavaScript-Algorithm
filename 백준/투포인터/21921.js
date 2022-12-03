import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [x, n] = input[0].split(" ").map(Number);
const visitors = input[1].split(" ").map(Number);
let start = 0;
let end = n - 1;
let sum = 0;

//첫번째 구간합 구하기
for (let i = start; i <= end; i++) {
  sum += visitors[i];
}
let max = sum;
let count = 1;

while (end < x) {
  sum -= visitors[start];
  start += 1;
  end += 1;
  sum += visitors[end];
  if (max < sum) {
    max = sum;
    count = 1;
  } else if (max === sum) {
    count += 1;
  }
}

if (max === 0) console.log("SAD");
else {
  console.log(max);
  console.log(count);
}

//solve
//앞에서부터 N개씩 확인하니까 첫 구간합에서 start값 빼고 end+1값 추가하면서 구함
//=> 이게 슬라이딩 윈도우 개념이였음
//윈도우를 1칸 옮기면 n-1칸은 겹치니까 이전의 결과를 최대한 응용

//✔슬라이딩 윈도우 : 배열 요소의 일정범위 값을 비교할때 유용한 알고리즘
//크기가 고정적인 창문을 옆으로 밀면서 이동하는 방식. 매 순간 창문을 통해 보이는 세상속에서 정보(합)를 유출
