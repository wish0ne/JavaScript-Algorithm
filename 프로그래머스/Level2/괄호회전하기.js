function solution(s) {
  let answer = 0;
  for (let i = 0; i < s.length - 1; i++) {
    //check
    if (check(s)) answer += 1;

    //회전
    s = rotation(s);
  }
  return answer;
}

//올바른 문자열 확인
function check(s) {
  const stack = [s[0]];
  let last = s[0];
  for (let i = 1; i < s.length; i++) {
    console.log(last, s[i]);
    if (!alright(last, s[i])) {
      stack.push(s[i]);
      last = s[i];
    } else {
      stack.pop();
      if (stack.length === 0) last = "";
      else last = stack[stack.length - 1];
    }
  }
  console.log(stack);
  if (stack.length === 0) return true;
  return false;
}

function alright(a, b) {
  if (a === "[" && b === "]") return true;
  if (a === "(" && b === ")") return true;
  if (a === "{" && b === "}") return true;
  return false;
}

function rotation(s) {
  let array = s.split("");
  let first = array.shift();
  array.push(first);
  return array.join("");
}

console.log(solution("[](){}"));

//solve
//그냥 문자열 앞에서부터 비교하면서 짝이 맞는지 확인하는 구현 & 완탐으로 풀었음
//빈 스택에 괄호 시작([, (, {)])이 등장하면 넣고, 아니면 stack에서 pop해서 비교하면 쉽게 괄호가 맞는지 확인할 수 있음.
