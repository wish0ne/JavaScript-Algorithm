// function pillar_install(x, y, wall, n) {
//   wall[n - y][x] += 1;
//   wall[n - y - 1][x] += 1;
// }

// function pillar_delete(x, y, wall, n) {
//   wall[n - y][x] -= 1;
//   wall[n - y - 1][x] -= 1;
// }

// function beam_install(x, y, wall, n) {
//   wall[n - y][x] += 3;
//   wall[n - y][x + 1] += 3;
// }

// function beam_delete(x, y, wall, n) {
//   wall[n - y][x] -= 3;
//   wall[n - y][x + 1] -= 3;
// }

// function check(y, x, a, wall, n) {
//   //보
//   if (a === 1) {
//     if (
//       wall[y][x] % 3 >= 1 ||
//       wall[y][x + 1] % 3 >= 1 ||
//       (wall[y][x] / 3 > 1 && wall[y][x + 1] / 3 > 1)
//     )
//       return true;
//   }
//   //기둥
//   else {
//     if (y === n || wall[y][x] >= 1) return true;
//   }
//   return false;
// }

// function solution(n, build_frame) {
//   // (n+1) * (n+1) 크기 2차원 행렬
//   const wall = [];
//   for (let i = 0; i < n + 1; i++) {
//     wall.push(new Array(n + 1).fill(0));
//   }
//   const result = []; // 최종 구조물 배열

//   for (let frame of build_frame) {
//     const [x, y, a, b] = frame; //가로좌표, 세로좌표, 종류, 설치삭제
//     //기둥
//     if (a === 0) {
//       //설치
//       if (b === 1) {
//         //기둥 : 바닥에 있거나 / 다른 기둥 위에 있거나 / 보의 한쪽 끝부분 위에 있으면 설치가능
//         if (n - y === n || wall[n - y][x] >= 1) {
//           result.push([x, y, a]);
//           pillar_install(x, y, wall, n);
//         }
//       }
//       //삭제
//       else {
//         pillar_delete(x, y, wall, n);
//         //삭제한 뒤 조건 만족하는지 확인
//         let can_delete = true;
//         while (true) {
//           if (wall[n - y - 1][x] % 3 > 0 && !check(n - y - 1, x, 0, wall, n)) {
//             can_delete = false;
//             break;
//           }
//           if (wall[n - y][x] % 3 > 0 && !check(n - y + 1, x, 0, wall, n)) {
//             can_delete = false;
//             break;
//           }
//           if (
//             x > 0 &&
//             wall[n - y - 1][x - 1] / 3 > 0 &&
//             wall[n - y - 1][x] / 3 >= 1 &&
//             !check(n - y - 1, x - 1, 1, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           if (
//             x < n &&
//             wall[n - y - 1][x + 1] / 3 > 0 &&
//             wall[n - y - 1][x] / 3 >= 1 &&
//             !check(n - y - 1, x, 1, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           if (
//             x > 0 &&
//             wall[n - y][x - 1] / 3 > 0 &&
//             wall[n - y][x] / 3 >= 1 &&
//             !check(n - y, x - 1, 1, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           if (
//             x < n &&
//             wall[n - y][x + 1] / 3 > 0 &&
//             wall[n - y][x] / 3 >= 1 &&
//             !check(n - y, x, 1, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           break;
//         }

//         if (!can_delete) {
//           pillar_install(x, y, wall, n);
//         } else {
//           for (let i = 0; i < result.length; i++) {
//             if (
//               result[i][0] === x &&
//               result[i][1] === y &&
//               result[i][2] === a
//             ) {
//               result.splice(i, 1);
//               break;
//             }
//           }
//         }
//       }
//     }
//     //보
//     else {
//       //설치
//       if (b === 1) {
//         //보 : 한쪽 끝부분이 기둥위에 있거나, 양쪽 끝부분이 다른 보와 동시에 연결되어 있으면 설치가능
//         if (
//           wall[n - y][x] % 3 >= 1 ||
//           wall[n - y][x + 1] % 3 >= 1 ||
//           (wall[n - y][x] / 3 >= 1 && wall[n - y][x + 1] / 3 >= 1)
//         ) {
//           beam_install(x, y, wall, n);
//           result.push([x, y, a]);
//         }
//       }
//       //삭제
//       else {
//         beam_delete(x, y, wall, n);
//         //삭제한 뒤 조건 만족하는지 확인
//         let can_delete = true;
//         while (true) {
//           if (wall[n - y][x] / 3 > 0 && !check(n - y, x - 1, 1, wall, n)) {
//             can_delete = false;
//             break;
//           }
//           if (wall[n - y][x + 1] / 3 > 0 && !check(n - y, x + 1, 1, wall, n)) {
//             can_delete = false;
//             break;
//           }
//           if (
//             y < n &&
//             wall[n - y - 1][x] % 3 >= 1 &&
//             wall[n - y][x] % 3 >= 1 &&
//             !check(n - y, x, 0, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           if (
//             y > 0 &&
//             wall[n - y + 1][x] % 3 >= 1 &&
//             wall[n - y][x] % 3 >= 1 &&
//             !check(n - y + 1, x, 0, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           if (
//             y < n &&
//             wall[n - y - 1][x + 1] % 3 >= 1 &&
//             wall[n - y][x + 1] % 3 >= 1 &&
//             !check(n - y, x + 1, 0, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           if (
//             y > 0 &&
//             wall[n - y - 1][x + 1] % 3 >= 1 &&
//             wall[n - y][x + 1] % 3 >= 1 &&
//             !check(n - y + 1, x + 1, 0, wall, n)
//           ) {
//             can_delete = false;
//             break;
//           }
//           break;
//         }

