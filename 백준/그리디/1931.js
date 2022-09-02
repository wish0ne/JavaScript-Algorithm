import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const times = [];
for (let i = 1; i <= n; i++) {
  times.push(input[i].split(" ").map(Number));
}

times.sort((a, b) => {
  if (a[0] !== b[0]) return a[0] - b[0];
  else return a[1] - b[1];
});

let count = 0; //최대 회의 개수
let time = 0; //현재 시간
let cur = 0; //현재 확인해야할 배열의 인덱스
let end = times[n - 1][1] + 1; //현재 선택한 회의의 마치는 시간

//1시간마다 확인
while (time <= times[n - 1][1]) {
  //회의가 종료됨
  if (time === end) {
    count += 1;
    end = times[n - 1][1] + 1;
  }

  //현재 시간에 가능한 회의들 비교
  while (cur < n && times[cur][0] === time) {
    //종료시간이 가장 짧은것 선택
    if (times[cur][1] <= end) {
      end = times[cur][1];
    }
    //회의가 시작하자마자 종료
    if (time === end) {
      count += 1;
      end = times[n - 1][1] + 1;
    }
    cur += 1;
  }

  time += 1;
}

console.log(count);

//실패 3번...
//그리디 : 현재 시간에서 시작할 수 있는 회의 중에서 가장 빨리 끝나는걸 항상 선택
//1) 회의가 시작하자마자 종료되는 경우 고려안함
//2) "한 회의가 끝나는것과 동시에 다음 회의가 시작될 수 있다" -> 회의가 시작하자마자 종료되는 조건을 while문 안에서 고려해야함
//그리디는 정말 아직까지 끼워맞추는 느낌이다... 확신없이 끼워맞추는 느낌

//해설
//그리디 : 빨리 끝나는 회의부터 선택
const meeting = [];
for (let i = 1; i <= n; i++) {
  meeting.push(input[i].split(" ").map(Number));
}

//끝시간이 빠른것부터, 같으면 시작시간이 빠른것부터 정렬
//시작시간과 끝시간이 같을 수 있음 -> 회의가 (1,1) (1,2) (1,1) (2,2) (2,2) 있으면 정답은 5
//따라서 끝시간이 같을때 시작시간이 빠른것부터 정렬하는것 필수 (참고 : https://www.acmicpc.net/board/view/98026)
meeting.sort((a, b) => {
  if (a[1] !== b[1]) return a[1] - b[1];
  else return a[0] - b[0];
});

let now = 0; //회의가 끝난 시간
let ans = 0; //정답
meeting.forEach((p) => {
  //회의 시작
  if (now <= p[0]) {
    now = p[1];
    ans += 1;
  }
});

console.log(ans);
