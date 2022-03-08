export default class Heap {
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
    //삭제할 아이템의 개수 찾기
    const numberOfItemsToRemove = this.find(item).length;

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
      //heapify 프로세스 후 인덱스들이 변경되기 때문에 삭제 후 매번 삭제할 요소의 인덱스를 찾아야한다.
      const indexToRemove = this.find(item).pop();

      //맨 마지막 요소를 삭제해야할 경우에는 heapify가 필요하지 않음. 그냥 제거하면 됨.
      if (indexToRemove === this.heap.length - 1) {
        this.heap.pop();
      } else {
        //삭제하려는 요소의 자리에 마지막 요소의 값을 할당.
        this.heap[indexToRemove] = this.heap.pop();

        // 부모 요소를 찾음.
        const parentItem = this.parent(indexToRemove);

        //0. 말단 노드가 아닐때
        //1. 부모 요소가 없거나(루트 노드)
        //2. 부모 요소가 있고, 부모 요소와 현재 인덱스가 올바른 순서이면 (올라갈 필요 없음)
        // heapify down.
        //부모 요소가 없거나 부모 요소와 현재 인덱스가 올바른 순서일 경우 (max heap일때는 부모 요소가 더 큰 경우, min heap일때는 더 작은 경우) heapify down. 그 외의 경우 heapify up.
        if (
          //말단 노드가 아니고(말단노드이면 내려갈 수 없음. 올라가야함.)
          this.hasLeftChild(indexToRemove) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(parentItem, this.heap[indexToRemove]))
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
    return firstElement[0] <= secondElement[0];
  }
}
