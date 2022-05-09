import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);

//맵 입력받기
let ice = [];
for (let i = 0; i < n; i++) {
  ice.push(input[i + 1].split("").map(Number));
}

const dfs = (ice, x, y) => {
  if (x < 0 || x >= n || y < 0 || y >= m) return;

  if (ice[x][y] === 0) {
    ice[x][y] = 1; //방문처리
    //상하좌우 호출
    dfs(ice, x + 1, y);
    dfs(ice, x - 1, y);
    dfs(ice, x, y - 1);
    dfs(ice, x, y + 1);
  }
};

//2차원 배열 한칸마다 dfs 수행
let count = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (ice[i][j] === 0) {
      dfs(ice, i, j);
      count += 1;
    }
  }
}

console.log(count);

// 15 14
// 00000111100000
// 11111101111110
// 11011101101110
// 11011101100000
// 11011111111111
// 11011111111100
// 11000000011111
// 01111111111111
// 00000000011111
// 01111111111000
// 00011111111000
// 00000001111000
// 11111111110011
// 11100011111111
// 11100011111111
