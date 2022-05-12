function solution(tickets) {
  //여행경로
  const answer = [];

  //공항 문자열 - 인덱스 번호 매핑
  let map = new Map();
  let index = 0;
  tickets.forEach((ticket) => {
    ticket.forEach((airport) => {
      if (!map.has(airport)) {
        map.set(airport, index);
        index += 1;
      }
    });
  });

  //그래프 생성
  const graph = new Array(map.size);
  const visited = new Array(map.size);
  for (let i = 0; i < map.size; i++) {
    graph[i] = [];
    visited[i] = [];
  }

  //공항 연결
  tickets.forEach((ticket) => {
    const [a, b] = ticket;
    graph[map.get(a)].push(b);
    visited.push(false);
  });

  //알파벳순으로 정렬
  for (let i = 0; i < graph.length; i++) {
    graph[i].sort();
  }

  //dfs 수행
  const dfs = (node) => {
    let index = map.get(node);
    answer.push(node);
    //✔마지막 경로인지 확인필요
    //if (answer.length === tickets.length + 1) return answer;

    for (let i = 0; i < graph[index].length; i++) {
      let v = graph[index][i];
      if (visited[index][i]) continue;
      visited[index][i] = true;
      dfs(v);
      //✔모든 경로를 이용하지 않았다면 다른 경로 탐색해야함
      if (answer.length !== tickets.length + 1) {
        visited[index][i] = false;
        answer.pop();
      }
    }
    return answer; //42줄에서 확인하는거랑 여기서 return하는거랑 동일함
  };

  dfs("ICN");

  return answer;
}

console.log(
  solution([
    ["ICN", "AAB"],
    ["ICN", "AAA"],
    ["AAA", "ICN"],
  ])
);

//테스트케이스 2개 실패 ~> 반례 못찾음 🥺
//문제를 잘 이해하지 못했다!!
//모든 항공권을 이용해야하고, 모든 도시를 방문할 수 없는 경우는 주어지지 않는다 (문제조건) -> 이 조건들에서 모든 경로가 다 모든 항공권을 이용하는건 아니라는걸 알아챘어야하는데 전혀 알지 못했음;;
//ex) 서울-> 인천 -> 부산 이면 모든 항공권 이용가능, 서울 -> 부산이면 인천을 가지 못하는 경우가 발생하는것!!

//문제 난이도는 쉽지만 반례를 찾지못하면 아무 소용이 없다... ⭐⭐대부분의 반례는 문제를 잘 읽어봐야하는듯⭐⭐
