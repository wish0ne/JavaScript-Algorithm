const Combination = (arr, selectNum) => {
  if (selectNum === 1) return arr.map((a) => [a]);
  const results = [];
  arr.forEach((a, index) => {
    const smallerCombination = Combination(arr.slice(index + 1), selectNum - 1);
    smallerCombination.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
};

function solution(relation) {
  let tuple_num = relation.length;
  let attribute_num = relation[0].length;
  const attribute = new Array(attribute_num);
  for (let i = 0; i < attribute_num; i++) attribute[i] = i;
  const keys_arr = []; //후보 키 배열

  let answer = 0;
  //후보키 집합 개수(1개 ~ 전체개수)
  for (let i = 1; i <= attribute.length; i++) {
    let keys = Combination(attribute, i);
    for (let key of keys) {
      //1. 유일성 검사
      let set = new Set();
      relation.forEach((rel) => {
        let value = "";
        key.forEach((k) => (value += "-" + rel[k]));
        set.add(value);
      });
      if (set.size === tuple_num) {
        //2. 최소성 검사
        let flag = true;
        for (let j = 0; j < keys_arr.length; j++) {
          //➕ array.every : 배열의 모든 원소가 함수를 만족하는지 판별
          if (keys_arr[j].every((k) => key.includes(k))) {
            flag = false;
            break;
          }
        }
        if (flag) {
          answer += 1;
          keys_arr.push(key);
        }
        //console.log(keys_arr);
      }
    }
  }
  return answer;
}

//반례 찾기 실패
//처음에는 한번 key가 된 속성들을 바로 제거했는데, 그러면 안됨
//key : [1, 2, [3,4], [5,6]]일때 [3,5,7]가 key가 될 수 있다..! -> key도 string으로 비교해야함
//반례찾기가 어렵ㄷ

console.log(
  solution([
    ["a", "1", "aaa", "c", "ng"],
    ["a", "1", "bbb", "e", "g"],
    ["c", "1", "aaa", "d", "ng"],
    ["d", "2", "bbb", "d", "ng"],
  ])
);
