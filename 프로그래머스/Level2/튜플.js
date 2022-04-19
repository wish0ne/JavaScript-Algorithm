function solution(s) {
  let tuple_array = [];
  let temp_number = [];
  let temp = "";
  //문자열 파싱
  for (let i = 0; i < s.length; i++) {
    if (!isNaN(parseInt(s[i]))) {
      temp += s[i];
    } else {
      if (temp.length > 0) {
        temp_number.push(parseInt(temp));
        temp = "";
      }
      if (s[i] === "}") {
        if (temp_number.length > 0) {
          tuple_array.push(temp_number);
          temp_number = [];
        }
      }
    }
  }

  //짧은 길이부터 정렬
  tuple_array.sort((a, b) => a.length - b.length);
  //for (let tuple of tuple_array) console.log(tuple);
  const answer = [];
  const set = new Set();
  for (let i = 0; i < tuple_array.length; i++) {
    for (let j of tuple_array[i]) {
      //새롭게 추가된 숫자만 배열에 추가
      if (!set.has(j)) {
        console.log(j);
        set.add(j);
        answer.push(j);
        break;
      }
    }
  }
  return answer;
}

console.log(solution("{{20,111},{111}}"));

//solve
//그냥 구현으로 시간복잡도 고려없이 풀었음(범위가 짧아서)
//문자열 파싱이 복잡한 문제면 뭔가 체감난이도가 올라가는듯. 휘둘리지 말자~
