//효율성
//2차원 배열에서 구간의 변화를 효율적으로 처리하는 문제 -> 구간합 이용
//1차원 배열의 a번째부터 b번째까지 c의 변화를 줄때 => a번째 원소에 c를 더하고 b+1번째 원소에 c를 뺀 새로운 배열 이용
function solution(board, skill) {
  const change = new Array(board.length + 1);
  for (let i = 0; i < board.length + 1; i++)
    change[i] = new Array(board.length + 1).fill(0);
  skill.forEach((s) => {
    const [type, r1, c1, r2, c2, degree] = s;
    //공격
    if (type === 1) {
      change[r1][c1] -= degree;
      change[r2 + 1][c2 + 1] -= degree;
      change[r1][c2 + 1] += degree;
      change[r2 + 1][c1] += degree;
    }
    //회복
    else if (type === 2) {
      change[r1][c1] += degree;
      change[r2 + 1][c2 + 1] += degree;
      change[r1][c2 + 1] -= degree;
      change[r2 + 1][c1] -= degree;
    }
  });

  //누적합 계산
  //위에서 아래로
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length + 1; j++) {
      change[i + 1][j] += change[i][j];
    }
  }
  //왼쪽에서 오른쪽으로
  for (let j = 0; j < board[0].length; j++) {
    for (let i = 0; i < board.length + 1; i++) {
      change[i][j + 1] += change[i][j];
    }
  }

  //board 변환
  let answer = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] += change[i][j];
      if (board[i][j] > 0) answer += 1;
    }
  }
  return answer;
}

//정확성 : 브루트포스
function solution_my(board, skill) {
  skill.forEach((s) => {
    const [type, r1, c1, r2, c2, degree] = s;
    //공격
    if (type === 1) {
      for (let i = r1; i <= r2; i++) {
        for (let j = c1; j <= c2; j++) {
          board[i][j] -= degree;
        }
      }
    }
    //회복
    else if (type === 2) {
      for (let i = r1; i <= r2; i++) {
        for (let j = c1; j <= c2; j++) {
          board[i][j] += degree;
        }
      }
    }
  });

  //파괴된 건물 개수
  let answer = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] > 0) answer += 1;
    }
  }
  return answer;
}

console.log(
  solution(
    [
      [5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5],
    ],
    [
      [1, 0, 0, 3, 4, 4],
      [1, 2, 0, 2, 3, 2],
      [2, 1, 0, 3, 1, 2],
      [1, 0, 1, 3, 3, 1],
    ]
  )
);
