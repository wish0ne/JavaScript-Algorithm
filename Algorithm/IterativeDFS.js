//stack으로 DFS 구현
//JS에서 재귀로 DFS를 구현하다보면 호출 스택이 부족 -> 런타임 에러 발생
//재귀방식과 탐색순서가 다름(큰 index부터 먼저 탐색)

//각 노드가 연결된 정보를 리스트 자료형으로 표현(2차원 배열)
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];

let start = 1;
const stack = [[start, -1]]; //첫번째 시작 노드를 스택에 포함하여 초기화
const visited = new Array(graph.length).fill(false);

//스택이 빌때까지 반복
while (stack.length) {
  //가장 마지막에 추가된 노드 빼냄
  const [node, parent] = stack.pop();

  //노드를 뽑았을때 이미 방문한 노드라면 이전의 누군가의 부모노드거나 리프노드인 경우
  if (visited[node]) {
    //따라서 이 영역은 재귀 DFS에서 for문이 종료된 외부 영역과 동일하다.
    continue;
  }
  stack.push([node, parent]);
  //해당 노드 방문처리
  visited[node] = true;
  console.log(node);

  //해당 노드와 연결된 노드중에 방문되지 않은 노드가 있다면 스택에 추가
  for (let next of graph[node]) {
    if (!visited[next]) {
      stack.push([next, node]);
    }
  }
}

// 1
// 2
// 7
// 6
// 8
// 3
// 4
// 5
