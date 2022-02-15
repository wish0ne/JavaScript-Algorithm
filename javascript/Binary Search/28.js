import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");

const n = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

//index와 값 비교
const binary_search = (arr, start, end) => {
  if (start > end) return false;
  const mid = parseInt((start + end) / 2);
  if (arr[mid] === mid) return mid;
  //값>index면 왼쪽 검색
  else if (arr[mid] > mid) {
    return binary_search(arr, start, mid - 1);
  } else {
    return binary_search(arr, mid + 1, end);
  }
};

const fixed_point = binary_search(arr, 0, n - 1);
fixed_point ? console.log(fixed_point) : console.log(-1);

// 5
// -15 -6 1 3 7

// 7
// -15 -4 2 8 9 13 15
