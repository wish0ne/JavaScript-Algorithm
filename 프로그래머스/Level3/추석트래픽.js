function solution(lines) {
  const timesArr = [];
  for (let line of lines) {
    const str = line.split(" ");
    //시간 초로 변환
    let endTime = 0;
    const times = str[1].split(":");
    endTime += parseInt(times[0]) * 3600;
    endTime += parseInt(times[1]) * 60;
    endTime += parseFloat(times[2]);

    //소요시간 초로 변환
    let time = parseFloat(str[2].split("s"));

    //✔ javascript 소수점 오류
    let startTime = parseFloat((endTime - time + 0.001).toFixed(3));
    timesArr.push([startTime, endTime]);
  }
  //for (let arr of timesArr) console.log(arr);

  let maxThroughput = 0;
  for (let i = 0; i < timesArr.length; i++) {
    let temp = 0;
    //시작타임으로부터 1초시작
    for (let j = 0; j < timesArr.length; j++) {
      if (
        (timesArr[j][1] >= timesArr[i][0] &&
          timesArr[j][1] <=
            parseFloat((timesArr[i][0] + 1 - 0.001).toFixed(3))) ||
        (timesArr[j][0] >= timesArr[i][0] &&
          timesArr[j][0] <=
            parseFloat((timesArr[i][0] + 1 - 0.001).toFixed(3))) ||
        (timesArr[j][0] <= timesArr[i][0] &&
          timesArr[j][1] >= parseFloat((timesArr[i][0] + 1 - 0.001).toFixed(3)))
      ) {
        temp += 1;
      }
    }

    maxThroughput = Math.max(maxThroughput, temp);

    //종료타임으로부터 1초 시작
    temp = 0;
    for (let j = 0; j < timesArr.length; j++) {
      if (
        (timesArr[j][1] >= timesArr[i][1] &&
          timesArr[j][1] <=
            parseFloat((timesArr[i][1] + 1 - 0.001).toFixed(3))) ||
        (timesArr[j][0] >= timesArr[i][1] &&
          timesArr[j][0] <=
            parseFloat((timesArr[i][1] + 1 - 0.001).toFixed(3))) ||
        (timesArr[j][0] <= timesArr[i][1] &&
          timesArr[j][1] >= parseFloat((timesArr[i][1] + 1 - 0.001).toFixed(3)))
      ) {
        temp += 1;
      }
    }

    maxThroughput = Math.max(maxThroughput, temp);
  }
  return maxThroughput;
}

console.log(
  solution(["2016-09-15 01:00:04.002 2.0s", "2016-09-15 01:00:07.000 2s"])
);

//테스트 3개 실패 ~> 찾는 조건 부족
//✔javascript 소수점 오류 : 10진수를 2진수로 바꿔서 연산하고 다시 10진수로 바꾸는 과정에서 오차가 발생(0.00000000000000004)
//toFixed(), Math.round()를 사용해서 해결
//✔테스트 3개 실패한 이유 : 조건 하나 부족했음
//총 3가지 케이스를 찾아냈어야 하는데 3번을 고려안함
//1. 요청시작시간이 t안에 있을때
//2. 요청완료시간이 t안에 있을때
//3. 요청시작시간과 완료시간이 t범위를 감싸고 있을때
