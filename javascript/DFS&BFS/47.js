import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

//이동 방향 8가지 (0번째 index는 패딩값)
const dx = [0, -1, -1, 0, 1, 1, 1, 0, -1];
const dy = [0, 0, -1, -1, -1, 0, 1, 1, 1];

//그래프 -> [물고기 번호, 방향] 저장
const graph = new Array(4);
const fish = new Array(17).fill(0); //물고기 번호 순대로 인덱스 저장(0번째 물고기는 상어)

//입력받기
for (let i = 0; i < 4; i++) {
  graph[i] = [];
  const arr = input[i].split(" ").map(Number);
  let f = 0;
  for (let j = 0; j < 8; j += 2) {
    graph[i].push([arr[j], arr[j + 1]]);
    fish[arr[j]] = [i, f];
    f += 1;
  }
}

//번호순대로 물고기 이동
const fish_move = (graph, fish) => {
  for (let i = 1; i <= 16; i++) {
    //이미 먹힌 번호면
    if (fish[i][0] === -1) continue;

    //먹히지 않았으면 이동
    const [fx, fy] = fish[i]; //물고기의 좌표
    const [fn, fd] = graph[fx][fy]; //물고기의 번호, 방향

    //물고기가 이동할 수 있는 방향 확인
    let d = fd;
    for (let j = 0; j < 8; j++) {
      let nx = fx + dx[d];
      let ny = fy + dy[d];
      // 경계 넘는 경우
      if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) {
        d = d === 8 ? 1 : d + 1;
        continue;
      }
      //상어가 있는경우
      if (graph[nx][ny][0] === 0) {
        d = d === 8 ? 1 : d + 1;
        continue;
      }

      //이동할 수 있는 경우

      let [tempn, tempd] = graph[nx][ny]; //위치 바꿀 물고기 [번호, 방향]

      graph[nx][ny] = [i, d]; //현재 물고기를 이동시킴
      fish[i] = [nx, ny]; //현재 물고기의 좌표 갱신
      graph[fx][fy] = [tempn, tempd]; //위치 바꾼 물고기도 이동
      if (tempn !== -1) fish[tempn] = [fx, fy]; //위치 바꾼 물고기의 좌표 갱신 (빈자리와 위치를 바꿀경우 갱신해줄필요 없음)
      break;
    }
  }
};

//상어 이동
const shark_move = (graph, fish, nx, ny, x, y, count) => {
  //물고기 있을때만 이동
  if (graph[nx][ny][1] !== -1) {
    const [fishn, fishd] = graph[nx][ny]; //먹을 물고기의 방향, 번호
    count += fishn; //먹은 물고기 번호만큼 증가
    graph[nx][ny] = [0, fishd]; //상어가 물고기 먹고 방향 가짐, 그 좌표로 이동
    graph[x][y] = [-1, -1]; //먹힌 물고기 자리는 빈자리
    fish[0] = [nx, ny]; //상어의 좌표 갱신
    fish[fishn] = [-1, -1]; //먹힌 물고기 좌표는 -1로 비어있음을 표시
  }
  return count;
};

//한 단계에서 최대 3가지 선택지 존재.
//한 단계에서 1,2,3가지를 돌때 모두 "같은 Graph, 같은 count, 같은 fish"를 가지고 있어야함.
//따라서 한 단계의 초기 상태를 now_graph, now_count, now_fish에 저장해두고 이를 이용
const dfs = (graph, count, fish, x, y) => {
  let now_graph = [...graph];
  for (let i = 0; i < 4; i++) {
    now_graph[i] = [...graph[i]];
  }
  let now_count = count;
  let now_fish = [...fish];
  for (let i = 0; i < 17; i++) {
    now_fish[i] = [...fish[i]];
  }

  const sharkd = graph[x][y][1]; //상어의 방향
  //상어가 이동할 좌표
  let nx = x + dx[sharkd];
  let ny = y + dy[sharkd];
  //상어가 맵을 벗어날 경우
  if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) {
    max_count = Math.max(max_count, count);
  } else if (graph[nx][ny][0] === -1) {
    //상어는 물고기가 없는 빈공간에도 가지 못함
    max_count = Math.max(max_count, count);
  } else {
    //상어가 이동할 수 있는 경우(먹을 수 있는 물고기)
    count = shark_move(graph, fish, nx, ny, x, y, count);
    fish_move(graph, fish);
    dfs(graph, count, fish, nx, ny);
  }

  count = now_count;
  graph = [...now_graph];
  for (let i = 0; i < 4; i++) {
    graph[i] = [...now_graph[i]];
  }
  fish = [...now_fish];
  for (let i = 0; i < 17; i++) {
    fish[i] = [...now_fish[i]];
  }
  nx += dx[sharkd];
  ny += dy[sharkd];
  if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) {
    max_count = Math.max(max_count, count);
  } else if (graph[nx][ny][0] === -1) {
    max_count = Math.max(max_count, count);
  } else {
    count = shark_move(graph, fish, nx, ny, x, y, count);
    fish_move(graph, fish);
    dfs(graph, count, fish, nx, ny);
  }

  count = now_count;
  graph = [...now_graph];
  for (let i = 0; i < 4; i++) {
    graph[i] = [...now_graph[i]];
  }
  fish = [...now_fish];
  for (let i = 0; i < 17; i++) {
    fish[i] = [...now_fish[i]];
  }
  nx += dx[sharkd];
  ny += dy[sharkd];
  if (nx < 0 || nx >= 4 || ny < 0 || ny >= 4) {
    max_count = Math.max(max_count, count);
  } else if (graph[nx][ny][0] === -1) {
    max_count = Math.max(max_count, count);
  } else {
    count = shark_move(graph, fish, nx, ny, x, y, count);
    fish_move(graph, fish);
    dfs(graph, count, fish, nx, ny);
  }
};

let eat_fish = 0; //상어가 먹은 물고기 번호의 합

// 상어가 초기에 들어갈때
eat_fish += graph[0][0][0]; //먹은 물고기 번호 증가
fish[graph[0][0][0]] = [-1, -1]; //물고기 배열에서 먹힌 물고기 제거
graph[0][0][0] = 0; //상어 번호로 갱신 (상어는 0번, 방향은 동일)
fish[0] = [0, 0]; //상어(0번 물고기) 좌표 갱신

fish_move(graph, fish);

let max_count = eat_fish;
dfs(graph, eat_fish, fish, fish[0][0], fish[0][1]);
console.log(max_count);

//이틀동안 풀어서...sovle...😵
//사실 핵심은 DFS라서 어렵진 않긴 한데... 상어이동과 물고기 이동의 구현이 진짜 극악이였으며(계속 사소한 부분에서 실수해서 틀림)
//DFS를 아직도 잘 이해하지 못하고 있는것 같다. 좀 더 DFS/BFS 문제를 많이 풀어볼 필요가 있음
