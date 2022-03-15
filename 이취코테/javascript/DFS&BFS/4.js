let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const [n, m] = input[0].split(" ").map(Number);

//공백 없는 경우 2차원 배열 입력받기
let mapArr = [];
for (let i = 0; i < n; i++) {
  mapArr.push(input[i + 1].trim().split("").map(Number));
}

//상 하 좌 우
const dx = [-1, 1, 0, 0];
const dy = [0, 0, -1, 1];

const bfs = (x, y) => {
  //큐 생성
  const queue = [];
  queue.push([x, y]);
  //큐가 빌때까지 반복
  while (queue.length !== 0) {
    //큐에서 원소 하나 뽑음
    v = queue.shift();
    //가능한 4가지 방향에 대해서 검사
    for (let i = 0; i < 4; i++) {
      let nx = v[0] + dx[i];
      let ny = v[1] + dy[i];
      //맵을 벗어난 경우
      if (nx < 0 || nx >= n || ny < 0 || ny >= m) continue;
      //괴물이 있는 경우
      if (mapArr[nx][ny] === 0) continue;
      //예외에 다 해당하지 않는 경우 그 칸으로 움직임
      mapArr[nx][ny] = mapArr[v[0]][v[1]] + 1;
      //목적지에 도달했다면 return
      if (nx === n - 1 && ny === m - 1) return;
      //큐에 이동할 수 있는 칸을 넣음.
      queue.push([nx, ny]);
    }
  }
};

bfs(0, 0);
console.log(mapArr[n - 1][m - 1]);
