class Heap {
  constructor(mode) {
    this.heap = [];
    this.mode = mode;
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

  isEmpty() {
    return !this.heap.length;
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
    if (this.mode === "max") return firstElement >= secondElement;
    return firstElement <= secondElement;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  //연결리스트의 맨 뒤에 추가
  append(value) {
    const node = new Node(value);
    //list가 비었을때
    if (!this.head) {
      this.head = node;
      this.tail = node;
    }
    //list에 node가 존재할때
    else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.size += 1;
    return this;
  }

  delete(node) {
    if (node === this.head) {
      if (node === this.tail) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = node.next;
        node.next.prev = null;
      }
    } else if (node === this.tail) {
      this.tail = node.prev;
      node.prev.next = null;
    } else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  }

  print() {
    let iter = this.head;
    let print = "";
    while (iter !== null) {
      print += `${iter.value} `;
      iter = iter.next;
    }
    console.log(print);
  }

  isEmpty() {
    return this.size === 0;
  }

  remove(value) {
    let iter = this.head;
    while (iter !== null) {
      if (iter.value === value) {
        this.delete(iter);
        this.size -= 1;
        return true;
      }
      iter = iter.next;
    }
    return false;
  }

  find(value) {
    let iter = this.head;
    while (iter !== null) {
      if (iter.value === value) return true;
      iter = iter.next;
    }
    return false;
  }
}

function solution(operations) {
  const maxHeap = new Heap("max");
  const minHeap = new Heap("min");
  const list = new DoublyLinkedList();
  operations.forEach((operation) => {
    let [op, num] = operation.split(" ");
    if (op === "I") {
      num = parseInt(num);
      maxHeap.add(num);
      minHeap.add(num);
      list.append(num);
    } else {
      if (!list.isEmpty()) {
        if (num === "1") {
          //최대값 제거
          let max = maxHeap.poll();
          while (!list.remove(max)) {
            max = maxHeap.poll();
          }
        } else {
          //최소값 제거
          let min = minHeap.poll();
          while (!list.remove(min)) {
            min = minHeap.poll();
          }
        }
      }
    }
    list.print();
  });
  if (list.isEmpty()) return [0, 0];
  let max = maxHeap.peek();
  while (!list.find(max)) {
    max = maxHeap.poll();
  }
  let min = minHeap.peek();
  while (!list.find(min)) {
    min = minHeap.poll();
  }
  return [max, min];
}

//console.log(solution(["I 0", "I 1", "D 1", "D -1", "D -1"]));
console.log(solution(["I 16", "D 1"]));
console.log(solution(["I 7", "I 5", "I -5", "D -1"]));
console.log(
  solution(["I 16", "I -5643", "D -1", "D 1", "D 1", "I 123", "D -1"])
);
console.log(solution(["I 3", "I 2", "I 1", "D 1", "D 1", "I 3", "D -1"]));

//solve
//프로그래머스에 시간초과가 고려되어있지 않아서 올바른 코드인지는 모르겠음
//그냥 추가할때마다 sort하고 pop, shift해도 맞다고 나온다고 함;;
//똑같은 문제 백준에서 풀어보기
