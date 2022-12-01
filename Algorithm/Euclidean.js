/**
 * 최대공약수 구하기 위한 유클리드 알고리즘 재귀 버전
 * 최대공약수를 구할 두 숫자 a,b는 양의 정수여야함
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function Euclidean(a, b) {
  //a % b를 r이라고 할때, a와 b의 최대공약수는 b와 r의 최대공약수와 같다는 성질 이용
  //나머지가 0이 되었을때 그 몫이 a와 b의 최대공약수
  return b === 0 ? a : Euclidean(b, a % b);
}

export default Euclidean;
