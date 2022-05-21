//동영상 재생시간, 공익광고 재생시간, 시청자들의 재생구간 정보 배열
//누적재생시간이 가장 긴 구간에 공익광고 삽입
//시작시간 return
function solution(play_time, adv_time, logs) {
  let [h, m, s] = play_time.split(":");
  let play = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
  [h, m, s] = adv_time.split(":");
  let adv = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);

  const playList = new Array(play).fill(0); //전체 동영상 재생구간을 배열로 설정
  logs.forEach((log) => {
    let [start, end] = log.split("-");
    [h, m, s] = start.split(":");
    start = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
    [h, m, s] = end.split(":");
    end = parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
    playList[start] += 1;
    playList[end] += -1;
  });

  //해당 시간의 시청자 수 구하기
  for (let i = 1; i < play; i++) {
    playList[i] += playList[i - 1];
  }

  //해당 시간의 누적 재생 횟수 구하기
  for (let i = 1; i < play; i++) {
    playList[i] += playList[i - 1];
  }

  //초기 최다 누적 재생 횟수
  let sum = playList[adv - 1];
  //초기인덱스(시작시간)
  let idx = 0;

  for (let i = adv - 1; i < play; i++) {
    //현재 최다 누적 재생 횟수보다 다음구간의 재생횟수가 더 큰 경우 갱신
    if (sum < playList[i] - playList[i - adv]) {
      sum = playList[i] - playList[i - adv];
      idx = i - adv + 1;
    }
  }

  // logs_arr.push([0, 0]);
  // logs_arr.push([play, 1]);
  // logs_arr.sort((a, b) => a[0] - b[0]);

  // logs_arr.forEach((log) => console.log(log));

  //구간 별 누적재생시간 계산
  // const acc_time = [];
  // let time = 0;
  // logs_arr.forEach((log, index) => {
  //   //start
  //   if (log[1] === 0) {
  //     time += log[0];
  //   } else {
  //     acc_time.push(time);
  //     time -= log[0];
  //   }
  // });
  // console.log(acc_time);

  // const acc_time = [0];
  // let playing_count = 1;
  // for (let i = 2; i < logs_arr.length; i++) {
  //   acc_time.push((logs_arr[i][0] - logs_arr[i - 1][0]) * playing_count);
  //   if (logs_arr[i][1] === 0) playing_count += 1; //start
  //   else playing_count -= 1; //end
  // }
  // logs_arr.forEach((log) => {
  //   if (log[1] === 0) playing_count += 1; //start
  //   else playing_count -= 1; //end
  //   log.push(playing_count);
  // });
  // logs_arr.forEach((log) => console.log(log));

  //누적 재생시간이 가장 큰 부분을 포함하는 경우들 비교
  // let max = 0;
  // let max_time = 0;
  // for (let i = 0; i < logs_arr.length; i++) {
  //   let temp = logs_arr[i][0] + adv;
  //   if (temp > play) break;
  //   let count = 0;
  //   for (let j = i; j < logs_arr.length; j++) {
  //     if (logs_arr[j][0] > temp) break;
  //     else count += logs_arr[j][2];
  //   }
  //   if (max < count) {
  //     max = count;
  //     max_time = i === 0 ? 0 : logs_arr[i][0];
  //   }
  //   if (max === count && i === 1) {
  //     max = count;
  //     max_time = logs_arr[i][0];
  //   }
  //   console.log(count);
  // }

  //누적재생시간 최대 구간 찾기
  // let max_time = 0;
  // let max = 0;
  // //start
  // for (let i = 0; i < logs_arr.length; i++) {
  //   let temp_acc = 0;
  //   let temp_time = 0;
  //   for (let j = i + 1; j < logs_arr.length; j++) {
  //     temp_time += logs_arr[j][0];
  //     temp_acc += acc_time[j - 1];
  //     //누적 시간 계산
  //     if (temp_time > adv) {
  //       if (temp_acc > max) {
  //         max = temp_acc;
  //         max_time = logs_arr[i][0];
  //       }
  //       break;
  //     }
  //   }
  // }
  // console.log(max_time);

  let max_hour = parseInt(idx / 3600)
    .toString()
    .padStart(2, "0");
  let max_min = parseInt((idx - max_hour * 3600) / 60)
    .toString()
    .padStart(2, "0");
  let max_sec = (idx % 60).toString().padStart(2, "0");
  return `${max_hour}:${max_min}:${max_sec}`;
}

//unsolved
//누적합 문제!
//구간별로 시청자 수 생각해서 계산하려니까 어려웠음
//1초마다 생각하면 더 간단하게 생각해볼 수 있었는데 아쉽다

console.log(
  solution("02:03:55", "00:14:15", [
    "01:20:15-01:45:14",
    "00:40:31-01:00:00",
    "00:25:50-00:48:29",
    "01:30:59-01:53:29",
    "01:37:44-02:02:30",
  ])
);
