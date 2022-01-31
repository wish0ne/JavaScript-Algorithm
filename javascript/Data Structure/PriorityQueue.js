import Heap from "./Heap";

export default class PriorityQueue extends Heap {
  constructor() {
    //heap의 생성자 먼저 호출
    super();

    //priorities map 세팅
    this.priorities = new Map();
  }

  //우선순위큐에 아이템 추가
  add(item, priority = 0) {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  //우선순위큐에서 아이템 제거
  remove(item) {
    super.remove(item);
    this.priorities.delete(item);
    return this;
  }

  //우선순위큐 안의 아이템의 우선순위 변경
  changePriority(item, priority) {
    this.remove(item);
    this.add(item, priority);
    return this;
  }

  // value로 아이템 찾기
  findByValue(item) {
    return this.find(item);
  }

  //우선순위큐에 이미 아이템이 있는지 확인
  hasValue(item) {
    return this.findByValue(item).length > 0;
  }

  //두 아이템의 우선순위 비교
  comparePrioiryt(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  //두 아이템의 value 비교
  compareValue(a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
  }
}
