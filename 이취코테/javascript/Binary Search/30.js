//모든 단어를 길이마다 나누어서 저장하기 위한 리스트
const array = new Array(10001).fill().map(() => []);

//모든 단어를 길이마다 나누어서 뒤집어 저장하기 위한 리스트
//접두사 와일드카드인 경우 단어를 뒤집어서 확인
const reversed_array = new Array(10001).fill().map(() => []);

// 첫번째 인덱스를 반환
function first_index(arr, start, end, target) {
  if (start > end) return 1; //query가 없음
  const mid = parseInt((start + end) / 2);
  if (arr[mid] >= target && (mid === 0 || arr[mid - 1] < target)) {
    return mid;
  } else if (arr[mid] >= target) {
    return first_index(arr, start, mid - 1, target);
  } else return first_index(arr, mid + 1, end, target);
}

//마지막 인덱스를 반환
function last_index(arr, start, end, target) {
  if (start > end) return -1; //query가 없음
  const mid = parseInt((start + end) / 2);
  if (arr[mid] <= target && (mid === arr.length - 1 || arr[mid + 1] > target)) {
    return mid;
  } else if (arr[mid] > target) {
    return last_index(arr, start, mid - 1, target);
  } else return last_index(arr, mid + 1, end, target);
}

function solution(words, queries) {
  const answer = [];
  for (let word of words) {
    array[word.length].push(word); //단어 삽입
    reversed_array[word.length].push(word.split("").reverse().join("")); //단어를 뒤집어서 삽입
  }

  //이진탐색을 수행하기 위해 각 단어 리스트 정렬 수행
  for (let i = 0; i < 10001; i++) {
    array[i].sort();
    reversed_array[i].sort();
  }

  //쿼리를 하나씩 확인하며 처리
  for (let query of queries) {
    //접미사에 와일드카드가 붙은 경우
    let res = 0;
    if (query[0] !== "?") {
      res =
        last_index(
          array[query.length],
          0,
          array[query.length].length - 1,
          query.replace(/\?/g, "z")
        ) -
        first_index(
          array[query.length],
          0,
          array[query.length].length - 1,
          query.replace(/\?/g, "a")
        );
    }
    //접두사에 와일드카드가 붙은 경우
    else {
      res =
        last_index(
          reversed_array[query.length],
          0,
          reversed_array[query.length].length - 1,
          query.replace(/\?/g, "z").split("").reverse().join("")
        ) -
        first_index(
          reversed_array[query.length],
          0,
          reversed_array[query.length].length - 1,
          query.replace(/\?/g, "a").split("").reverse().join("")
        );
    }
    if (res < 0) answer.push(0);
    else answer.push(res + 1);
  }
  return answer;
}

console.log(
  solution(
    ["frodo", "front", "frost", "frozen", "frame", "kakao"],
    ["fro??", "????o", "fr???", "fro???", "pro?"]
  )
);

// not solve 😥
// 처음생각한 알고리즘이 틀린 알고리즘이였는데 계속 붙잡고 있다보니 코드도 복잡해지고 점점 더 이해할 수 없어짐. 시간 낭비!
// queries마다 정렬한다는 생각은 시간초과날것이 분명한 알고리즘이였는데 계속 붙잡고 있었다. (O(nlgn)>O(n)인데 반대로 생각함)

//Trie 자료구조로 풀지 않으면 풀리지 않는 문제라고 한다...😫 선형구조로 풀면 100% 효율성에서 실패함.(위 코드는 선형구조로 품)
//⭐ Trie 자료구조란?
// 문자열을 저장하고 효율적으로 탐색하기 위한 트리형태의 자료구조. 문자열을 탐색하는데 특화되어있는 자료구조이다. (공간복잡도가 큰 대신 빠른시간안에 단어를 검색할 수 있는 트리)
// radix tree, prefix tree, retrieval tree라고도 한다.
