import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, k] = input[0].split(" ").map(Number);

let start = 1;
let end = calc(n) + n.toString().length - 1;
function search() {
  while (start <= end) {
    let mid = parseInt((start + end) / 2); //숫자
    const index = calc(mid); //몇번째 숫자인지 알려줌
    for (let i = 0; i < mid.toString().length; i++) {
      if (index + i === k) return mid.toString()[i];
    }
    if (index > k) end = mid - 1;
    else start = mid + 1;
  }
}

//x가 몇번째 숫자인지 알려줌(시작인덱스+length까지)
function calc(x) {
  let length = x.toString().length;
  let count = length * (x - Math.pow(10, length - 1));
  for (let i = length - 1; i > 0; i--) {
    count += i * 9 * Math.pow(10, i - 1);
  }
  return count + 1;
}
if (end < k) console.log(-1);
else console.log(search());

//메모리 초과 : 수 직접 만들었더니 ㅋ 안될거 알면서도 해봐야됨 ㅎㅎ;
//오답 1번 : end < k일때 때문이였음
//어렵다 어려워~ 이분탐색 문제인지 몰랐다면 평생 못풀었을듯

//해설
//N을 이분탐색으로 결정, N일때 길이와 K를 비교

//숫자 n까지 이어서 썼을때 길이를 구하는 함수
function calc2(n) {
  let ans = 0;
  let start = 1; //1, 10, 100, ...
  let length = 1;
  while (start <= n) {
    let end = start * 10 - 1; //9, 99, 999, ...
    if (end > n) end = n;
    ans += (end - start + 1) * length; //length자릿수의 숫자 개수 더함
    start *= 10;
    length += 1; //자릿수+1
  }
  return ans;
}

const [N, K] = input[0].split(" ").map(Number);
//숫자 N까지의 길이가 K보다 작은 경우
if (calc2(N) < K) {
  console.log(-1);
  process.exit();
}

let left = 1;
let right = N;
let ans = 0;
while (left <= right) {
  let mid = parseInt((left + right) / 2); //새로운 N
  let length = calc2(mid); //숫자 N까지 이어서 썼을때 길이
  //길이가 부족 -> N을 늘림
  if (length < K) left = mid + 1;
  //길이가 충분 -> N을 줄임 (길이가 정확히 K일때를 찾아야함)
  else {
    ans = mid; //정답에 저장해두고
    right = mid - 1;
  }
}
let s = ans.toString(); //k번째를 포함하는 숫자
let l = calc2(s);
console.log(s[s.length - (l - K) - 1]);
