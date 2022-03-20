// n : 외벽의 길이
// weak : 취약지점의 위치
// dist : 각 친구가 1시간동안 이동할 수 있는 거리
// 취약 지점을 점검하기 위해 보내야 하는 친구수의 최솟값 return

function Permutation(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = Permutation(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
}

function solution(n, weak, dist) {
  //길이를 2배로 늘려서 원형을 일자 형태로 변형
  const length = weak.length;
  for (let i = 0; i < length; i++) {
    weak.push(weak[i] + n);
  }

  //투입할 친구 수의 최소값을 찾아야 하므로 dist의 길이 + 1로 초기화
  let answer = dist.length + 1;
  //0부터 length-1까지의 위치를 각각 시작점으로 설정
  for (let start = 0; start < length; start++) {
    //친구를 나열하는 모든 경우의 수 각각에 대하여 확인
    for (let friends of Permutation(dist, dist.length)) {
      let count = 1; //투입할 친구 수
      //해당 친구가 점검할 수 있는 마지막 위치
      let position = weak[start] + friends[count - 1];
      //시작점부터 모든 취약 지점을 확인
      for (let index = start; index < start + length; index++) {
        //점검할 수 있는 위치를 벗어나는 경우
        if (position < weak[index]) {
          count += 1; //새로운 친구를 투입
          // 더 투입이 불가능하면 종료
          if (count > dist.length) break;
          position = weak[index] + friends[count - 1];
        }
      }
      answer = Math.min(answer, count); //최소값 계산
    }
  }
  if (answer > dist.length) return -1;
  return answer;
}

console.log(solution(12, [1, 3, 4, 9, 10], [3, 5, 7]));

//not solve
//새로운 팁들이 많이 등장한 문제라 풀이방법 기억해두기
//✔ 취약 지점이 아닌 친구를 중심으로 문제 푸는 아이디어
//✔ 순열을 이용한 완전탐색 풀이
//✔ 원형을 두배로 늘려서 일자 형태로 만드는 작업
