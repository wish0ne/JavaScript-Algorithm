import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const str = input[0].trim();
const bomb = input[1].trim();

const stack = [];
for (let i = 0; i < str.length; i++) {
  stack.push(str[i]);
  if (stack.length >= bomb.length) {
    while (true) {
      let check = stack.slice(stack.length - bomb.length).join("");
      if (check === bomb) {
        for (let j = 0; j < bomb.length; j++) stack.pop();
      } else break;
    }
  }
}

if (stack.length === 0) console.log("FRULA");
else console.log(stack.join(""));

//solve
//stack에 하나씩 넣으면서 마지막에서 bomb 길이만큼의 단어 확인한후에 같으면 없애는것 반복
//시간초과 날 줄 알았는데 무사히 통과

//해설
const a = input[0].trim().split("");
const b = input[1].trim().split("");

const n = a.length;
const m = b.length;

const erased = new Array(1000001).fill(false); //각 단어마다 지워지는지 표시
//t의 길이가 1이면 그냥 for문을 돌면서 하나씩 지움
if (m === 1) {
  for (let i = 0; i < n; i++) {
    if (a[i] === b[0]) erased[i] = true;
  }
} else {
  const s = []; //stack
  for (let i = 0; i < n; i++) {
    //t의 첫번째 문자열과 같으면 스택에 추가
    //새로운 폭발문자열의 시작을 의미
    if (a[i] === b[0]) s.push([i, 0]); //[s에서의 인덱스, t에서의 인덱스]
    else {
      //스택이 비어있지 않으면 스택의 가장 위 element와 연속되는지 확인
      if (s.length !== 0) {
        let p = s[s.length - 1];
        //현재문자가 폭발문자열의 p+1번째 문자와 같으면(연속됨) 스택에 추가
        if (a[i] === b[p[1] + 1]) {
          s.push([i, p[1] + 1]);
          //마지막 문자와 같다면 폭발문자열을 찾은 것
          if (p[1] + 1 === m - 1) {
            //스택에서 폭발문자열 삭제
            for (let k = 0; k < m; k++) {
              let p = s.pop();
              erased[p[0]] = true;
            }
          }
        }
        //다르면 스택을 비움
        else {
          while (s.length !== 0) s.pop();
        }
      }
      //다른 경우 스택이 비어있으면 넘어감
    }
  }
}

let printed = false;
let answer = "";
for (let i = 0; i < n; i++) {
  if (erased[i]) continue;
  answer += `${a[i]}`;
  printed = true;
}
if (!printed) console.log("FRULA");
else console.log(answer);
