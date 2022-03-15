import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const g = parseInt(input[0]); //탑승구 수
const p = parseInt(input[1]); //비행기 수

const find_parent = (parent, x) => {
  return parent[x];
};

const parent = new Array(g + 1);
const child_count = new Array(p + 1).fill(0);

//부모 테이블 0으로 초기화
for (let i = 0; i <= g; i++) {
  parent[i] = 0;
}

let count = 0;
for (let i = 2; i < p + 2; i++) {
  const gi = parseInt(input[i]); //1~gi까지 가능한 탑승구
  const idx = i - 1; //현재 비행기 인덱스
  for (let j = 1; j <= gi; j++) {
    let airplane = find_parent(parent, j);
    //console.log(airplane);
    if (airplane === 0) {
      parent[j] = idx;
      child_count[idx] += 1;
    } else if (child_count[airplane] > 1) {
      parent[j] = idx;
      child_count[idx] += 1;
      child_count[j] -= 1;
    }
  }
  //console.log("child_count", child_count[idx]);
  if (child_count[idx] === 0) {
    count = idx - 1;
    break;
  }
}

console.log(count);

//solve

// 4
// 3
// 4
// 1
// 1
