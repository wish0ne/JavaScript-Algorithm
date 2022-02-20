import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const s = input[0];
let answer = s;
//1개단위부터 s의 길이의 절반단위까지만 해보면됨
for (let i = 1; i <= parseInt(s.length / 2); i++) {
  let compression = [];

  for (let j = 0; j < s.length; j += i) {
    compression.push(s.substring(j, j + i));
  }
  let prev = compression[0];
  let temp_answer = "";
  let num = 1;
  for (let j = 1; j < compression.length; j++) {
    if (prev === compression[j]) {
      num += 1;
      //마지막 문자에 대해서 처리해줌(✔ 이부분 예외처리하는데 시간 오래 소요)
      if (j === compression.length - 1) {
        if (num === 1) temp_answer += prev;
        else temp_answer += `${num}${prev}`;
      }
    } else {
      if (num === 1) temp_answer += prev;
      else temp_answer += `${num}${prev}`;
      //마지막 문자에 대해서 처리해줌(✔ 이부분 예외처리하는데 시간 오래 소요)
      if (j === compression.length - 1) {
        temp_answer += compression[j];
      }
      prev = compression[j];
      num = 1;
    }
  }
  if (answer.length > temp_answer.length) {
    answer = temp_answer;
  }
}
console.log(answer.length);

//solve 😀 지만 푸는데 시간이 너무 오래걸렸음.
//구현문제는 코드작성 전에 완벽히 풀이방법을 생각해낸뒤 코드로 옮기는 작업이 중요한듯.
//코드작성하면서 예외상황 수정하고 하다보니 코드가 난잡해지고 시간도 오래소요됨.
