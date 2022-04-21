function solution(priorities, location) {
  const priorities_index = priorities.map((priority, index) => [
    priority,
    index,
  ]);

  let print_index = -1;
  let number = 0;
  priorities.sort((a, b) => a - b);
  while (print_index !== location) {
    const [priority, index] = priorities_index.shift();
    if (priority >= priorities[priorities.length - 1]) {
      print_index = index;
      priorities.pop();
      number += 1;
    } else priorities_index.push([priority, index]);
  }
  return number;
}

console.log(solution([2, 1, 3, 2], 2));

//solve
//n=100이라서 시간 상관없이 푼 문제
