//특정한 합을 가지는 부분 연속 수열 찾기 알고리즘

const n = 5; //데이터의 개수
const m = 5; //찾고자 하는 부분합
const data = [1, 2, 3, 2, 5]; //전체 수열

let count = 0; //특정한 합을 갖는 부분 연속 수열의 개수
let interval_sum = 0; //부분합
let end = 0;

//start를 차례대로 증가시키며 반복
for (let start = 0; start < n; start++) {
  //end를 가능한만큼 이동시킴
  while (interval_sum < m && end < n) {
    interval_sum += data[end];
    end += 1;
  }
  //부분합이 m일때 카운트 증가
  if (interval_sum === m) count += 1;
  interval_sum -= data[start];
}

console.log(count);
