function solution(genres, plays) {
  const map = new Map(); //총합 계산
  const play_map = new Map();
  for (let i = 0; i < plays.length; i++) {
    if (map.has(genres[i])) {
      map.set(genres[i], map.get(genres[i]) + plays[i]);
    } else map.set(genres[i], plays[i]);
    play_map.set(i, [genres[i], plays[i]]);
  }

  const mapArr = Array.from(map);
  mapArr.sort((a, b) => b[1] - a[1]); //value값 기준으로 정렬

  const playMapArr = Array.from(play_map);
  playMapArr.sort((a, b) => {
    if (b[1][1] !== a[1][1]) return b[1][1] - a[1][1];
    return a[0] - b[0];
  });

  const answer = [];
  for (let [key, value] of mapArr) {
    let count = 0;
    for (let [k, v] of playMapArr) {
      if (key === v[0]) {
        answer.push(k);
        count += 1;
      }
      if (count > 1) break;
    }
  }
  return answer;
}

console.log(
  solution(
    ["classic", "pop", "classic", "classic", "pop"],
    [500, 600, 150, 800, 2500]
  )
);

//solve
