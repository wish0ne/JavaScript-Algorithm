import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const a = input[1].split(" ").map(Number);
const d = new Array(n).fill(1001);
d[0] = 0;
for (let i = 0; i < n; i++) {
  for (let j = 1; j <= a[i]; j++) {
    if (i + j >= n) break;
    d[i + j] = Math.min(d[i] + 1, d[i + j]);
  }
}
console.log(d[n - 1] === 1001 ? -1 : d[n - 1]);

//solve
//점화식을 비교적 쉽게 세울 수 있었다. O(NM)이여도 범위가 작아서 괜찮았음

//해설1
//D[i] : 1번칸에서 시작해서 i번째 칸에 도착할 수 있는 최소 점프 횟수
//어디서(j) i번째 칸에 올 수 있는지에 집중 -> 어디서 올 수 있는지 모르므로 모두 조사해봐야함
const d2 = new Array(n).fill(-1);
d2[0] = 0;
for (let i = 1; i < n; i++) {
  for (let j = 0; j < i; j++) {
    //j에서 i로 점프할 수 있는지 조사
    //j에 갈 수 없었으면(-1이였으면) j에서 i로 가는것도 불가능
    if (d2[j] !== -1 && i - j <= a[j]) {
      //i까지 도달하는 최소 점프 횟수 갱신
      if (d2[i] === -1 || d2[i] > d2[j] + 1) d2[i] = d2[j] + 1;
    }
  }
}
console.log(d2[n - 1]);

//해설2
//D[i] : 1번칸에서 시작해서 i번째 칸에 도착할 수 있는 최소 점프 횟수
//i번째 칸까지 도착했을때, i번째에서 어느 칸으로 갈 수 있는지에 집중
//-> i번째 칸에서 갈수있는칸은 a[i]개 뿐이므로, 해설1에 비해 시간 단축 가능
const d3 = new Array(n).fill(-1);
d3[0] = 0;
for (let i = 0; i < n - 1; i++) {
  //⭐i번째 칸에 갈 수 없다면 i번재 칸에서 점프하는것도 불가능하므로 이를 처리해줘야함
  if (d3[i] === -1) continue;
  //j : i에서 점프해서 이동할 수 있는 칸의 개수
  for (let j = 1; j <= a[i]; j++) {
    if (i + j >= n) break;
    //i+j번째 칸의 최소 점프 횟수 갱신
    if (d3[i + j] === -1 || d3[i + j] > d3[i] + 1) d3[i + j] = d3[i] + 1;
  }
}
console.log(d3[n - 1]);
