import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

//아예 감이 안와서 해설 본 문제...😭
//상태를 결정하는 스위치가 1개인 전구가 없다! 그래서 어려웠던것
//그러면 1개인 전구를 만들어주면 된다..! 맨 앞 전구를 on/off라고 가정하면 됨

const n = parseInt(input[0]);
const start = input[1].trim().split("").map(Number);
const end = input[2].trim().split("").map(Number);

const INF = 999999999;
let ans = INF;
//맨 앞을 on이라고 가정
let temp = [...start];
temp[0] = 1 - temp[0];
temp[1] = 1 - temp[1];
let a = count();
if (temp[n - 1] === end[n - 1]) ans = a + 1;

//맨 앞을 off라고 가정
temp = [...start];
a = count();
if (temp[n - 1] === end[n - 1]) ans = Math.min(a, ans);
if (ans === INF) console.log(-1);
else console.log(ans);

function count() {
  let count = 0;
  for (let i = 1; i < n; i++) {
    if (temp[i - 1] !== end[i - 1]) {
      count += 1;
      temp[i] = 1 - temp[i];
      temp[i - 1] = 1 - temp[i - 1];
      if (i !== n - 1) {
        temp[i + 1] = 1 - temp[i + 1];
      }
    }
  }
  return count;
}

//해설 소스코드
//전구 상태 변경 (a : 전구, index : 스위치)
function change(a, index) {
  for (let i = index - 1; i < index + 2; i++) {
    if (i >= 0 && i < a.length) a[i] = 1 - a[i];
  }
}

//앞에서부터 하나씩 맞춰가면서 횟수 count
//a를 goal로 변경하는 함수
function go(a, goal) {
  let n = a.length;
  let ans = 0; //횟수

  //i+1번째 스위치는 i번째 전구 상태에 따라 결정
  for (let i = 0; i < n - 1; i++) {
    if (a[i] !== goal[i]) {
      change(a, i + 1);
      ans += 1;
    }
  }
  let ok = true;
  for (let i = 0; i < n; i++) {
    if (a[i] !== goal[i]) ok = false;
  }

  if (ok) return [true, ans];
  else return [false, ans];
}

let b = [...start];
//첫번째 스위치 off라 가정
let p1 = go(b, end);
change(start, 0); //첫번째 스위치 on
//첫번째 스위치 on이라 가정
let p2 = go(start, end);
if (p2[0]) p2 = [p2[0], p2[1] + 1]; //맨 앞 on했으므로 +1

//최소값 or -1 return
if (p1[0] && p2[0]) console.log(Math.min(p1[1], p2[1]));
else if (p1[0]) console.log(p1[1]);
else if (p2[0]) console.log(p2[1]);
else console.log(-1);
