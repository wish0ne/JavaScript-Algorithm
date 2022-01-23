let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);
let ice = [];

//공백 없을때는 split로 한번에 잘라서 배열 못만듦.
// 문자열 하나하나 순회하면서 배열에 넣음.
for (let i = 0; i < n; i++) {
  ice.push([]);
  for (let j = 0; j < m; j++) {
    ice[i].push(parseInt(input[i + 1][j]));
  }
}

const dfs = (ice, x, y) => {
  if (x < 0 || x >= n || y < 0 || y >= m) return;

  if (ice[x][y] === 0) {
    ice[x][y] = 1;
    dfs(ice, x + 1, y);
    dfs(ice, x - 1, y);
    dfs(ice, x, y - 1);
    dfs(ice, x, y + 1);
  }
};

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
