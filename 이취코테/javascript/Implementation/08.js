import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const arr = input[0].split("");

const alphabet = [];
let sum = 0;
//알파벳 숫자 구분, 숫자면 합
arr.forEach((a) => {
  if (a.charCodeAt(0) > "9".charCodeAt(0)) alphabet.push(a);
  else sum += parseInt(a);
});

alphabet.sort(); //알파벳 정렬

//답 출력
let answer = "";
alphabet.forEach((a) => {
  answer += a;
});
answer += sum.toString();
console.log(answer);

//solve

// K1KA5CB7
//AJKDLSI412K4JSJ9D
