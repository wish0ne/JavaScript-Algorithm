function solution(user_id, banned_id) {
  //각 제재 아이디의 후보 구하기
  const candidates = [];
  for (let banned of banned_id) {
    let candidate = [];
    for (let user of user_id) {
      if (user.length !== banned.length) continue;
      let same = 0;
      user.split("").forEach((u, idx) => {
        if (u === banned[idx] || banned[idx] === "*") {
          same += 1;
        }
      });
      if (same === user.length) candidate.push(user);
    }
    candidates.push(candidate);
  }

  //경우의 수 구하기
  let count = 0;
  const answer = [];
  function dfs(array, index) {
    if (index >= candidates.length) {
      if (new Set(array).size === candidates.length) {
        let string = array.sort().join("");
        //중복 제거
        if (!answer.includes(string)) {
          answer.push(string);
          count += 1;
        }
      }
      return;
    }
    for (let i = 0; i < candidates[index].length; i++) {
      const temp = [...array];
      temp.push(candidates[index][i]);
      dfs(temp, index + 1);
    }
  }
  dfs([], 0);
  return count;
}

console.log(
  solution(
    ["frodo", "fradi", "crodo", "abc123", "frodoc"],
    ["fr*d*", "*rodo", "******", "******"]
  )
);

//not solve
//각 제재 아이디의 후보를 구한다음, 각 제재 아이디 후보에서 하나씩 선택해서 조합을 만들어서 푸는 알고리즘은 생각
//어떻게 조합을 만들어야할지 아예 생각이 안났음. 계속 조합에 꽃혀서 Combination함수를 어떻게 이용해야할지 고민했었음..
//⭐⭐이것도 완전탐색의 일종이니까 dfs를 떠올려봐야했는데 그러지 못했다!!
//또 조합도 재귀로 구하는거니까 충분히 dfs를 떠올릴 수 있어야 했는데 아쉽다 😥
