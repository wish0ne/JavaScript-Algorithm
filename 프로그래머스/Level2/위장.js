function solution(clothes) {
  const map = new Map();
  clothes.forEach((clothe) => {
    if (map.has(clothe[1])) {
      map.set(clothe[1], [...map.get(clothe[1]), clothe[0]]);
    } else map.set(clothe[1], [clothe[0]]);
  });

  let answer = 1;
  map.forEach((m) => {
    answer *= m.length + 1; //각 종류의 옷을 하나 고르는 경우의 수 곱함(안고를수도 있음)
  });
  answer -= 1; //모든 종류의 옷을 안고른 경우 제외
  return answer;
}

//solve
//hash map을 만들떄 object를 쓸지 map을 쓸지 잠깐 고민했었는데, 이제는 map 위주로 쓰자~
//map은 속도도 빠르고, 키도 정렬되어 있으며 키에 어떤 값이 들어가도 상관없음
//https://shanepark.tistory.com/220 참고

console.log(
  solution([
    ["yellowhat", "headgear"],
    ["bluesunglasses", "eyewear"],
    ["green_turban", "headgear"],
  ])
);
