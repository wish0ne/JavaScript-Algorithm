function solution(grid) {
  const graph = [];
  for (let i = 0; i < grid.length; i++) {
    graph.push(grid[i].split(""));
  }

  const cycle = new Set();
  const answer = [];
  //그래프 순회 : 모든 노드에서 출발하는 경우 확인
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      //한 노드에서 4가지 방향으로 빛을 쏠 수 있음
      for (let z = 0; z < 4; z++) {
        //출발점 : i, j
        const path = [];
        let x = i;
        let y = j;
        let d = z;
        do {
          [x, y, d] = move(
            x,
            y,
            d,
            graph[x][y],
            path,
            grid.length,
            grid[i].length,
            cycle
          );
          if (d === -1) break;
        } while (x !== i || y !== j || d !== z);

        //let result = compare_path(cycle, path);
        if (path.length > 0) {
          console.log(path);
          //cycle.push(path);
          answer.push(path.length);
        }
      }
    }
  }
  return answer.sort((a, b) => a - b);
}

//상 좌 하 우 (좌회전 순으로)
const dx = [-1, 0, 1, 0];
const dy = [0, -1, 0, 1];

function move(x, y, d, value, path, wall_x, wall_y, cycle) {
  switch (value) {
    case "S":
      break;
    case "L":
      d = (d + 1) % 4;
      break;
    case "R":
      d = d === 0 ? 3 : d - 1;
      break;
  }
  let nx = x + dx[d];
  let ny = y + dy[d];
  nx = nx < 0 ? wall_x - 1 : nx >= wall_x ? 0 : nx;
  ny = ny < 0 ? wall_y - 1 : ny >= wall_y ? 0 : ny;
  if (cycle.has(`${nx}-${ny}-${d}`)) {
    path = [];
    return [-1, -1, -1];
  } else cycle.add(`${nx}-${ny}-${d}`);
  path.push(`${nx}-${ny}-${d}`);
  return [nx, ny, d];
}

console.log(solution(["R", "R"]));

//1. 시간초과 : 사실 당연했음 너무 복잡도가 커서! 줄일수 있는 부분은 동일한 사이클인지 판단하는 부분밖에 없다고 생각했음.
// 여기서 "path의 하나만 원소가 같아도 동일한 path가 되는가?"라는 의문이 들었고, 사실 그냥 그렇게 된다고 짐작하고 풀었음(이게 아니면 복잡도가 해결이 안될것같은 문제라서)
//2. 그렇게 바꿨더니 시간초과는 다 해결됐는데 갑자기 실패가 뜸
//-> 범위가 커지면 x,y좌표가 11처럼 2자리가 될 수 있는데, 그럼 값을 저장할때 '3''11''1'이  '31''1''1'과 동일해짐. 따라서 각 문자 사이에 구분자를 넣어줘야했음! 이런 비슷한 문제 풀었었는데 똑같은 실수..
//⭐⭐문자로 값을 저장하여 구분하고자 할때는 구분자를 넣어주는 습관을 들이자⭐⭐
