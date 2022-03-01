import fs from "fs";
import Heap from "../Data Structure/Heap.js";
let input = fs.readFileSync("../test.txt").toString().split("\n");
const n = parseInt(input[0]);
const heap = new Heap();
for (let i = 1; i <= n; i++) {
  heap.add(parseInt(input[i]));
}

let min_num = 0;
while (heap.getLength > 1) {
  //가장 작은 두 카드묶음을 더했을때 합이 최소가 됨.
  let first = heap.poll();
  let second = heap.poll();
  min_num += first + second;
  heap.add(first + second);
}

console.log(min_num);

//solve😀
//처음에는 배열로 pop, push, sort했더니 메모리 초과남.
//배열을 pop, push, sort하는 과정은 메모리 소요가 크다. 따라서 최소/최대힙이나 우선순위큐를 사용하자!
