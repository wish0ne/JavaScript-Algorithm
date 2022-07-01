function solution(line) {
  //교점 구하기
  const stars = [];
  for (let i = 0; i < line.length - 1; i++) {
    for (let j = i + 1; j < line.length; j++) {
      const [a, b, e] = line[i];
      const [c, d, f] = line[j];
      let x = (b * f - e * d) / (a * d - b * c);
      let y = (e * c - a * f) / (a * d - b * c);
      if (Number.isInteger(x) && Number.isInteger(y)) stars.push([x, y]);
    }
  }

  //최소 사각형 길이 구하기
  //가로(x)
  stars.sort((a, b) => a[0] - b[0]);
  let minX = stars[0][0];
  let width = stars[stars.length - 1][0] - stars[0][0] + 1;
  //세로(y)
  stars.sort((a, b) => a[1] - b[1]);
  let maxY = stars[stars.length - 1][1];
  let height = stars[stars.length - 1][1] - stars[0][1] + 1;

  //사각형 생성
  const square = new Array(height);
  for (let i = 0; i < height; i++) square[i] = new Array(width).fill(".");

  //별찍기
  //(0,0) -> (minX, minY)
  stars.forEach((star) => {
    const [x, y] = star;
    square[maxY - y][x - minX] = "*";
  });

  const answer = [];
  square.forEach((line) => answer.push(line.join("")));
  return answer;
}

//solve
//간단 구현 문제