//         if (!can_delete) {
//           beam_install(x, y, wall, n);
//         } else {
//           for (let i = 0; i < result.length; i++) {
//             if (
//               result[i][0] === x &&
//               result[i][1] === y &&
//               result[i][2] === a
//             ) {
//               result.splice(i, 1);
//               break;
//             }
//           }
//         }
//       }
//     }
//   }

//   result.sort((a, b) => {
//     if (a[0] === b[0]) {
//       if (a[1] === b[1]) {
//         return a[2] - b[2];
//       } else return a[1] - b[1];
//     } else return a[0] - b[0];
//   });
//   //return result;
//   for (let i = 0; i < result.length; i++) {
//     console.log(result[i]);
//   }
// }

// console.log(
//   solution(100, [
//     [2, 0, 0, 1],
//     [100, 0, 0, 1],
//     [100, 1, 1, 1],
//     [99, 1, 1, 1],
//     [99, 1, 0, 1],
//     [99, 0, 0, 1],
//   ])
// );

//not solve 😵
//일반적인 구현 문제인데, 설치는 정말 쉬우나 삭제에서 고려해야할 예외사항이 너무 많기 때문에 구현하기도 어렵고, 시간도 오래걸리고, 실수도 많이 발생. 또 히든케이스에서 계속 틀리는데 반례를 도저히 못찾겠음..

//✔ 구현과정이 복잡한 경우 정확히 구현하기가 어렵기 때문에 ⭐문제를 쉽게 풀수있는 아이디어를 머릿속으로 잘 정리한뒤에 코드작성을 시작⭐하자.
//✔요구사항에서 전체 명령의 개수는 1000개 이하이므로 O(N^2)이 이상적이나, 시간제한이 5초로 매우 넉넉하기 때문에 O(M^3)으로 풀어도 된다는것을 먼저 인지
//✔따라서 설치 및 삭제 연산을 수행할때마다 '전체 구조물을 확인하며' 규칙을 확인하는 방법으로 해결가능 -> 전수조사
//✔2차원 배열에 직접 구조물을 세우는게 아니라 그냥 구조물들의 좌표를 저장해야 더 쉽게 구현가능. -> 이방법이면 전수조사 말고도 가능했을듯?

//현재 설치된 모든 구조물이 가능한지 확인
function possible(answers) {
  for (let answer of answers) {
    const [x, y, stuff] = answer;
    //기둥
    if (stuff === 0) {
      //바닥 위거나 보의 한쪽 끝부분 위거나 다른 기둥 위라면 정상
      if (
        y === 0 ||
        answers.find(
          (ele) => ele[0] === x - 1 && ele[1] === y && ele[2] === 1
        ) !== undefined ||
        answers.find((ele) => ele[0] === x && ele[1] === y && ele[2] === 1) !==
          undefined ||
        answers.find(
          (ele) => ele[0] === x && ele[1] === y - 1 && ele[2] === 0
        ) !== undefined
      )
        continue;
      return false; //아니라면 false반환
    } else if (stuff === 1) {
      //한쪽 끝부분이 기둥 위 혹은 양쪽 끝부분이 다른 보와 동시에 연결이라면 정상
      if (
        answers.find(
          (ele) => ele[0] === x && ele[1] === y - 1 && ele[2] === 0
        ) !== undefined ||
        answers.find(
          (ele) => ele[0] === x + 1 && ele[1] === y - 1 && ele[2] === 0
        ) !== undefined ||
        (answers.find(
          (ele) => ele[0] === x - 1 && ele[1] === y && ele[2] === 1
        ) !== undefined &&
          answers.find(
            (ele) => ele[0] === x + 1 && ele[1] === y && ele[2] === 1
          ) !== undefined)
      )
        continue;
      return false;
    }
  }
  return true;
}

function solution(n, build_frame) {
  let answers = [];
  for (let frame of build_frame) {
    const [x, y, stuff, operate] = frame;
    //삭제
    if (operate === 0) {
      //일단 삭제 수행
      for (let i = 0; i < answers.length; i++) {
        if (
          answers[i][0] === x &&
          answers[i][1] === y &&
          answers[i][2] === stuff
        ) {
          answers.splice(i, 1);
          break;
        }
      }
      //가능한 구조물인지 확인
      if (!possible(answers)) {
        answers.push([x, y, stuff]);
      }
    }
    //설치
    else if (operate === 1) {
      //일단 설치
      answers.push([x, y, stuff]);
      if (!possible(answers)) {
        answers.splice(answers.length - 1, 1);
      }
    }
  }

  answers.sort((a, b) => {
    if (a[0] === b[0]) {
      if (a[1] === b[1]) {
        return a[2] - b[2];
      } else return a[1] - b[1];
    } else return a[0] - b[0];
  });

  return answers;
}

solution(5, [
  [0, 0, 0, 1],
  [2, 0, 0, 1],
  [4, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [2, 1, 1, 1],
  [3, 1, 1, 1],
  [2, 0, 0, 0],
  [1, 1, 1, 0],
  [2, 2, 0, 1],
]);
