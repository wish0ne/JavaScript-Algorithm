import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

//not solve
//N이 500,000이므로 버블소트 직접 수행 -> 시간초과
//버블 소트의 특징 이용해서 풀이
//- 앞에 있는 수가 뒤로 가는건 한 단계에서 끝까지도 이동 가능
//- 뒤에 있는 수가 앞으로 가는건 한 단계에서 한 칸만 가능
// 따라서 원래상태와 정렬된 상태를 비교해소, 뒤에 있는 수가 앞으로 오는 경우 몇 칸 이동했는지 조사 후 최대값을 구함

const n = parseInt(input[0]);
const a = [];
for (let i = 1; i <= n; i++) a.push([parseInt(input[i]), i - 1]); //값, index

a.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  else return 0;
});

let max = 0;
for (let i = 0; i < n; i++) {
  //i : 정렬 후 인덱스, a[1] : 원래 인덱스
  //정렬 후 앞으로 이동했다면
  if (a[i][1] > i) {
    max = Math.max(max, a[i][1] - i);
  }
}
console.log(max + 1);

//해설
const N = parseInt(input[0]);
const A = [];
for (let i = 1; i <= N; i++) A.push([parseInt(input[i]), i - 1]); //실제 숫자, 정렬 전의 위치
A.sort((a, b) => a[0] - b[0]);
let ans = 0;

//(정렬 전 위치 - 정렬 후 위치)의 최대값 찾기
for (let i = 0; i < N; i++) {
  if (A[i][1] - i > ans) ans = A[i][1] - i;
}
console.log(ans + 1); //아무 수도 이동하지 않을때 종료되므로 ans번 교환 후 ans+1번째에서 종료

//디버깅용 (버블소트 직접 수행)
let b = [];
for (let i = 1; i <= n; i++) b.push(parseInt(input[i]));
let change = false;
for (let i = 0; i <= n; i++) {
  change = false;
  for (let j = 0; j < n - i; j++) {
    if (b[j] > b[j + 1]) {
      change = true;
      [b[j], b[j + 1]] = [b[j + 1], b[j]];
    }
  }
  if (change === false) {
    console.log(i + 1);
    break;
  }
}
