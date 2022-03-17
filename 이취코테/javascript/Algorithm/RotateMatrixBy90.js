//2차원 리스트를 시계방향으로 90도 회전한 결과를 반환하는 함수

export default function rotate_matrix_by_90_degree(a) {
  const n = a.length; //행 길이 계산
  const m = a[0].length; //열 길이 계산
  //결과 배열
  const result = new Array(m);
  for (let i = 0; i < m; i++) {
    result[i] = new Array(n).fill(0);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      result[j][n - i - 1] = a[i][j];
    }
  }
  return result;
}

rotate_matrix_by_90_degree([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]);

rotate_matrix_by_90_degree([
  [1, 2, 3],
  [4, 5, 6],
]);
