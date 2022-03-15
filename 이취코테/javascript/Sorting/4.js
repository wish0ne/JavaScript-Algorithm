let input = require("fs").readFileSync("../test.txt").toString().split("\n");
const [n, k] = input[0].split(" ").map(Number);

let arrA = input[1].split(" ").map(Number);
let arrB = input[2].split(" ").map(Number);
arrA.sort((a, b) => a - b); //오름차순 정렬
arrB.sort((a, b) => b - a); //내림차순 정렬

for (let i = 0; i < k; i++) {
  if (arrA[i] < arrB[i]) {
    [arrA[i], arrB[i]] = [arrB[i], arrA[i]]; //구조 분해 할당 이용한 swap
  } else break;
}

console.log(arrA.reduce((prev, curr) => prev + curr)); //배열의 합 구하기
// reduce : 배열의 각 요소에 대해 주어진 리듀서 함수를 실행하고, 하나의 결과값을 반환
// arr.reduce(acc, curr, idx, arr)
// acc : 누산기. 콜백의 반환값을 누적
// curr : 현재 요소
// idx : 현재 요소의 인덱스
// arr : reduce를 호출한 배열
