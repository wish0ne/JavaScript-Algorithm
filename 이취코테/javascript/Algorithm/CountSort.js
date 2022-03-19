//모든 원소의 값이 0보다 크거나 같다고 가정
const array = [7, 5, 9, 0, 3, 1, 6, 2, 9, 1, 4, 8, 0, 5, 2];

//모든 범위를 포함하는 배열 선언(모든 값은 0으로 초기화)
const count = new Array(Math.max(...array) + 1).fill(0);

//각 데이터에 해당하는 인덱스값 증가
for (let i = 0; i < array.length; i++) {
  count[array[i]] += 1;
}

let answer = "";
for (let i = 0; i < count.length; i++) {
  for (let j = 0; j < count[i]; j++) {
    answer += i + " ";
  }
}

console.log(answer);
