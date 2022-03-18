import DoublyLinkedList from "./DoublyLinkedList.js";

export default class Queue {
  constructor() {
    this.linkedList = new DoublyLinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.linkedList.head.value;
  }

  enqueue(value) {
    this.linkedList.append(value);
  }

  dequeue() {
    const removeHead = this.linkedList.deleteHead();
    return removeHead ? removeHead : null;
  }
  print() {
    this.linkedList.print();
  }
}

// const queue = new Queue();
// queue.enqueue(5);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(7);
// queue.dequeue();
// queue.enqueue(1);
// queue.enqueue(4);
// queue.dequeue();
// queue.print();
