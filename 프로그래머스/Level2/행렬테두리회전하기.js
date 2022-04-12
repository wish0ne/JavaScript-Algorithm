function solution(rows, columns, queries) {
  const graph = [];
  for (let i = 0; i < rows; i++) {
    graph.push([]);
    for (let j = 0; j < columns; j++) {
      graph[i].push(i * columns + (j + 1));
    }
  }
  print(graph);
  const answer = [];
  for (let query of queries) {
    const [x1, y1, x2, y2] = query;
    let min = rows * columns;
    //4방향 회전

    //right
    let row = x1 - 1;
    let col = y1;
    let curr = graph[row][col - 1]; //7
    let next_curr = graph[row][col];
    for (let col = y1; col < y2; col++) {
      next_curr = graph[row][col];
      graph[row][col] = curr; // 8->7
      curr = next_curr;
      min = Math.min(curr, min);
    }

    //down
    col = y2 - 1;
    for (let row = x1; row < x2; row++) {
      next_curr = graph[row][col];
      graph[row][col] = curr;
      curr = next_curr;
      min = Math.min(curr, min);
    }

    //left
    row = x2 - 1;
    for (let col = y2 - 2; col >= y1 - 1; col--) {
      next_curr = graph[row][col];
      graph[row][col] = curr;
      curr = next_curr;
      min = Math.min(curr, min);
    }

    //up
    col = y1 - 1;
    for (let row = x2 - 2; row >= x1 - 1; row--) {
      next_curr = graph[row][col];
      graph[row][col] = curr;
      curr = next_curr;
      min = Math.min(curr, min);
    }
    print(graph);
    answer.push(min);
  }
  return answer;
}

function print(graph) {
  for (let i = 0; i < graph.length; i++) {
    console.log(graph[i]);
  }
  console.log("\n");
}

console.log(
  solution(3, 4, [
    [1, 1, 2, 2],
    [1, 2, 2, 3],
    [2, 1, 3, 2],
    [2, 2, 3, 3],
  ])
);

//solve
//그냥 구현으로 머리싸매면서 풀었음..
//index 잘못지정해서 오답 나오는거 찾는데 오래걸림 ㅜ
