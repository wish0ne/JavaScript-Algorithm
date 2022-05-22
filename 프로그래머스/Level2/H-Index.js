function solution(citations) {
  citations.sort((a, b) => b - a);
  const answer = binary_search(citations, 0, citations.length - 1);
  return answer;
}

//mid : 인덱스(논문 갯수 결정)
//array[mid] : 인용 횟수 결정
function binary_search(array, start, end) {
  let answer = 0;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (array[mid] >= mid + 1) {
      answer = mid + 1;
      start = mid + 1;
    } else end = mid - 1;
  }
  return answer;
}

//solve
//이진탐색으로 안풀고 정렬 후 앞에서부터 하나씩 확인하고 break해도 됨
//최대갯수가 1000개라 상관없음

console.log(solution([1, 2, 3, 4, 5]));
