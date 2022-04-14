function solution(n, t, m, timetable) {
  let bus = 9 * 60;
  timetable.sort(); //먼저온 사람 순
  let corn = 0; //콘이 버스 타는 시간

  //총 n번 버스가 옴
  let index = 0; //버스를 탄 사람 수
  for (let i = 0; i < n; i++) {
    //마지막 버스가 아니라면
    if (i !== n - 1) {
      //남아있다면 남은사람들 버스 태움
      let member = 0;
      //사람이 남아있지 않다면 그냥 버스 보냄
      while (timetable.length > 0) {
        const [hour, minute] = timetable[index].split(":");
        let crew = parseInt(hour) * 60 + parseInt(minute);
        if (crew <= bus) {
          member += 1; //버스탑승
          index += 1;
        } else break;
        if (member === m) break;
      }
    }

    //마지막 버스면 콘이 타야함
    else {
      //타야할 사람이 남아있고 탑승인원보다 많으면 콘이 먼저 타야함
      if (timetable.length - index >= m) {
        const [hour, minute] = timetable[index + m - 1].split(":");
        let crew = parseInt(hour) * 60 + parseInt(minute);
        if (bus < crew) corn = bus;
        else corn = crew - 1;
      } else {
        corn = bus;
      }
    }
    bus += t;
  }

  const corn_hour = parseInt(corn / 60)
    .toString()
    .padStart(2, "0");
  const corn_minute = parseInt(corn % 60)
    .toString()
    .padStart(2, "0");
  corn = `${corn_hour}:${corn_minute}`;
  return corn;
}

console.log(solution(1, 1, 1, ["23:59"]));

//solve
//케이스 하나 보고 수정하고, 하나보고 수정하고.. 명확한 알고리즘이 안떠올라서 구현이 어려웠음
