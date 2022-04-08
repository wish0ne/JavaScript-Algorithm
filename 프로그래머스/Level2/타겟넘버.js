function dfs(idx, value, count, numbers, target) {
  if (idx === numbers.length) {
    if (value === target) count += 1;
    return count;
  }
  count = dfs(idx + 1, value + numbers[idx], count, numbers, target);
  count = dfs(idx + 1, value - numbers[idx], count, numbers, target);
  return count;
}

function solution(numbers, target) {
  const count = dfs(0, 0, 0, numbers, target);
  return count;
}

//함수 안에 함수 생성해서 사용하면 parameter 줄일 수 있음
function solution2(numbers, target) {
  function dfs2(idx, value, count) {
    if (idx === numbers.length) {
      if (value === target) count += 1;
      return count;
    }
    count = dfs2(idx + 1, value + numbers[idx], count);
    count = dfs2(idx + 1, value - numbers[idx], count);
    return count;
  }
  const count = dfs2(0, 0, 0);
  return count;
}

//count는 전역변수로 설정하는게 업데이트면에서 훨씬 좋은듯
//dfs나 bfs에서 재귀함수에서 돌아갈때 같이 돌아가지 않고 값이 유지되야하는 변수들은 전역변수로 관리해보자
function solution3(numbers, target) {
  let count = 0;
  function dfs3(idx, value) {
    if (idx === numbers.length) {
      if (value === target) count += 1;
      return;
    }
    dfs3(idx + 1, value + numbers[idx]);
    dfs3(idx + 1, value - numbers[idx]);
  }
  dfs3(0, 0, 0);
  return count;
}

console.log(solution3([1, 1, 1, 1, 1], 3));

//solve
