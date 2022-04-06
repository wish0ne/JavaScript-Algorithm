const array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

for (let i = 1; i < array.length; i++) {
  //인덱스 i부터 1까지 감소하며 반복하는 문법
  for (let j = i; j > 0; j--) {
    //한 칸씩 왼쪽으로 이동
    if (array[j] < array[j - 1]) {
      [array[j], array[j - 1]] = [array[j - 1], array[j]];
    } else break; //자기보다 작은 데이터를 만나면 그 위치에서 멈춤
  }
}

console.log(array);
