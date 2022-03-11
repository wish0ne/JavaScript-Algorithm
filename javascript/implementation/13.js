import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const INF = 999999999;

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

const [n, m] = input[0].split(" ").map(Number);
//도시 입력받기
const city = [];
for (let i = 1; i < n + 1; i++) {
  city.push(input[i].split(" ").map(Number));
}

//집, 치킨집 좌표 찾기
const houses = [];
const chickens = [];
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    if (city[i][j] === 1) houses.push([i, j]);
    else if (city[i][j] === 2) chickens.push([i, j]);
  }
}

//치킨집을 m개만 뽑을때 가능한 모든 조합
const chickens_comb = Combination(chickens, m);

let city_chicken_area = INF; //도시의 치킨 거리

//가능한 조합 모두 계산해봄 -> 거기서 최소 도시치킨거리 찾음
for (let chicken_comb of chickens_comb) {
  //각 조합에 대한 도시치킨거리 구하기
  let area = new Array(houses.length).fill(INF);
  for (let chicken of chicken_comb) {
    for (let i = 0; i < houses.length; i++) {
      //집에서 가장 가까운 치킨집 사이의 거리를 찾음.
      area[i] = Math.min(
        Math.abs(houses[i][0] - chicken[0]) +
          Math.abs(houses[i][1] - chicken[1]),
        area[i]
      );
    }
  }
  //지금 조합의 도시치킨거리가 최소도시치킨거리보다 작다면 갱신
  let temp_area = 0;
  for (let i = 0; i < area.length; i++) {
    temp_area += area[i];
  }
  city_chicken_area = Math.min(city_chicken_area, temp_area);
}

console.log(city_chicken_area);

//solve 😃
//치킨집은 최대 13개이다. 이중에서 M개를 고르는 조합을 생각하면 13CM이므로 100,000을 넘지 않는다.
//집의 개수 또한 최대 100개이므로 모든 경우의 수를 다 계산하더라도 시간초과없음.
//따라서 모든 치킨집 중에서 M개를 고르는 모든 경우에 대해서 완전탐색 수행하여 거리의 최소값을 구하는 문제
