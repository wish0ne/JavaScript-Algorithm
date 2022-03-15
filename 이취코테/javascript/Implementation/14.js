// n : 외벽의 길이
// weak : 취약지점의 위치
// dist : 각 친구가 1시간동안 이동할 수 있는 거리
// 취약 지점을 점검하기 위해 보내야 하는 친구수의 최솟값 return

const Combination = (arr, selectNum) => {
  //하나씩 선택하는 경우 각 원소를 배열에 넣은 배열 return
  if (selectNum === 1) return arr.map((a) => [a]);
  const results = []; //조합이 담길 배열
  arr.forEach((a, index) => {
    //작은 배열로 나눠서 조합을 구함.
    //배열을 앞에서부터 하나씩 잘라서 작은 배열로 만들고 거기서 하나를 제외한 조합을 구함. => 앞의 숫자를 고정한채로 조합을 구하는것.
    const smallerCombination = Combination(arr.slice(index + 1), selectNum - 1);
    smallerCombination.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
};

function clockwise(start, n) {}

function counterclockwise(start, n) {}

function solution(n, weak, dist) {
  const restaurant = new Array(n).fill(0);
  for (let i = 0; i < weak.length; i++) {
    restaurant[i] = -1;
  }
  dist.sort(a, (b) => a - b);
  const friend = [];
  friend.push(dist.pop());

  //취약점 간 차이 계산
  const combinations = Combination(weak, 2);
  const distance = [];
  for (let combination of combinations) {
    distance.push([
      Math.abs(combination[0] - combination[1]),
      combination[0],
      combination[1],
    ]);
  }
  distance.sort(a, (b) => b[0] - a[0]); //차이가 큰 순으로 정렬

  while (true) {}
}

solution(12, [1, 5, 6, 10], [1, 2, 3, 4]);
