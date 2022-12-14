import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().trim().split("\n");

const answer = [];
input.forEach((p) => {
  const [s, t] = p.trim().split(" ");
  let idx = 0;
  for (let i = 0; i < t.length; i++) {
    if (t[i] === s[idx]) {
      idx += 1;
      if (idx === s.length) break;
    }
  }
  if (idx === s.length) answer.push("Yes");
  else answer.push("No");
});
console.log(answer.join("\n"));

//solve
//KMP 보고 놀란 이후로 문자열 트라우마 생긴듯...ㅎ 이 쉬운 문제를 한참 정규식가지고 한참 고민함 ㅜ
//걍 브루트포스로 풀면 O(N)임
