function solution(w, h) {
  let gradient = h / w;
  let remove = Math.ceil(gradient);
  let temp = gradient;
  let i = 1;
  while (temp < h) {
    let prev = temp;
    //나누어 떨어지면
    if (temp % 1 === 0) {
      break;
    }
    i += 1;
    temp = (i * h) / w; // ✔ 오답 원인 : temp += gradient하게되면 소수점때문에 원하는 값과 달라짐.
    //소수점 뒤에가 잘리기 때문에 완벽하게 더해지지 않음. 따라서 곱하는걸로 풀어야 정확함
    remove += Math.ceil(temp) - Math.ceil(prev) + 1;
    console.log(remove, temp);
  }
  if (temp < h) {
    remove += parseInt(remove * (h / temp)) - remove;
  }
  return w * h - remove;
}

console.log(solution(7, 3));
