import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = input[0].split("").map(Number);
const left = n.splice(0, n.length / 2);
const right = n;
const leftSum = left.reduce((acc, cur) => acc + cur);
const rightSum = right.reduce((acc, cur) => acc + cur);

if (leftSum === rightSum) console.log("LUCKY");
else console.log("READY");

//solve 😀
//구현 문제
