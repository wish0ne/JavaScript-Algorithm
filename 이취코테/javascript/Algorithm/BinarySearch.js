// 재귀함수로 구현한 이진 탐색 소스코드
function binary_search_recursion(array, target, start, end) {
  if (start > end) return null;
  let mid = parseInt((start + end) / 2);
  //찾은 경우 중간점 인덱스 반환
  if (array[mid] === target) return mid;
  //중간점의 값보다 찾고자 하는 값이 작은 경우 왼쪽 확인
  else if (array[mid] > target)
    return binary_search_recursion(array, target, start, mid - 1);
  //중간점의 값보다 찾고자 하는 값이 큰 경우 오른쪽 확인
  else return binary_search_recursion(array, target, mid + 1, end);
}

//반복문으로 구현한 이진 탐색 소스코드
function binary_search_iteration(array, target, start, end) {
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    //찾은 경우 중간점 인덱스 반환
    if (array[mid] === target) return mid;
    else if (array[mid] > target) end = mid - 1;
    else start = mid + 1;
  }
  return null;
}

const array1 = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const n = 10;
const target = 7;
const array2 = [1, 3, 5, 6, 9, 11, 13, 15, 17, 19];
const result1 = binary_search_recursion(array1, target, 0, n - 1);
if (result1 === null) console.log("원소가 존재하지 않습니다.");
else console.log(result1 + 1);

const result2 = binary_search_recursion(array2, target, 0, n - 1);
if (result2 === null) console.log("원소가 존재하지 않습니다.");
else console.log(result2 + 1);

const result3 = binary_search_iteration(array1, target, 0, n - 1);
if (result3 === null) console.log("원소가 존재하지 않습니다.");
else console.log(result3 + 1);

const result4 = binary_search_iteration(array2, target, 0, n - 1);
if (result4 === null) console.log("원소가 존재하지 않습니다.");
else console.log(result4 + 1);
