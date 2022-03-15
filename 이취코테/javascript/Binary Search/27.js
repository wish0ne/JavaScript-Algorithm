import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const [n, x] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

//방법 1 -> O(N)이므로 오답
const firstLength = arr.length;
const arr2 = arr.filter((a) => a !== x);
const lastLength = arr2.length;

if (lastLength === firstLength) console.log(-1);
else console.log(firstLength - lastLength);

//방법 2 -> O(NlogN)이므로 오답
let count = 0;
const binary_search = (arr, target, start, end) => {
  if (start > end) return false; //target이 더이상 없음.
  const mid = parseInt((start + end) / 2);
  if (arr[mid] === target) {
    count += 1;
    binary_search(arr, target, start, mid - 1);
    binary_search(arr, target, mid + 1, end);
  } else if (arr[mid] > target) {
    return binary_search(arr, target, start, mid - 1);
  } else return binary_search(arr, target, mid + 1, end);
};

binary_search(arr, x, 0, n - 1);
count === 0 ? console.log(-1) : console.log(count);

//O(logN)으로 풀어야 하기 때문에 오답 😥
//이진탐색 2번 -> O(2logN)으로 해결가능 (마지막 인덱스 - 첫번째 인덱스 + 1)
//원소들이 정렬되어있으므로 인덱스 차이를 통해 개수를 구할 수 있다는 생각 ✔
const first_binary_search = (arr, target, start, end) => {
  if (start > end) return false;
  const mid = parseInt((start + end) / 2);
  if ((mid === 0 || arr[mid - 1] < target) && arr[mid] === target) return mid;
  else if (arr[mid] >= target)
    //target인 경우에도 포함 (더 작은 인덱스 찾아야함.)
    return first_binary_search(arr, target, start, mid - 1);
  else return first_binary_search(arr, target, mid + 1, end);
};

const last_binary_search = (arr, target, start, end) => {
  if (start > end) return false;
  const mid = parseInt((start + end) / 2);
  if ((mid === 0 || arr[mid + 1] > target) && arr[mid] === target) return mid;
  else if (arr[mid] > target)
    //target인 경우는 포함하지 않음 (더 큰 인덱스 찾아야함.)
    return last_binary_search(arr, target, start, mid - 1);
  else return last_binary_search(arr, target, mid + 1, end);
};

const last_index = last_binary_search(arr, x, 0, n - 1);
const first_index = first_binary_search(arr, x, 0, n - 1);
last_index === first_index
  ? console.log(-1)
  : console.log(last_index - first_index + 1);

// 7 4
// 1 1 2 2 2 2 3
