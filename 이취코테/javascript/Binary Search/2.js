let input = require("fs").readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
let store = input[1].split(" ").map(Number);

const k = parseInt(input[2]);
let customer = input[3].split(" ").map(Number);

//이진 탐색 코드 외우기!⭐⭐⭐⭐⭐
const binary_search = (arr, target, start, end) => {
  if (start > end) return false;
  const mid = parseInt((start + end) / 2);
  if (arr[mid] === target) return mid;
  else if (arr[mid] > target) {
    return binary_search(arr, target, start, mid - 1);
  } else {
    return binary_search(arr, target, mid + 1, end);
  }
};

store.sort((a, b) => a - b);
let answer = "";
for (let i of customer) {
  if (binary_search(store, i, 0, n - 1)) {
    answer += "yes ";
  } else answer += "no ";
}
console.log(answer.trim());
