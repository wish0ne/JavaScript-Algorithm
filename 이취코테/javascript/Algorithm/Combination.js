//반복 없는 경우
const Combination = (arr, selectNum) => {
  //하나씩 선택하는 경우 각 원소를 배열에 넣은 배열 return
  if (selectNum === 1) return arr.map((a) => [a]);
  const results = []; //조합이 담길 배열
  arr.forEach((a, index) => {
    //작은 배열로 나눠서 조합을 구함.
    //배열을 앞에서부터 하나씩 잘라서 작은 배열로 만들고 거기서 하나를 제외한 조합을 구함. => 앞의 숫자를 고정한채로 조합을 구하는것.
    const smallerCombination = Combination(arr.slice(index + 1), selectNum - 1);
    smallerCombination.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
};

// const example = [1, 2, 3, 4];
// const result = Combination(example, 3);
// for (let i = 0; i < result.length; i++) {
//   console.log(result[i]);
// }

export default Combination;
