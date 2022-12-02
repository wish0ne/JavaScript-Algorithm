import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

let [n, b] = input[0].split(" ");
let answer = 0;
b = parseInt(b);
n.split("").forEach((v, idx) => {
  let p = n.length - idx - 1; //✔배열은 앞에서부터니까 인덱스 거꾸로 해줘야함^^
  //숫자
  if (/[0-9]/.test(v)) {
    answer += Math.pow(b, p) * parseInt(v);
  }
  //문자
  else {
    //✔왜 Z만 계산하고 있냐고 ^^
    answer += Math.pow(b, p) * (v.charCodeAt(0) - "A".charCodeAt(0) + 10);
  }
});
console.log(answer);

//걍 바보...^^ 제곱 인덱스 거꾸로 해서 한번 틀리고 문자일때 v.charCodeAt(0)인데 'Z'.charCodeAt(0)해놓고 왜틀렸지 이러고 있었음

//제곱 속도 개선 풀이
function fastPowering(base, power) {
  if (power === 0) return 1;
  if (power === 1) return base;
  if (power % 2 === 0) {
    const multiplier = fastPowering(base, power / 2);
    return multiplier * multiplier;
  } else {
    return base * fastPowering(base, power - 1);
  }
}

answer = 0;
n.split("").forEach((v, idx) => {
  let p = n.length - idx - 1;
  //숫자
  if (/[0-9]/.test(v)) {
    answer += fastPowering(b, p) * parseInt(v);
  }
  //문자
  else {
    answer += fastPowering(b, p) * (v.charCodeAt(0) - "A".charCodeAt(0) + 10);
  }
});
console.log(answer);

//자바스크립트 활용 풀이!!
//진법 변환 이제는 직접 계산하지 말자..^^
//10진법에서 다른 진법 => v.toString(b)
//다른진법에서 10진법 => parseInt(v, b);
//참고 : https://medium.com/web-dev-note/javascript-%EC%A7%84%EB%B2%95-%EB%B3%80%ED%99%98-330694083495
console.log(parseInt(n, b));
