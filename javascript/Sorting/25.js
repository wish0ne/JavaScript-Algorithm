function solution(N, stages) {
  //분자
  let count = new Array(N + 2).fill(0);
  for (let i of stages) {
    count[i] += 1;
  }

  //분모
  let sum = new Array(N + 2).fill(0);
  sum[N + 1] = count[N + 1];
  for (let i = count.length - 2; i > 0; i--) {
    sum[i] = sum[i + 1] + count[i];
  }

  let fail = new Array(N + 2).fill(0);
  for (let i = 1; i < N + 1; i++) {
    if (sum[i] === 0) fail[i] = { index: i, fail: 0 };
    else fail[i] = { index: i, fail: count[i] / sum[i] };
  }
  //   fail.splice(0, 1);
  //   fail.splice(N, 1);

  let answer = fail
    .slice(1, N + 1)
    .sort((a, b) => {
      if (b.fail === a.fail) return a.index - b.index;
      else return b.fail - a.fail;
    })
    .map((v) => v.index);

  //   var answer = [];
  //   for (let i = 0; i < fail.length; i++) {
  //     answer.push(fail[i].index);
  //   }
  return answer;
}

console.log(solution(5, [2, 1, 2, 6, 2, 4, 3, 3]));

//solve 😀
//코드를 더 간결하게 작성해보도록 하자! (주석처리한 부분들 -> map의 사용 등으로 코드 한부분으로 축약가능했음)
