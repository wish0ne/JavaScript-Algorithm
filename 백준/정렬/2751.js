import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = Number(input[0]);
const numbers = [];
for (let i = 1; i <= n; i++) numbers.push(parseInt(input[i]));
numbers.sort((a, b) => a - b);
let ans = "";
numbers.forEach((num) => (ans += num + "\n"));
console.log(ans);

//시간초과 나서 어려운 문제인줄 알았는데... 걍 매번 console.log해서 그런거였음...
//시간초과를 유의해야할때는 출력값을 모았다가 한번만 출력하자

//해설
//join해서 return하는게 시간이 더 적게 든다...! string을 다루는게 시간을 잡아먹는듯
const a = [];
for (let i = 1; i <= n; i++) a.push(parseInt(input[i]));
a.sort((a, b) => a - b);
console.log(a.join("\n"));
