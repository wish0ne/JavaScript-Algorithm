import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const a = input[0].trim().split("");
const b = input[1].trim().split("");

// let lengthA = a.length;
// let lengthB = b.length;

// let min_edit_area = 999999999;
// let edit_area = 0;

// //문자열 길이가 같을때
// if (lengthA === lengthB) {
//   min_edit_area = 0;
//   for (let i = 0; i < lengthA; i++) {
//     if (a[i] !== b[i]) min_edit_area += 1;
//   }
// }
// //a가 더 짧을때
// else if (lengthA < lengthB) {
//   //부족한 글자수만큼 insert
//   //insert할 수 있는 경우의 수 모두 구함
//   const can_insert = [];
//   for (let i = 0; i <= lengthA; i++) {
//     for (let j = 0; j <= lengthA; j++) {
//       can_insert.push([i, j]);
//     }
//   }
//   for (let i = 0; i < can_insert.length; i++) {
//     //삽입
//     for (let j = 0; j < can_insert[i].length; j++) {
//       a.splice(can_insert[i][j], 0, "?");
//     }
//     edit_area = 0;
//     //replace
//     for (let z = 0; z < lengthB; z++) {
//       if (a[z] !== b[z]) edit_area += 1;
//     }
//     min_edit_area = Math.min(edit_area, min_edit_area);
//     //삭제
//     for (let j = 0; j < can_insert[i].length; j++) {
//       a.splice(can_insert[i][j], 1);
//     }
//   }
// }
// //a가 더 길때
// else {
//   edit_area += lengthA - lengthB;
// }

// console.log(min_edit_area);

//not solve 😥
//원래 생각한 풀이 -> a와 b의 길이 차이에 따라 insert / remove 먼저 수행한 후 앞에서부터 replace 수행하는 방법
//길이 차이 갯수만큼 가능한 중복순열을 모두 구해야함 -> 불가능?

//모든 경우의수를 다 세어본다는 점은 동일한데, 앞서 계산한 값을 재사용한다는 점을 이용못함
//점화식도 생각못했고, dp테이블을 2차원으로 만들어서 풀어볼 생각도 못함.
//새로운 풀이방법 기억해두자⭐

//최소 편집 거리 계산을 위한 dp
function edit_dist(a, b) {
  const n = a.length;
  const m = b.length;

  //2차원 dp 테이블 초기화
  const dp = [];
  for (let i = 0; i < n + 1; i++) {
    dp.push(new Array(m + 1).fill(0));
  }

  //dp 테이블 초기설정
  for (let i = 1; i < n + 1; i++) dp[i][0] = i;
  for (let j = 1; j < m + 1; j++) dp[0][j] = j;

  //최소 편집 거리 계산
  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      //문자가 같다면 왼쪽 위 대입
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      //문자가 다르다면 3가지 경우 중에서 최소값 대입
      else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }
  return dp[n][m];
}

console.log(edit_dist(a, b));
