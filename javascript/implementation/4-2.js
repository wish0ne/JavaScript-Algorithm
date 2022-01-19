let input = require("fs").readFileSync("../test.txt").toString().split("\n");
let n = parseInt(input[0]);

let count = 0;

for (let h = 0; h < n + 1; h++) {
  for (let m = 0; m < 60; m++) {
    for (let s = 0; s < 60; s++) {
      if ((h.toString() + m.toString() + s.toString()).includes("3")) {
        count += 1;
      }
    }
  }
}

console.log(count);

// 숫자 -> 문자열 변환 : 숫자.toString()
// 문자가 포함되었는지 확인 : 문자열.includes(문자)
