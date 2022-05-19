//info : 지원서 입력 정보 4가지, 코테 점수 (개발언어, 직군, 경력, 소울푸드, 점수)
//query : 문의조건 (개발언어 and 직군 and 경력 and 소울푸드)
//- : 해당조건 고려하지 않음

//정확도 solve, 효율성 미통과
function solution(info, query) {
  const map = new Map();
  info.forEach((i) => {
    let temp = i.split(" ");
    const score = parseInt(temp.pop());
    const key = temp.join("-");
    if (map.has(key)) map.set(key, map.get(key).concat(score));
    else map.set(key, [score]);
  });

  const answer = [];
  query.forEach((q) => {
    //쿼리 하나씩 확인
    let temp = q.split(" ").filter((x) => {
      if (x !== "and" && x !== "-") return true;
      return false;
    });
    const score = parseInt(temp.pop());
    const queries = temp;

    let count = 0;
    for (let [key, value] of map) {
      if (queries.every((s) => key.includes(s))) {
        value.forEach((v) => {
          if (v >= score) count += 1;
        });
      }
    }
    answer.push(count);
  });
  return answer;
}

//정확성, 효율성 통과
function solution1(info, query) {
  const map = new Map();
  info.forEach((i) => {
    let temp = i.split(" ");
    const score = parseInt(temp.pop());
    const key = temp.join("-");
    if (map.has(key)) map.set(key, map.get(key).concat(score));
    else map.set(key, [score]);
  });

  for (let [key, value] of map) {
    value.sort((a, b) => b - a);
  }

  const answer = [];
  //100,000
  query.forEach((q) => {
    //쿼리 하나씩 확인
    let temp = q.split(" ").filter((x) => {
      if (x !== "and" && x !== "-") return true;
      return false;
    });
    const score = parseInt(temp.pop());
    const queries = temp;

    let count = 0;
    //24
    for (let [key, value] of map) {
      //4
      if (queries.every((s) => key.includes(s))) {
        //✔정렬해서 성적 count했더니 효율성 반 통과
        // let i = value.findIndex((v) => v < score);
        // if (i < 0) count += value.length;
        // else count += i;
        //✔이진탐색 사용하면 시간복잡도 더 줄일 수 있다!!🔥
        let index = binary_search(value, score, 0, value.length - 1);
        if (index < 0) count += value.length;
        else count += index;
      }
    }
    answer.push(count);
  });
  return answer;
}

function binary_search(array, target, start, end) {
  //target보다 성적이 작은 첫번째 index 찾기
  let index = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (array[mid] < target) {
      index = mid;
      end = mid - 1;
    } else start = mid + 1;
  }
  return index;
}

//정확도 solve, 효율성 미통과
//성적이 더 낮은 index를 찾을때 정렬 후 앞에서부터 선형탐색하는 방법도 시간복잡도를 줄일 수 있지만,
//⭐⭐이진탐색(파라메트릭 서치)을 이용하면 더 효율적으로 줄일 수 있다!!⭐⭐

console.log(
  solution1(
    [
      "java backend junior pizza 150",
      "python frontend senior chicken 210",
      "python frontend senior chicken 150",
      "cpp backend senior pizza 260",
      "java backend junior chicken 80",
      "python backend senior chicken 50",
    ],
    [
      "java and backend and junior and pizza 100",
      "python and frontend and senior and chicken 200",
      "cpp and - and senior and pizza 250",
      "- and backend and senior and - 150",
      "- and - and - and chicken 100",
      "- and - and - and - 150",
    ]
  )
);
