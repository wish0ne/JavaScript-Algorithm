// 순차 탐색

function sequential_search(n, target, array) {
  //각 원소를 하나씩 확인
  for (let i = 0; i < n; i++) {
    //현재의 원소가 찾고자 하는 원소와 동일한 경우
    if (array[i] === target) return i + 1; //현재의 위치 반환(인덱스는 0부터 시작하므로 1 더하기)
  }
}

console.log(
  sequential_search(5, "Dongbin", [
    "Hanul",
    "Jonggu",
    "Dongbin",
    "Taeil",
    "Sangwook",
  ])
);
