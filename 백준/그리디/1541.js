import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

let exp = input[0].split("-");
exp = exp.map((e) => {
  return e
    .split("+")
    .map(Number)
    .reduce((prev, curr) => prev + curr);
});
let answer = exp.reduce((prev, curr) => prev - curr);
console.log(answer);

//뭔가...뭔가 그리디는 그냥 어렵다...
//생각해보면 쉬운데?! 떠올리기까지 힘든..?
//-를 기준으로 +끼리 다 묶고 순서대로 더함(음수면 뺄셈이 됨) -> 큰 수를 빼야 최소값이 나오니까

//해설
//-가 나오면 항상 뒤의 식을 모두 -로 만들 수 있다 (- 뒤에 오는 연속된 +들을 괄호로 묶음)
const s = input[0];
const num = []; //숫자 저장
const sign = []; //부호 저장
let minus = false; //-가 나오면 true로 변경
let cur = 0;
sign.push(1); //맨 앞의 수는 부호가 항상 +

for (let x of s) {
  //부호
  if ("+-".includes(x)) {
    if (x === "+") sign.push(1);
    else if (x === "-") sign.push(-1);
    //부호가 나왔다면 -> 부호 앞의 숫자를 num에 넣어줌
    num.push(cur);
    cur = 0;
  }
  //숫자
  //지금까지 숫자의 10을 곱하고 지금 숫자를 더함 -> 마지막 자릿수 추가
  else cur = cur * 10 + (x.charCodeAt(0) - "0".charCodeAt(0));
}

num.push(cur); //맨 마지막 수 추가
let ans = 0;
minus = false;
for (let i = 0; i < num.length; i++) {
  if (sign[i] === -1) minus = true;
  //-가 하나라도 있으면 빼기 (- 뒤의 모든 수를 빼야 최소값)
  if (minus) ans -= num[i];
  //-가 아직 안나오면 더하기
  else ans += num[i];
}
console.log(ans);
