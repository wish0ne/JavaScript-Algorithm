//시간초과
function solution1(numbers) {
  const answer = [];
  numbers.forEach((number) => {
    let dec = number.toString(2);
    let count = 0;
    let idx = 0;
    while (true) {
      idx += 1;
      count = 0;
      let ndec = (number + idx).toString(2);
      dec = dec.padStart(ndec.length, "0");
      for (let i = 0; i < dec.length; i++) {
        if (dec[i] !== ndec[i]) count += 1;
        if (count > 2) break;
      }
      if (count > 2) continue;
      else {
        answer.push(parseInt(ndec, 2));
        break;
      }
    }
  });
  return answer;
}

function solution(numbers) {
  const answer = [];
  numbers.forEach((number) => {
    let dec = number.toString(2);
    dec = dec.padStart(dec.length + 1, "0").split("");
    let count = 0;
    let idx = 0;
    for (let i = dec.length - 1; i >= 0; i--) {
      if (dec[i] === "0") {
        dec[i] = "1";
        count += 1;
        idx = i;
        break;
      }
    }
    for (let i = idx + 1; i < dec.length; i++) {
      if (dec[i] === "1") {
        dec[i] = "0";
        count += 1;
        break;
      }
    }
    answer.push(parseInt(dec.join(""), 2));
  });
  return answer;
}

console.log(solution([3, 4, 5]));

//solve
//간단한 구현문제였는데 왜 빨리 못풀어...🥺😭
