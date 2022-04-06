const array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

function quick_sort(array, start, end) {
  //원소가 1개인 경우 종료
  if (start >= end) return;
  let pivot = start; //pivot을 첫번째 원소로 설정
  let left = start + 1;
  let right = end;
  while (left <= right) {
    //피벗보다 큰 데이터를 찾을때까지 반복
    while (left <= end && array[left] <= array[pivot]) left += 1;
    //피벗보다 작은 데이터를 찾을때까지 반복
    while (right > start && array[right] >= array[pivot]) right -= 1;
    //엇갈렸다면 작은 데이터와 피벗을 교체
    if (left > right) {
      [array[right], array[pivot]] = [array[pivot], array[right]];
    }
    //엇갈리지 않았다면 작은 데이터와 큰 데이터를 교체
    else {
      [array[left], array[right]] = [array[right], array[left]];
    }
  }
  //분할 이후 왼쪽 부분과 오른쪽 부분에서 각각 정렬 수행
  quick_sort(array, start, right - 1);
  quick_sort(array, right + 1, end);
}

quick_sort(array, 0, array.length - 1);
console.log(array);
