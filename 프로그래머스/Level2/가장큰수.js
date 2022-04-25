function solution(numbers) {
  numbers.sort((a, b) => {
    let as = a.toString();
    let bs = b.toString();
    if (as + bs < bs + as) return 1;
    else return -1;
    // if (as.length > bs.length) {
    //   for (let i = 0; i < bs.length; i++) {
    //     if (as[i] > bs[i]) return -1;
    //     else if (as[i] < bs[i]) return 1;
    //   }
    //   if (as[1] <= bs[0]) return 1;
    //   else return 1;
    // } else {
    //   for (let i = 0; i < as.length; i++) {
    //     if (as[i] > bs[i]) return -1;
    //     else if (as[i] < bs[i]) return 1;
    //   }
    //   if (bs[1] <= as[0]) return 1;
    //   else return -1;
    // }
  });
  console.log(numbers);
  let answer = numbers.join("");
  if (answer[0] === "0") return "0";
  //   answer = numbers.reduce((prev, curr) => {
  //     prev = prev.toString();
  //     curr = curr.toString();
  //     if (prev === "0") return curr;
  //     else return prev + curr;
  //   });
  return answer;
}

console.log(solution([40, 404]));
console.log(solution([10, 100]));
//40, 404 -> 40404 vs 40440 (404가 먼저)
//12, 121-> 12112 vs 12121 (121가 먼저)
//10, 100 ->10100 vs 10010(10이 먼저)

//진짜 바보인듯..반례 찾느라 고생했는데 그냥
//숫자 두개를 앞에서부터 하나하나 비교하지말고, 그냥 숫자 두개가 합쳐져서 만드는 숫자 자체를 비교하면
//여러 조건들 고려할 필요없이 걍 되는데 바보같이 어렵게 붙잡고 있네
//javascript method들만 잘 이해해도 진짜 코테 반을 풀수있을듯 바보같은나

//javascript sort의 compareFunction에서 a,b는 순서대로 들어가는줄 알았는데 아니였음
//a와 b는 심지어 양옆에 붙어있는 숫자도 아닐수도 있음. 자바스크립트 엔진 마음대로여서 순서대로라고 생각하면 안됨
