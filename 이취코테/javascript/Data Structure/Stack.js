class Stack {
  //private인 경우 _로 표시
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
  reverse() {
    return this._arr.reverse();
  }
  print() {
    console.log(this._arr);
  }
}
const stack = new Stack();

stack.push(5);
stack.push(2);
stack.push(3);
stack.push(7);
stack.pop();
stack.push(1);
stack.push(4);
stack.pop();

stack.print(); //최하단 원소부터 추력
console.log(stack.reverse()); //최상단 원소부터 출력
