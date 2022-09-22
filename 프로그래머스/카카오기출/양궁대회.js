//완전탐색, 구현 문제 : dfs, 비트마스킹, 중복조합 등 모두 가능
//각 점수를 맞추거나 / 어피치보다 1발 더 맞추거나를 완전탐색 -> 2^11 = 2048가지
//1점까지 쏘고 화살이 남으면 0점에 모두 쏘기
function solution_my(n, info) {
  const answer = new Array(11).fill(0); //라이언 화살 개수
  let max_answer = [];
  let max = 0; //라이언 최고 점수
  function calc(i, total) {
    //모든 화살을 쏜 경우
    if (total >= n) {
      //점수 계산
      let apeach = 0;
      let lion = 0;
      for (let k = 0; k < 11; k++) {
        if (info[k] === 0 && answer[k] === 0) continue;
        if (info[k] >= answer[k]) apeach += 10 - k;
        else lion += 10 - k;
      }
      if (lion < apeach) return false;
      if (lion - apeach > max) {
        max = lion - apeach;
        max_answer = [...answer];
      }
      //최대 점수 차이가 여러가지일때 더 낮은 점수를 많이 맞힌 경우
      else if (lion - apeach === max) {
        for (let j = 10; j >= 0; j--) {
          if (max_answer[j] < answer[j]) {
            max_answer = [...answer];
            break;
          } else if (max_answer[j] > answer[j]) break; //⭐⭐ 반례) 이 조건도 탐색해줘야함..
        }
      }
      return;
    }
    //남은 화살이 있으면 0점에 모두 쏘기
    if (i === 10) {
      answer[i] = n - total;
      calc(i + 1, n);
      answer[i] = 0;
    } else {
      //i번째 점수 획득
      if (info[i] + 1 <= n - total) {
        answer[i] = info[i] + 1;
        if (i === 10 && total + info[i] + 1 < n) {
          answer[i] = n - (total + info[i] + 1);
          calc(i + 1, n);
        } else {
          calc(i + 1, total + info[i] + 1);
        }
        answer[i] = 0;
      }

      //i번째 점수 미획득
      calc(i + 1, total);
    }
  }

  calc(0, 0, 0);
  if (max_answer.length === 0) return [-1];
  return max_answer;
}
console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
