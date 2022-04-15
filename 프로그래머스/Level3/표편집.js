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
    this.pointer = null;
    this.delete = [];
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
    return this;
  }

  //위로 이동
  selectUp(value) {
    for (let i = 0; i < value; i++) {
      this.pointer = this.pointer.prev;
    }
  }

  //아래로 이동
  selectDown(value) {
    if (this.pointer === null) this.pointer = this.head; //처음
    for (let i = 0; i < value; i++) {
      this.pointer = this.pointer.next;
    }
  }

  //현재 행 삭제
  deletePointer() {
    this.delete.push(this.pointer);
    if (this.pointer === this.head) {
      if (this.pointer === this.tail) {
        this.head = null;
        this.tail = null;
        this.pointer = null;
      } else {
        this.head = this.pointer.next;
        this.pointer = this.head;
        this.head.prev = null;
      }
    } else if (this.pointer === this.tail) {
      this.tail = this.pointer.prev;
      this.tail.next = null;
      this.pointer = this.tail;
    } else {
      this.pointer.prev.next = this.pointer.next;
      this.pointer.next.prev = this.pointer.prev;
      this.pointer = this.pointer.next;
    }
  }

  //삭제 행 복구
  revert() {
    let node = this.delete.pop();
    //마지막에 삽입
    if (this.tail.value < node.value) {
      this.tail.next = node;
      node.prev = this.tail;
      node.next = null;
      this.tail = node;
    } else if (this.head.value > node.value) {
      this.head.prev = node;
      node.prev = null;
      node.next = this.head;
      this.head = node;
    } else {
      //시간초과 해결 : 복구할때 O(n)->O(1)로 줄임
      node.prev.next = node;
      node.next.prev = node;
      // let iter = this.head;
      // while (iter.value < node.value) {
      //   iter = iter.next;
      // }
      // node.next = iter;
      // iter.prev.next = node;
      // node.prev = iter.prev;
      // iter.prev = node;
    }
  }

  compare(n) {
    let iter = this.head;
    let answer = "";
    let index = 0;
    while (iter !== null) {
      if (iter.value === index) {
        answer += "O";
        iter = iter.next;
      } else answer += "X";
      index += 1;
    }
    //정확도 테스트 : padEnd가 작동안돼서 틀린 오류였다...
    //answer.padEnd(n, "X");
    while (answer.length < n) {
      answer += "X";
    }
    return answer;
  }

  print() {
    let iter = this.head;
    let print = "";
    while (iter !== null) {
      print += `${iter.value}`;
      iter = iter.next;
    }
    console.log(print);
  }
}

function solution(n, k, cmd) {
  const list = new DoublyLinkedList();
  for (let i = 0; i < n; i++) list.append(i);

  //처음 선택 행 지정
  list.selectDown(k);

  //명령어 수행
  for (let commands of cmd) {
    const command = commands.split(" ");
    switch (command[0]) {
      case "C":
        list.deletePointer();
        break;
      case "Z":
        list.revert();
        break;
      case "D":
        list.selectDown(command[1]);
        break;
      case "U":
        list.selectUp(command[1]);
        break;
    }
  }

  //삭제 여부 확인
  return list.compare(n);
}

console.log(solution(8, 0, ["C", "C", "C", "C", "C", "C", "C", "C"]));

//정확도 solve, 효율성 not solve
//1. 정확도 테스트 : padEnd가 전혀 동작하지 않아서 몇개 틀린거였음..!! 찾느라 오래걸렸는데..
//근데 왜 안동작하는지 모르겠음..
//⭐2. 효율성 테스트 : 복구할때 시간을 줄일 수 있었음 -> 삭제한 노드 자체를 저장하면 그 노드는 자신의 prev, next를 여전히 가지고 있음을 이용!!
//사실 이건 진짜 몰랐을것같다. 아니 이동할때도 O(n)도는데 이거 줄인다고 시간초과가 해결되는게 잘 이해가 안됨.
