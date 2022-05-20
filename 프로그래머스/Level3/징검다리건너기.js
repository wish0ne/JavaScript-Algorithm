//1. 구간합 알고리즘 이용한 풀이 : 정확성 통과 효율성 미통과 (런타임 에러가 너무 복잡도가 커서 나는듯?)
function solution(stones, k) {
  let count = 1;
  let update = stones.map((stone) => (stone -= count));
  let max = 200000000;
  while (count <= max) {
    const prefix_sum = prefixSum(update);
    for (let i = 0; i <= update.length - k; i++) {
      if (prefix_sum[i + k] - prefix_sum[i] === 0) {
        return count;
      }
    }
    count += 1;
    update = update.map((u) => {
      if (u === 0) return u;
      else return (u -= 1);
    });
  }
}

function prefixSum(data) {
  let sum_value = 0;
  let prefix_sum = [0];
  for (let i of data) {
    sum_value += i;
    prefix_sum.push(sum_value);
  }
  return prefix_sum;
}

//2. 이진탐색 이용한 풀이(파라메트릭 서치)
function solution(stones, k) {
  //✔Math.min, max를 이용했더니 런타임에러가 났다(시간초과 때문인듯) min, max대신 주어진 값의 범위를 활용하여 최소 최대값을 지정하면 시간을 단축할 수 있다!
  let start = 1;
  let end = 200000000;

  let answer = end;
  while (start <= end) {
    let mid = parseInt((start + end) / 2); //mid : 최대 건널 수 있는 명 수
    //조건 만족 여부 확인
    //✔이부분 생략가능했음 -> 비교할때 0인지가 아니라 mid보다 작은지 비교하면됨
    // let temp = stones.map((stone) => {
    //   stone -= mid;
    //   return stone < 0 ? 0 : stone;
    // });
    let flag = true;
    let count = 0;
    for (let i = 0; i < stones.length; i++) {
      if (stones[i] < mid) count += 1;
      else count = 0;
      //✔k이상이면 못건너는건데 초과면 못건너는줄 알고 삽질..
      if (count >= k) {
        flag = false;
        break;
      }
    }
    //더 건널 수 있는 경우
    if (flag) {
      answer = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return answer;
}

//구간합 알고리즘으로 풀기 전에, 복잡도가 2,000,000,000이 넘음을 알아채고 다른 알고리즘을 생각해봤어야함
//⭐⭐터무니없는 큰 복잡도를 해결해야 하면 항상 이진탐색(파라메트릭 서치) or dp를 떠올리자!!⭐⭐
//그리고 Math.max, min을 사용하지 않는거나, 배열을 복사해서 순회안해도 조건확인할 수 있는 등 더 시간을 줄일 수 있는 효율적인 풀이를 해보려고 노력하자...!

console.log(solution1([1, 2, 3, 4], 2));
