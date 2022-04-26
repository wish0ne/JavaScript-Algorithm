function solution(numbers) {
  const number = numbers.split("").map(Number);
  let answer = 0;
  const set = new Set();
  for (let i = 1; i <= number.length; i++) {
    const permutation = Permutation(number, i);
    permutation.forEach((ele) => {
      let temp = parseInt(ele.join(""));

      if (!set.has(temp)) {
        set.add(temp);
        if (is_prime_number(temp)) {
          console.log(temp);
          answer += 1;
        }
      }
    });
  }
  return answer;
}

function is_prime_number(x) {
  if (x < 2) return false;
  // 2부터 x의 제곱근까지 모든 수를 확인하며
  for (let i = 2; i < parseInt(Math.sqrt(x)) + 1; i++) {
    //x가 해당 수로 나누어떨어진다면
    if (x % i === 0) return false; //소수가 아님
  }
  return true; //소수임
}

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

console.log(solution("17"));
console.log(solution("011"));
//console.log(solution("2"));

//solve
