//판매원 이름(center포함안됨), 추천인, 판매한 판매원, 판매수량
function solution(enroll, referral, seller, amount) {
  enroll.unshift("-");
  //hash 생성 & 그래프 생성
  const map = new Map();
  enroll.forEach((e, idx) => map.set(e, idx));
  const graph = new Array(enroll.length).fill(null);
  //⭐⭐⭐그래프 거꾸로 만들기!! (부모를 연결)⭐⭐⭐
  referral.forEach((r, idx) => {
    graph[map.get(enroll[idx + 1])] = map.get(r);
  });
  const answer = new Array(enroll.length - 1).fill(0); //center 포함x

  //dfs
  const dfs = (n, amount, visited) => {
    visited[n] = true;
    let i = graph[n];
    if (!visited[i]) {
      let dist = parseInt(amount * 0.1);
      answer[n - 1] += amount - dist;
      if (i === 0) return;
      if (dist <= 0) return;
      dfs(i, dist, visited);
    }

    return null;
  };

  for (let i = 0; i < seller.length; i++) {
    const visited = new Array(enroll.length + 1).fill(false);
    dfs(map.get(seller[i]), amount[i] * 100, visited);
  }
  return answer;
}

//⭐⭐⭐dfs에서 거꾸로 올라가야할때⭐⭐⭐
// 밑으로 내려갔다가 다시 올라오는게 아니라 그냥 그래프를 반대로 연결해서 만들면됨!!(자식에 부모 연결)
//dfs를 거꾸로 올라가면서 탐색하는 유형 익혀두자...dfs에 아직도 익숙하지 않은듯
//hash를 통해서 문자열이랑 index랑 매핑하는 유형도 자주나오니 익숙해지자
//JS에서 재귀가 깊어지면 런타임 에러가 발생한다! -> iterative DFS 사용 or 복잡도 줄이기

console.log(
  solution(
    ["john", "mary", "edward", "sam", "emily", "jaimie", "tod", "young"],
    ["-", "-", "mary", "edward", "mary", "mary", "jaimie", "edward"],
    ["young", "john", "tod", "emily", "mary"],
    [12, 4, 2, 5, 10]
  )
);
