//문자열 처리 능력
//시간 계산
function solution(fees, records) {
  //✔차량번호 범위가 0000~9999이므로 배열 설정해서 관리
  const in_time = new Array(10000).fill(-1); //입차 시간
  const total_time = new Array(10000).fill(0); //누적 주차 시간

  //누적 주차 시간 계산
  records.forEach((record) => {
    let [time, id, type] = record.split(" ");
    id = parseInt(id);
    if (type === "IN") in_time[id] = time; //입차
    else if (type === "OUT") {
      let [sh, sm] = in_time[id].split(":").map(Number); //입차시간
      let [eh, em] = time.split(":").map(Number); //출차시간
      let t = eh * 60 + em - (sh * 60 + sm);
      total_time[id] += t; //누적시간에 더하기
      in_time[id] = -1; //입차시간 리셋
    }
  });
  //출차하지 않은 차량 처리
  for (let i = 0; i < 10000; i++) {
    if (in_time[i] !== -1) {
      let [sh, sm] = in_time[i].split(":").map(Number); //입차시간
      let t = 23 * 60 + 59 - (sh * 60 + sm);
      total_time[i] += t;
    }
  }

  let answer = [];
  for (let time of total_time) {
    if (time === 0) continue;
    if (time <= fees[0]) answer.push(fees[1]);
    else {
      let fee = Math.ceil((time - fees[0]) / fees[2]) * fees[3];
      answer.push(fees[1] + fee);
    }
  }
  return answer;
}

//fees : 주차요금
//records : 입출차 내역
function solution_my(fees, records) {
  const map = new Map(); //차량 별 입출차 시간
  const all = new Map(); //차량 별 누적 주차 시간

  records.forEach((record) => {
    const [time, id, type] = record.split(" ");
    let prev_time = map.get(id);
    if (prev_time === undefined) map.set(id, time); //입차
    //출차
    else {
      let [sh, sm] = prev_time.split(":").map(Number);
      let [eh, em] = time.split(":").map(Number);
      let t = eh * 60 + em - (sh * 60 + sm);
      let temp = all.get(id);
      if (temp) all.set(id, temp + t);
      else all.set(id, t);
      map.delete(id);
    }
  });
  //미출차 시간 계산
  for (let entry of map) {
    let [id, intime] = entry;
    let [sh, sm] = intime.split(":").map(Number);
    if (intime !== undefined) {
      let t = 23 * 60 + 59 - (sh * 60 + sm);
      let temp = all.get(id);
      if (temp) all.set(id, temp + t);
      else all.set(id, t);
    }
  }
  const fee = new Map(); //차량 별 주차요금
  for (let entry of all) {
    const [id, t] = entry;
    //기본요금
    if (all.get(id) <= fees[0]) {
      fee.set(id, fees[1]);
    }
    //기본요금 + 단위요금
    else {
      let temp = fee.get(id);
      let n = Math.ceil((t - fees[0]) / fees[2]) * fees[3];
      if (temp) fee.set(id, temp + n);
      else fee.set(id, fees[1] + n);
    }
  }

  //map to array
  const answer = [];
  for (let entry of fee) {
    const [id, f] = entry;
    answer.push([id, f]);
  }

  answer.sort((a, b) => a[0] - b[0]);
  const result = [];
  answer.forEach((a) => result.push(a[1]));
  return result;
}

console.log(
  solution(
    [180, 5000, 10, 600],
    [
      "05:34 5961 IN",
      "06:00 0000 IN",
      "06:34 0000 OUT",
      "07:59 5961 OUT",
      "07:59 0148 IN",
      "18:59 0000 IN",
      "19:09 0148 OUT",
      "22:59 5961 IN",
      "23:00 5961 OUT",
    ]
  )
);
