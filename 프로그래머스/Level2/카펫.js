function solution(brown, yellow) {
  const total = brown + yellow;
  let height = 0; //세로
  let width = 0; //가로
  //약수 완전탐색 (제곱근까지만 확인해봐도 됨)
  for (let i = 3; i <= parseInt(total / 2); i++) {
    if (total % i === 0) {
      height = i;
      width = total / height;
      if ((height - 2) * (width - 2) === yellow) break; //yellow 개수가 맞으면 break
    }
  }
  return [width, height];
}

//solve

console.log(solution(10, 2));
