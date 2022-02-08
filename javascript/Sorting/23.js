import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);
const arr = [];
for (let i = 1; i < n + 1; i++) {
  const [name, kr, en, math] = input[i].split(" ");
  arr.push({
    name: name,
    kr: parseInt(kr),
    en: parseInt(en),
    math: parseInt(math),
  });
}

arr.sort((a, b) => {
  if (a.kr !== b.kr) {
    return b.kr - a.kr; //값을 return해야 정렬됨.
  } else if (a.en !== b.en) {
    return a.en - b.en;
  } else if (a.math !== b.math) {
    return b.math - a.math;
  } else {
    //❌오답 1번
    if (a.name > b.name) return 1;
    else return -1;
    //return a.name - b.name;
  }
});

let answer = "";
arr.forEach((ele) => {
  answer += ele.name + "\n";
});
console.log(answer.trim());

//❌오답 1번
//테스트케이스도 제대로 확인안하고 제출함...😫
//sort()안에서 함수를 사용하여 정렬할때, 문자열도 b-a식으로 사용하면 양수, 음수, 0같은 값이 나오지 않기 때문에 정렬이 안됨.
//따라서 문자열은 대소 비교를 통해 1, -1, 0을 return해서 사용해야함.
