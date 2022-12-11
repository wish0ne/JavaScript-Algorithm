import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const origin = parseInt(input[0]);
const stocks = input[1].split(" ").map(Number);

//준현
let money = origin; //현금
let count = 0; //주식수
for (let s of stocks) {
  //풀매수
  if (s <= money) {
    count += parseInt(money / s);
    money -= parseInt(money / s) * s;
  }
  if (money === 0) break;
}

const jun = money + stocks[13] * count;

//성민
money = origin;
count = 0;
let decrease = 0;
let increase = 0;
for (let i = 1; i < 14; i++) {
  //감소
  if (stocks[i] < stocks[i - 1]) {
    decrease += 1;
    increase = 0;
    //전량매수
    if (decrease >= 3) {
      count += parseInt(money / stocks[i]);
      money -= parseInt(money / stocks[i]) * stocks[i];
    }
  }
  //증가
  else if (stocks[i] > stocks[i - 1]) {
    increase += 1;
    decrease = 0;
    //전량매도
    if (increase >= 3) {
      money += stocks[i] * count;
      count = 0;
    }
  }
}
const sung = stocks[13] * count + money;

if (jun > sung) console.log("BNP");
else if (jun < sung) console.log("TIMING");
else console.log("SAMESAME");

// console.log(jun);
// console.log(sung);

//solve
//쉬운 구현 문제
