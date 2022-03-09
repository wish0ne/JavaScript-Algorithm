import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

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

const n = parseInt(input[0]); //복도의 크기
const hall = [];
for (let i = 1; i <= n; i++) {
  hall.push(input[i].trim().split(" "));
}

const empty = [];
const students = [];
const teachers = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (hall[i][j] === "X") empty.push([i, j]);
    else if (hall[i][j] === "S") students.push([i, j]);
    else teachers.push([i, j]);
  }
}

const empty_comb = Combination(empty, 3);

function check() {
  //감시 확인
  for (let t = 0; t < teachers.length; t++) {
    const [x, y] = teachers[t]; //선생님의 x좌표, y좌표
    //상
    let nx = x;
    let ny = y;
    while (nx >= 0) {
      if (hall[nx][ny] === "S") return false;
      if (hall[nx][ny] === "O") break;
      nx -= 1;
    }
    //하
    nx = x;
    ny = y;
    while (nx < n) {
      if (hall[nx][ny] === "S") return false;
      if (hall[nx][ny] === "O") break;
      nx += 1;
    }
    //좌
    nx = x;
    ny = y;
    while (ny >= 0) {
      if (hall[nx][ny] === "S") return false;
      if (hall[nx][ny] === "O") break;
      ny -= 1;
    }
    //우
    nx = x;
    ny = y;
    while (ny < n) {
      if (hall[nx][ny] === "S") return false;
      if (hall[nx][ny] === "O") break;
      ny += 1;
    }
  }
  return true;
}

let answer = false;
for (let i = 0; i < empty_comb.length; i++) {
  //장애물 설치
  for (let c = 0; c < 3; c++) {
    hall[empty_comb[i][c][0]][empty_comb[i][c][1]] = "O";
  }
  //감시확인
  if (check()) {
    answer = true;
    break;
  }

  //장애물 제거
  for (let c = 0; c < 3; c++) {
    hall[empty_comb[i][c][0]][empty_comb[i][c][1]] = "X";
  }
}

answer ? console.log("YES") : console.log("NO");

//solve 😀
//장애물 3개를 설치할 수 있는 모든 경우를 확인하여 여부 검사 -> 36C3 <= 10,000
//모든 조합을 찾기 위해서 DFS/BFS를 이용해 모든 조합을 반환하는 함수를 작성할 수 있음.
