//올바른 괄호 문자열인지 판단
function alright(p) {
  const arr = p.split("");
  const left = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "(") {
      left.push(1);
    } else {
      if (left.length === 0) return false;
      left.pop();
    }
  }

  return true;
}

function solution(p) {
  //이미 올바른 문자열이면 그대로 리턴
  if (alright(p)) return p;
  //문자열을 두 문자열 u, v로 분리
  else {
    let left = 0;
    let right = 0;
    let index = 0;
    for (let i = 0; i < p.length; i++) {
      if (p[i] === "(") left += 1;
      else right += 1;
      if (left === right) {
        index = i;
        break;
      }
    }

    let u = p.slice(0, index + 1);
    let v = p.slice(index + 1);

    //u가 올바른 괄호 문자열이면 v에 대해 1단계부터 다시 수행
    if (alright(u)) {
      return u + solution(v);
    }
    // u가 올바른 괄호 문자열이 아니라면 아래 과정 수행
    else {
      let str = "(";
      str += solution(v);
      str += ")";
      u = u.slice(1, u.length - 1);
      const arr = u.split("");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === "(") arr[i] = ")";
        else arr[i] = "(";
      }
      str += arr.join("");
      return str;
    }
  }
}

console.log(solution(")))((("));

//solve😀
//재귀 알고리즘 문제. 구현문제에 가깝지만 DFS의 핵심인 재귀를 요구한다는 점에서 dfs/bfs문제로 분류.
