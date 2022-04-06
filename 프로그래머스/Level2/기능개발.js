//구현으로 풀어서 통과한 코드
function solution(progresses, speeds) {
  let day = 0; //몇일째인지
  let count = 0; //배포할 개수
  const answer = [];
  for (let i = 0; i < progresses.length; i++) {
    if (progresses[i] + speeds[i] * day >= 100) {
      count += 1;
      continue;
    } else if (count > 0) {
      answer.push(count);
      count = 0;
    }
    while (100 - progresses[i] > speeds[i] * day) day++;
    count += 1;
  }
  answer.push(count);
  return answer;
}

//1번 코드 리팩토링
function solution2(progresses, speeds) {
  let count = 1;
  const answer = [];
  let day = Math.ceil((100 - progresses[0]) / speeds[0]);
  for (let i = 1; i < progresses.length; i++) {
    if (progresses[i] + speeds[i] * day >= 100) {
      count += 1;
      continue;
    }
    answer.push(count);
    day = Math.ceil((100 - progresses[i]) / speeds[i]);
    count = 1;
  }
  answer.push(count);
  return answer;
}

//참고할만한 풀이
function solution3(progresses, speeds) {
  const answer = [0];
  //각 진도가 몇일 걸리는지 먼저 계산해놓음
  const days = progresses.map((progress, index) =>
    Math.ceil((100 - progress) / speeds[index])
  );
  //제일 앞에서 가장 많이 걸리는 day
  let maxDay = days[0];

  // i : days의 idx, j : answer의 idx
  for (let i = 0, j = 0; i < days.length; i++) {
    //배포가능
    if (days[i] <= maxDay) answer[j] += 1;
    else {
      maxDay = days[i]; //day 변경
      answer[++j] = 1; //javascript의 배열은 index밖이여도 추가됨
      //++j : 전위증가. j값이 1먼저 증가된 후 증가된 값을 리턴
      //j++ : 후위증가. 먼저 해당 연산을 수행하고 나서 j의 값을 1 증가시킴
    }
  }
  return answer;
}

console.log(solution3([93, 30, 55], [1, 30, 5]));

// solve
