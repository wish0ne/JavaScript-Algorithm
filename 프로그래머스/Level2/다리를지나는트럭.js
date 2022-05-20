function solution(bridge_length, weight, truck_weights) {
  const bridge = [];
  let time = 0;

  let bridge_weight = 0;
  let bridge_count = 0;
  let last_time = 0;

  function check() {
    //다리를 건넌 트럭 제외
    if (time >= last_time) {
      let last = bridge.shift();
      bridge_weight -= last.truck;
      bridge_count -= 1;
      if (bridge.length !== 0) last_time = bridge[0].time + bridge_length - 1;
    }
  }
  for (let i = 0; i < truck_weights.length; i++) {
    while (
      bridge_weight + truck_weights[i] > weight ||
      bridge_count > bridge_length
    ) {
      time += 1;
      //다리를 건넌 트럭 제외
      check();
    }
    time += 1;
    //새 트럭 출발
    bridge.push({ truck: truck_weights[i], time });
    console.log(truck_weights[i], time);
    bridge_weight += truck_weights[i];
    bridge_count += 1;
    if (bridge.length === 1) last_time = bridge[0].time + bridge_length - 1;
    //다리를 건넌 트럭 제외
    check();
  }
  time += bridge_length - (time - bridge[bridge.length - 1].time);

  return time;
}

console.log(solution(2, 10, [7, 4, 5, 6]));
console.log(solution(100, 100, [10]));

//solve
//열심히 구현..
