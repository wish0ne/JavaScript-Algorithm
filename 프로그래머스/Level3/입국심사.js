function solution(n, times) {
  times.sort((a, b) => a - b);

  //파라메트릭 서치 유형
  //조건을 만족하는 최소값을 찾을때까지 이진탐색 반복
  let start = times[0];
  let end = times[times.length - 1] * n;
  let answer = 0;

  //이진탐색
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    //조건 부합 계산
    let count = 0;
    for (let time of times) {
      count += parseInt(mid / time);
    }
    //시간이 부족한 경우 더 많은 시간 필요 (오른쪽 탐색)
    if (count < n) start = mid + 1;
    //시간이 충분한 경우 줄여보기 (왼쪽 탐색)
    else {
      answer = mid; //최소시간일때를 찾아야하므로 여기에서 answer에 기록
      end = mid - 1;
    }
  }
  return answer;
}

console.log(solution(6, [7, 10]));

//solve
//파라메트릭 서치의 중요성을 알게된 문제...
//문제를 읽었을때 하나도 감이 안오고 막막했는데 이분탐색이라는걸 알고 파라메트릭 서치로 풀었더니
//이렇게 간단하게 풀릴수가 없다...
//파라메트릭 유형에 익숙해지자! 조건을 만족하는 최솟값 / 최대값 구해야하면 무조건 이분탐색 떠올리기
