function solution(gems) {
  const count = new Set(gems).size;
  const map = new Map();
  let minLength = gems.length + 1;
  let answer = [];
  gems.forEach((gem, idx) => {
    map.delete(gem); //해당 보석이 map에 있으면 삭제
    map.set(gem, idx); //뒤의 index로 새로 추가
    if (count === map.size) {
      //모든 보석종류가 있으면
      let start = map.values().next().value; //values(): 각 요소의 value를 모은 iterable 객체 반환
      //⭐javascript에서 iterator는 next()를 반복적으로 호출하여 순회할 수 있음.
      if (idx - start + 1 < minLength) {
        minLength = idx - start + 1;
        answer = [start + 1, idx + 1];
      }
    }
  });
  return answer;
}

console.log(solution(["ZZZ", "YYY", "NNNN", "YYY", "BBB"]));

//not solve
//1. 시작, 끝을 각각 이진탐색하는 방법 -> end를 mid로 찾더라도 앞, 뒤 둘다 확인해봐야하므로 이진탐색으로는 맞지않는 문제인듯 (이게 테스트케이스에는 안나와서 반례찾는것부터 망함..)
//풀이 찾아보니 javascript는 주로 Map을 이용해서 풀었고, 다른언어는 투포인터를 이용해서 푼듯
//map을 사용해서 각 보석의 마지막 index를 저장, 가장 길이가 작은 index 저장(앞에서부터 검사하니까 길이가 같은 경우는 고려할 필요 없음)
//map 자료구조를 알고리즘에서 쓴적이 없는데 자주 사용해봐야겠다. property들 알아두면 좋을듯
//투포인터 알고리즘 쓰면서 현재 범위에 포함된 보석을 map에 저장하는게 핵심인듯
