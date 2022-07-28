import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const k = Number(input[0]);
const A = input[1].trim().split(" ");

let max = "0";
let min = "9999999999";

const dfs = (v, visited, idx, num) => {
  visited[v] = true;

  if (idx === k) {
    //0부터 시작하므로 min부터 체크하면 max는 min이 아닐때만 검사해도 된다.
    if (Number(min) > Number(num)) min = num;
    else if (Number(max) < Number(num)) max = num;
    return;
  }

  if (A[idx] === "<") {
    for (let i = v + 1; i < 10; i++)
      if (!visited[i]) {
        dfs(i, visited, idx + 1, num + `${i}`);
        visited[i] = false; //⭐초기화
      }
  } else {
    for (let i = 0; i < v; i++)
      if (!visited[i]) {
        dfs(i, visited, idx + 1, num + `${i}`);
        visited[i] = false; //⭐초기화
      }
  }
};

for (let i = 0; i < 10; i++) {
  const visited = new Array(10).fill(false);
  dfs(i, visited, 0, `${i}`);
}

console.log(max);
console.log(min);

//solve..?
//순열 카테고리라서 모든 순열 생성한 뒤 하나씩 부등호 확인해서 완탐했더니 maximum call stack 에러
//경우의 수를 줄이기 위해 dfs로 해결 -> dfs 이해 강화 필요
//근데 순열해설보다 dfs가 덜 시간걸리는듯

//해설

//1. 0~9까지 10개의 수 중에서 k+1개의 수를 선택한다
//2. k+1개의 수의 가능한 (k+1)!개의 순서를 모두 생성하고 부등호를 검사한다.
//=> 시간복잡도 : 2^k+1 * (k+1)! * (k+1) => too big
// 시간을 줄여야함 : 숫자가 중요한게 아니라 대소관계가 중요. 그리고 최대값/최소값을 구하는 문제이므로
// 최대값은 가장 큰 숫자 k+1개, 최소값은 가장 작은 숫자 k+1개로 구성될때가 정답이다.
// => 1번과정이 생략되므로 시간복잡도 단축 가능

//next permutation : 순열 생성 시 재귀를 이용하지 않고 각 인덱스 값을 비교하여 모든 경우의 인덱스값을 뽑아내는 방법
//현 순열에서 오름차순으로 다음 순열 생성
//배열을 가장 작은 값으로 정렬한 뒤 한 자리씩 swap하면서 출력
//재귀방법보다 시간복잡도가 낮음 / nPr과 같이 특정 개수의 순열을 뽑아낼 수 없다.

//순열을 최소값에서부터 증가하는 순으로 생성
function next_permutation(a) {
  let i = a.length - 1; //뒤쪽부터 탐색하여 교환위치(i-1) 찾기(i : 가장 높은 값)
  // i-1 < i인 경우 찾기
  while (i > 0 && a[i - 1] >= a[i]) {
    i -= 1;
  }
  if (i <= 0) return false; //i(가장 큰 값)<=0이면 마지막 순열까지 탐색 완료
  let j = a.length - 1; //뒤쪽부터 탐색하여 교환위치(i-1)와 교환할 교환위치보다 큰 값 위치(j)찾기
  while (a[j] <= a[i - 1]) {
    j -= 1;
  }

  [a[i - 1], a[j]] = [a[j], a[i - 1]]; //두 위치값 교환(i-1, j)

  //가장 큰 값 인덱스(i)부터 맨 뒤까지 오름차순 정렬 (이미 내림차순 되어있으므로 0부터 n-1 자리수를 각각 교환)
  j = a.length - 1;
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i += 1;
    j -= 1;
  }
  return true;
}

//순열을 최대값에서부터 감소하는 순서로 생성
function prev_permutation(a) {
  let i = a.length - 1;
  while (i > 0 && a[i - 1] <= a[i]) {
    i -= 1;
  }
  if (i <= 0) return false;
  let j = a.length - 1;
  while (a[j] >= a[i - 1]) j -= 1;

  [a[i - 1], a[j]] = [a[j], a[i - 1]];

  j = a.length - 1;
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i += 1;
    j -= 1;
  }
  return true;
}

// 부등호 만족 확인
function check(perm, a) {
  for (let i = 0; i < a.length; i++) {
    //모두 다른 수 이므로 같은경우는 고려할 필요 없음
    if (a[i] === "<" && perm[i] > perm[i + 1]) return false;
    if (a[i] === ">" && perm[i] < perm[i + 1]) return false;
  }
  return true;
}

const K = Number(input[0]);
const a = input[1].trim().split(" "); //부등호 배열

const small = new Array(K + 1); //가장 작은 수를 찾기 위한 배열
const big = new Array(K + 1); //가장 큰 수를 찾기 위한 배열

for (let i = 0; i <= K; i++) {
  small[i] = i; //0~k까지 수 넣음
  big[i] = 9 - i; //(9-k)~9까지수 넣음
}

//최소값 찾기
while (true) {
  //작은것부터 확인하므로 하나라도 찾으면 종료
  if (check(small, a)) break;
  if (!next_permutation(small)) break;
}

//최대값 찾기
while (true) {
  //큰것부터 확인하므로 하나라도 찾으면 종료
  if (check(big, a)) break;
  if (!prev_permutation(big)) break;
}

console.log(big.join(""));
console.log(small.join(""));
