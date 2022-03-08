//food_times : 각 음식을 모두 먹는데 필요한 시간이 음식의 번호 순서대로 들어있는 배열
//k : 방송이 중단된 시간

function solution(food_times, k) {
  let foods = [];
  for (let i = 0; i < food_times.length; i++) {
    foods.push([food_times[i], i + 1]); //섭취 시간, 음식 번호
  }
  foods.sort((a, b) => a[0] - b[0]); //섭취 시간 기준으로 내림차순

  let time = 0;
  let last_idx = 0;
  let eat = 1;
  let n = foods.length;
  while (time <= k) {
    //한바퀴 돌 수 있으면
    if (parseInt((k - time) / (n - last_idx)) > 0) {
      time += n - last_idx;
      last_idx = foods.findIndex((food) => food[0] > eat); //남아있는 음식+ 1;
      eat += 1;
    }
    //한바퀴 돌 수 없으면
    else {
      foods = foods.slice(last_idx);
      foods.sort((a, b) => a[1] - b[1]); //번호 기준으로 오름차순

      return foods[k - time][1];
    }

    if (last_idx < 0) return -1;
  }
}

console.log(solution([3, 1, 2], 5)); //1

//정확성 테스트 통과, 효율성 테스트 미통과
//✔ 우선순위 큐를 사용할 생각 못했음. -> 배열에 넣고 정렬하는것보다 우선순위큐에 바로 넣자
//✔ 제일 적게 남은 음식의 양만큼 한번에 뺄 생각 못했음. -> 뭔가 최소 시간이 계속 1이라고 생각해서 하나씩 뺀듯..? 최소시간이 1000초라면 하나씩 빼면 너무 비효율적임

import Heap from "../Data Structure/Heap.js";

function solution2(food_times, k) {
  const heap = new Heap();
  for (let i = 0; i < food_times.length; i++) {
    heap.add([food_times[i], i + 1]); //섭취 시간, 음식 번호
  }

  let time = 0;
  let n = food_times.length;
  let prev_time = 0;

  while (time + n * (heap.heap[0][0] - prev_time) <= k) {
    let now = heap.poll(); //최소 시간
    time += n * (now[0] - prev_time);
    n -= 1;
    prev_time = now[0];
  }
  heap.heap.sort((a, b) => a[1] - b[1]);
  return heap.heap[(k - time) % n][1];
}

console.log(solution2([8, 6, 4], 15));
console.log(solution([3, 1, 2], 5)); //1
