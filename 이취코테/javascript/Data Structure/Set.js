//집합 자료형은 단순히 특정한 데이터가 존재하는지 검사할때 매우 효과적으로 사용가능

const set1 = new Set([1, 2, 3, 4, 5]); //Set([iterable]). 반복가능한 객체가 주어질때 모두 Set에 추가됨
console.log(set1.has(1));
console.log(set1.has(6));

//Set 객체는 삽입 순서대로 요소 순회 가능
//Set 내 값은 한번만 나타날 수 있음

//----------Set 객체 사용
var mySet = new Set();

mySet.add(1); // Set { 1 }
mySet.add(5); // Set { 1, 5 }
mySet.add(5); // Set { 1, 5 }
mySet.add("some text"); // Set { 1, 5, 'some text' }
var o = { a: 1, b: 2 };
mySet.add(o);

mySet.add({ a: 1, b: 2 }); // o와 다른 객체를 참조하므로 괜찮음

mySet.has(1); // true
mySet.has(3); // false, 3은 set에 추가되지 않았음
mySet.has(5); // true
mySet.has(Math.sqrt(25)); // true
mySet.has("Some Text".toLowerCase()); // true
mySet.has(o); // true

mySet.size; // 5

mySet.delete(5); // set에서 5를 제거함
mySet.has(5); // false, 5가 제거되었음

mySet.size; // 4, 방금 값을 하나 제거했음
console.log(mySet); // Set {1, "some text", Object {a: 1, b: 2}, Object {a: 1, b: 2}}

//----------set 반복
// set 내 항목에 대해 반복
// 순서대로 항목을 (콘솔에) 기록: 1, "some text", {"a": 1, "b": 2}
for (let item of mySet) console.log(item);

// 순서대로 항목을 기록: 1, "some text", {"a": 1, "b": 2}
for (let item of mySet.keys()) console.log(item);

// 순서대로 항목을 기록: 1, "some text", {"a": 1, "b": 2}
for (let item of mySet.values()) console.log(item);

// 순서대로 항목을 기록: 1, "some text", {"a": 1, "b": 2}
// (여기서 key와 value는 같음)
for (let [key, value] of mySet.entries()) console.log(key);

// Set 객체를 배열 객체로 변환 (Array.from으로)
var myArr = Array.from(mySet); // [1, "some text", {"a": 1, "b": 2}]

// 다음도 HTML 문서에서 실행하는 경우 작동함
mySet.add(document.body);
mySet.has(document.querySelector("body")); // true

// Set과 Array 사이 변환
let mySet2 = new Set([1, 2, 3, 4]);
mySet2.size; // 4
[...mySet2]; // [1, 2, 3, 4]

// 교집합은 다음으로 흉내(simulate)낼 수 있음
var intersection = new Set([...set1].filter((x) => set2.has(x)));

// 차집합은 다음으로 흉내낼 수 있음
var difference = new Set([...set1].filter((x) => !set2.has(x)));

// forEach로 set 항목 반복
mySet.forEach(function (value) {
  console.log(value);
});

// 1
// 2
// 3
// 4

//----------기본 집합 연산 구현
Set.prototype.isSuperset = function (subset) {
  for (var elem of subset) {
    if (!this.has(elem)) {
      return false;
    }
  }
  return true;
};

Set.prototype.union = function (setB) {
  var union = new Set(this);
  for (var elem of setB) {
    union.add(elem);
  }
  return union;
};

Set.prototype.intersection = function (setB) {
  var intersection = new Set();
  for (var elem of setB) {
    if (this.has(elem)) {
      intersection.add(elem);
    }
  }
  return intersection;
};

Set.prototype.difference = function (setB) {
  var difference = new Set(this);
  for (var elem of setB) {
    difference.delete(elem);
  }
  return difference;
};

//Examples
var setA = new Set([1, 2, 3, 4]),
  setB = new Set([2, 3]),
  setC = new Set([3, 4, 5, 6]);

setA.isSuperset(setB); // => true
setA.union(setC); // => Set [1, 2, 3, 4, 5, 6]
setA.intersection(setC); // => Set [3, 4]
setA.difference(setC); // => Set [1, 2]

//----------array와의 관계
var myArray = ["value1", "value2", "value3"];

// Array를 Set으로 변환하기 위해서는 정규 Set 생성자 사용
var mySet = new Set(myArray);

mySet.has("value1"); // true 반환

// set을 Array로 변환하기 위해 전개 연산자 사용함.
console.log([...mySet]); // myArray와 정확히 같은 배열을 보여줌
