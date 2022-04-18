function Permutation(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((v) => [v]);

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = Permutation(rest, selectNumber - 1);
    const attached = permutations.map((permutation) => [fixed, ...permutation]);
    results.push(...attached);
  });

  return results;
}

function solution(expression) {
  expression = expression.split("");
  const set = new Set();
  const parsing_operation = [];
  const parsing_number = [];
  let temp = "";
  for (let exp of expression) {
    if (isNaN(parseInt(exp))) {
      set.add(exp);
      parsing_operation.push(exp);
      parsing_number.push(parseInt(temp));
      temp = "";
    } else temp += exp;
  }
  parsing_number.push(parseInt(temp));
  console.log(parsing_number, parsing_operation);
  const operators = Array.from(set);
  const ranking = Permutation(operators, operators.length);
  let maxScore = 0;
  //ex) [-, +, *]
  for (let rank of ranking) {
    let temp_number = [...parsing_number];
    let temp_operation = [...parsing_operation];
    //ex) -
    for (let operation of rank) {
      //-연산 모두 수행
      while (temp_operation.includes(operation)) {
        let i = temp_operation.findIndex((op) => op === operation);
        let result = calculate(operation, temp_number[i], temp_number[i + 1]);
        temp_number[i] = result;
        temp_number.splice(i + 1, 1);
        temp_operation.splice(i, 1);
      }
    }
    maxScore = Math.max(Math.abs(temp_number[0]), maxScore);
  }

  return maxScore;
}

function calculate(op, left, right) {
  switch (op) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
  }
}

console.log(solution("100-200*300-500+20"));

//not solve
//연산자 순위를 순열로 구하는건 쉬운데 계산을 어떻게 해야할지 아예 감이 안왔음..
//사실 연산자 3개니까 순열도 6개고, expression도 길이가 최대 100이므로 O(n^3)으로 풀어도 되는거였음!!
//배열 중간 원소들 삭제하는데 시간 오래걸릴까봐 안했는데 그냥 splice하면 되는거였음
//실제 시험칠때는 이렇게 쉬운 문제를 고민한다고 오래잡으면 안됨..ㅠㅠ
//다시한번 문제조건 잘읽자..
