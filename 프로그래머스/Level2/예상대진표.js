function solution(n, a, b) {
  let stack = new Array(n);
  for (let i = 0; i < n; i++) stack[i] = i + 1;

  const small = Math.min(a, b);
  const big = Math.max(a, b);

  let round = 0;
  while (true) {
    console.log(stack);
    round += 1;
    const next = [];
    for (let i = 0; i < stack.length; i += 2) {
      if (stack[i] === small && stack[i + 1] === big) {
        return round;
      } else if (stack[i + 1] === big || stack[i + 1] === small) {
        next.push(stack[i + 1]);
      } else next.push(stack[i]);
    }
    stack = [...next];
  }
}

console.log(solution(8, 4, 7));

//solve
//쓸데없이 복잡하게 풀었다.. 바보인듯 ㅋ
function solution1(n, a, b) {
  let answer = 0;
  while (a !== b) {
    a = Math.ceil(a / 2);
    b = Math.ceil(b / 2);
    answer++;
  }

  return answer;
}
