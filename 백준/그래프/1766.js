class Heap {
  constructor() {
    this.heap = [];
  }

  getLength() {
    return this.heap.length;
  }

  //왼쪽 자식 인덱스 = 부모인덱스 * 2 + 1
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  //오른쪽 자식 인덱스 = 부모인덱스 * 2 + 2
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  //부모인덱스 = ((자식인덱스 - 1) / 2)의 내림
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  //부모 노드가 있는지
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  //왼쪽 자식 노드가 있는지
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }

  //오른쪽 자식 노드가 있는지
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  //왼쪽 자식 노드의 값
  leftChild(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }

  //오른쪽 자식 노드의 값
  rightChild(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)];
  }

  //부모 노드의 값
  parent(childIndex) {
    return this.heap[this.getParentIndex(childIndex)];
  }

  // 두 노드의 값을 교환
  swap(indexOne, indexTwo) {
    const temp = this.heap[indexTwo];
    this.heap[indexTwo] = this.heap[indexOne];
    this.heap[indexOne] = temp;
  }

  //최상위 노드 return (min Heap에서 최솟값을 반환, max Heap에서 최대값을 반환)
  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }

  //최우선순위 원소 제거
  poll() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const item = this.heap[0];

    // 가장 마지막 원소를 맨 위로 이동
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return item;
  }

  add(item) {
    this.heap.push(item);
    this.heapifyUp();
    return this;
  }

  remove(item) {
    const numberOfItemsToRemove = this.find(item).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      const indexToRemove = this.find(item).pop();
      if (indexToRemove === this.heap.length - 1) {
        this.heap.pop();
      } else {
        this.heap[indexToRemove] = this.heap.pop();
        const parentItem = this.parent(indexToRemove);
        if (
          (this.hasLeftChild(indexToRemove) && !parentItem) ||
          this.pairIsInCorrectOrder(this.parentItem, this.heap[indexToRemove])
        ) {
          this.heapifyDown(indexToRemove);
        } else {
          this.heapifyUp(indexToRemove);
        }
      }
    }
    return this;
  }

  find(item) {
    //찾고자 하는 아이템의 인덱스들
    const foundItemIndices = [];

    for (let itemIndex = 0; itemIndex < this.heap.length; itemIndex += 1) {
      if (item === this.heap[itemIndex]) {
        foundItemIndices.push(itemIndex);
      }
    }

    return foundItemIndices;
  }

  isEmpty() {
    return !this.heap.length;
  }

  toString() {
    return this.heap.toString();
  }

  heapifyUp(customStartIndex) {
    //마지막 원소를 heap이 될때까지(올바른 순서가 될때까지) 올림
    //add에서는 파라미터 없이(맨 마지막 요소를 올림), remove에서는 파라미터 넣어서(그 요소를 올림) heapifyUp을 호출
    let currentIndex = customStartIndex || this.heap.length - 1;

    //부모 요소가 존재하고(올릴 곳이 있고) 부모 요소의 값과 현재값을 비교해서 바꿔야하면 swap
    //swap했을 경우 현재 인덱스를 부모 인덱스로 업데이트
    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heap[currentIndex]
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex));
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown(customStartIndex = 0) {
    //디폴트 파라미터
    //root부터 시작해서 부모 요소와 자식 요소를 비교해서 ( minheap에서는 더 작은 자식, maxheap에서는 더 큰 자식과) swap.
    // 다음 자식에 대해서도 반복
    let currentIndex = customStartIndex;
    let nextIndex = null;

    //자식이 존재할경우 반복
    while (this.hasLeftChild(currentIndex)) {
      //왼쪽 자식과 오른쪽 자식 둘다 존재하고, 오른쪽 자식의 순위가 더 높은 경우 (minheap인 경우 오른쪽이 더 작고 maxheap인 경우 오른쪽이 더 큰 경우) 오른쪽 자식을 다음 인덱스로 설정.
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex)
        )
      ) {
        //다음 인덱스는 오른쪽 자식
        nextIndex = this.getRightChildIndex(currentIndex);
      } else {
        //왼쪽 자식이 있고 오른쪽 자식이 없거나, 오른쪽 자식이 있어도 왼쪽의 우선순위가 더 높을 경우 왼쪽 자식을 다음 인덱스로 설정.
        nextIndex = this.getLeftChildIndex(currentIndex);
      }

      //현재 인덱스의 값이 다음 인덱스의 값과 비교했을때 올바른 순서인 경우 break
      //max heap인 경우 현재 인덱스의 값이 다음 인덱스의 값보다 클 경우
      //min heap인 경우 현재 인덱스의 값이 다음 인덱스의 값보다 작은 경우
      if (
        this.pairIsInCorrectOrder(this.heap[currentIndex], this.heap[nextIndex])
      ) {
        break;
      }

      //현재 인덱스의 값과 다음 인덱스의 값을 비교했을때 올바르지 않은 순서인 경우 swap
      this.swap(currentIndex, nextIndex);
      currentIndex = nextIndex; //현재 인덱스 업데이트
    }
  }

  pairIsInCorrectOrder(firstElement, secondElement) {
    // Max Heap일 경우
    // 첫번째 인자가 두번째 인자보다 크거나 같아야함.
    //return firstElement >= secondElement;
    // Min Heap일 경우
    // 첫번째 인자가 두번째 인자보다 작거나 같아야함.
    //return firstElement[0] <= secondElement[0];
    return firstElement <= secondElement;
  }
}

import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, m] = input[0].split(" ").map(Number);

const graph = new Array(n + 1);
for (let i = 0; i <= n; i++) graph[i] = [];

const indegree = new Array(n + 1).fill(0);

for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  indegree[b] += 1;
}

let answer = "";

const heap = new Heap();
for (let i = 1; i <= n; i++) {
  if (indegree[i] === 0) heap.add(i);
}

while (heap.getLength() > 0) {
  const v = heap.poll();
  answer += v + " ";
  for (let n of graph[v]) {
    indegree[n] -= 1;
    if (indegree[n] === 0) heap.add(n);
  }
}

console.log(answer);

//solve
//일반적인 위상정렬 문제에서 최소값부터 출력하는 조건만 추가된 문제
//min heap 이용

//해설
//모든 정점이 heap에 한번씩 push, pop -> O(VlogV)
const a = new Array(n + 1);
for (let i = 0; i <= n; i++) a[i] = [];

const ind = new Array(n + 1).fill(0);

for (let i = 1; i <= m; i++) {
  const [x, y] = input[i].split(" ").map(Number);
  a[x].push(y);
  ind[y] += 1;
}

const q = new Heap();
for (let i = 1; i <= n; i++) {
  if (ind[i] === 0) q.add(i);
}

let ans = "";
while (q.getLength() > 0) {
  const x = q.poll();
  ans += x + " ";
  for (let i of a[x]) {
    ind[i] -= 1;
    if (ind[i] === 0) q.add(i);
  }
}

console.log(ans);
