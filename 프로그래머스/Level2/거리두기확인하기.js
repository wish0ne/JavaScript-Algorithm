// const dx = [-1, 1, 0, 0];
// const dy = [0, 0, -1, 1];

// function solution(places) {
//   let answer = [];
//   for (let place of places) {
//     //2차원 그래프 생성
//     let graph = [];
//     for (let i = 0; i < 5; i++) {
//       graph.push(place[i].split(""));
//     }

//     //응시자 좌표 찾기
//     const persons = [];
//     for (let i = 0; i < 5; i++) {
//       for (let j = 0; j < 5; j++) {
//         if (graph[i][j] === "P") persons.push([i, j]);
//       }
//     }

//     //각 응시자마자 다른 모든 응시자와 거리두기를 만족하는지 검사
//     let check = true;
//     //1. 파티션 존재 검사
//     for (let person of persons) {
//       const result = check_partition(person, graph);
//       //맨허튼 거리 검사
//       if (result.length > 0) {
//         for (let p of result) {
//           let area = Math.abs(person[0] - p[0]) + Math.abs(person[1] - p[1]);
//           if (area <= 2) {
//             console.log(person);
//             console.log(p);
//             check = false;
//             break;
//           }
//         }
//       }
//       if (!check) break;
//     }
//     console.log(check);
//     if (check) answer.push(1);
//     else answer.push(0);
//   }
//   return answer;
// }

// function check_partition(p, graph) {
//   const visited = [];
//   for (let i = 0; i < 5; i++) visited.push(new Array(5).fill(false));

//   const result = [];

//   function dfs(p, path) {
//     visited[p[0]][p[1]] = true;
//     for (let i = 0; i < 4; i++) {
//       let nx = p[0] + dx[i];
//       let ny = p[1] + dy[i];
//       if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5) continue;
//       if (!visited[nx][ny]) {
//         path += `${graph[nx][ny]}`;
//         //경로 하나 찾으면 확인
//         if (graph[nx][ny] === "P") {
//           if (!path.includes("X")) {
//             result.push([nx, ny]);
//           }
//           return;
//         }
//         dfs([nx, ny], path);
//       }
//     }
//     return result;
//   }

//   return dfs(p, "");
// }

const Combination = (arr, selectNum) => {
  //하나씩 선택하는 경우 각 원소를 배열에 넣은 배열 return
  if (selectNum === 1) return arr.map((a) => [a]);
  const results = []; //조합이 담길 배열
  arr.forEach((a, index) => {
    //작은 배열로 나눠서 조합을 구함.
    //배열을 앞에서부터 하나씩 잘라서 작은 배열로 만들고 거기서 하나를 제외한 조합을 구함. => 앞의 숫자를 고정한채로 조합을 구하는것.
    const smallerCombination = Combination(arr.slice(index + 1), selectNum - 1);
    smallerCombination.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
};

function solution(places) {
  let answer = [];
  for (let place of places) {
    //2차원 그래프 생성
    let graph = [];
    for (let i = 0; i < 5; i++) {
      graph.push(place[i].split(""));
    }

    //응시자 좌표 찾기
    const persons = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (graph[i][j] === "P") persons.push([i, j]);
      }
    }

    //각 응시자마자 다른 모든 응시자와 거리두기를 만족하는지 검사
    let combs = Combination(persons, 2);
    let check = true;
    for (let comb of combs) {
      //맨허튼 거리 검사
      const [p1, p2] = comb;
      let area = Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
      if (area === 1) {
        //거리가 1이면 항상 거리두기 실패
        check = false;
      } else if (area === 2) {
        //파티션 검사
        //가로로 나열
        if (p1[0] === p2[0]) {
          if (p1[1] > p2[1]) {
            if (graph[p1[0]][p1[1] - 1] !== "X") check = false;
          } else {
            if (graph[p1[0]][p1[1] + 1] !== "X") check = false;
          }
        }
        //세로로 나열
        else if (p1[1] === p2[1]) {
          if (p1[0] > p2[0]) {
            if (graph[p1[0] - 1][p1[1]] !== "X") check = false;
          } else {
            if (graph[p1[0] + 1][p1[1]] !== "X") check = false;
          }
        }
        //대각선
        else {
          if (graph[p1[0]][p2[1]] !== "X" || graph[p2[0]][p1[1]] !== "X")
            check = false;
        }
      }
    }
    if (check) answer.push(1);
    else answer.push(0);
  }
  return answer;
}

console.log(
  solution(
    [
      ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"],
      ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"],
      ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"],
      ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"],
      ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"],
    ],
    [1, 0, 1, 1, 1]
  )
);

//힘들게 solve
//1. 처음에는 문제를 잘못 이해해서 두 사람간의 가능한 모든 경로에 대해서 하나라도 파티션이 없으면 실패라고 생각했음. -> 어렵게 다푼뒤 잘못이해한거 깨달음
//2. 파티션 존재하는지 확인하는 과정을 어떻게 구현해야할지 감이 안와서 이상하게 구현함 -> 그림 그려보니까 바로 거리가 2일때만 고려하면 됨을 알 수 있었음.
//⭐제발 코드 바로 짜지말고 문제에서 주는 테스트 예시를 가지고 알고리즘 수행과정을 하나씩 확인해본 뒤 알고리즘을 명확히 생각하고 짜자⭐
