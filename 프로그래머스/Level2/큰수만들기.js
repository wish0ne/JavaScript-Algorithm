function solution(number, k) {
  let count = 0;
  let arr = number.split("").map((n) => Number(n));
  let i = 1;
  let answer = [arr[0]];
  while (count < k && i < arr.length) {
    if (answer[answer.length - 1] < arr[i]) {
      answer.pop();
      count += 1;
    } else {
      answer.push(arr[i]);
      i += 1;
    }
    if (answer.length === 0) {
      answer.push(arr[i]);
      i += 1;
    }
  }
  //다 제거하고 남은 숫자들 연결
  if (answer.length < number.length - k) {
    answer = answer.concat(arr.slice(i));
  }
  //더 제거해야하면 뒤를 자름(앞은 가장 큰 수 완성되어있음)
  if (count < k) {
    answer = answer.slice(0, answer.length - (k - count));
  }

  return answer.join("");
}

//시간초과
function solution1(number, k) {
  let count = 0;
  let arr = number.split("").map((n) => Number(n));
  let i = 0;
  while (count < k && i < arr.length - 1) {
    if (arr[i] < arr[i + 1]) {
      arr.splice(i, 1);
      count += 1;
      if (i > 0) i -= 1;
    } else {
      i += 1;
    }
  }
  if (count < k) {
    arr = arr.slice(0, arr.length - (k - count));
  }
  return arr.join("");
}

//쉬운문제였는데...겨우 solve
//앞에서부터 하나씩 체크하는 그리디 문제(그리디 연습필요)
//배열을 하나씩 slice하는게 스택을 매번 push pop하는것보다 시간소요 엄청 큼

//console.log(solution("1924", 2));
//console.log(solution("4177252841", 4));
console.log(solution("987654", 4));
