import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);
const inputs = [];
for (let i = 1; i <= n; i++) {
  inputs.push(input[i].trim().split(""));
}
const s = new Array(m);

for (let i = 0; i < m; i++) {
  //사전순 정렬 자동으로 되게 하려면 dna 객체 순서를 사전순으로 해야함
  const dna = { A: 0, C: 0, G: 0, T: 0 };
  inputs.forEach((input) => (dna[input[i]] += 1));
  let max = -1;
  let maxKey = "A";
  //해당 인덱스에서 가장 많이 나온 알파벳으로 설정해야 차이가 최소가 됨
  Object.entries(dna).forEach(([key, value]) => {
    if (value > max) {
      max = value;
      maxKey = key;
    }
  });
  s[i] = maxKey;
}

console.log(s.join(""));

//distance 계산
let distance = 0;
for (let i = 0; i < m; i++) {
  inputs.forEach((input) => {
    if (input[i] !== s[i]) distance += 1;
  });
}

console.log(distance);

//solve
//오답 : 문제 조건의 같을때 사전 순 정렬 처리 안함
