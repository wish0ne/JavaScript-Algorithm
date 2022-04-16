//순차탐색 : 시간초과
function solution(s) {
  let end = false;
  while (!end) {
    end = true;
    let prev = s[0];
    for (let i = 1; i < s.length; i++) {
      if (prev === s[i]) {
        s = s.substring(0, i - 1) + s.substring(i + 1, s.length);
        console.log(s);
        end = false;
        break;
      }
      prev = s[i];
    }
  }
  if (s.length === 0) return 1;
  else return 0;
}

//연결리스트 사용 : 정확도 시간초과 해결, 효율성 시간초과
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
    this.size -= 1;
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

  pairRemove() {
    let iter = this.head.next;
    let prev = this.head;
    while (iter !== null) {
      if (prev.value === iter.value) {
        this.delete(prev);
        this.delete(iter);
        if (this.size === 0) return 1;
        if (this.size === 1) return 0;
        prev = this.head;
        iter = this.head.next;
      } else {
        prev = iter;
        iter = iter.next;
      }
    }

    if (this.size === 0) return 1;
    else return 0;
  }
}

function solution2(s) {
  const list = new DoublyLinkedList();
  for (let i = 0; i < s.length; i++) list.append(s[i]);

  return list.pairRemove();
}

function solution3(s) {
  let string = s[0];
  for (let i = 1; i < s.length; i++) {
    string += s[i];
    if (string[string.length - 1] === string[string.length - 2]) {
      string = string.substring(0, string.length - 2);
    }
  }
  if (string.length === 0) return 1;
  else return 0;
}

//정답코드. string을 substring하는것보다 stack을 pop하는게 훨씬 빠르다
function solution4(s) {
  const string = [];
  string.push(s[0]);
  for (let i = 1; i < s.length; i++) {
    string.push(s[i]);
    if (string[string.length - 1] === string[string.length - 2]) {
      string.pop();
      string.pop();
    }
  }
  if (string.length === 0) return 1;
  else return 0;
}

console.log(solution4("baabaa"));

//not solve
//시간초과를 어떻게 해결해야할지 아예 감이 안왔다..
//왜 앞에서부터 하나씩 확인할 생각을 못했지?? 완전히 쉬운 알고리즘이였는데..🥺
//이것도 큰 string전체를 한번에 해결하려고 하지말고, 앞에서부터 작은 string부터 확인해나가는 생각을 못한거였으니까
//뭔가 dp처럼 큰 문제를 작은 문제로 나눠서 해결하는 부분이 아직 약한듯
