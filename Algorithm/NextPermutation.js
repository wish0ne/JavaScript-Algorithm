//순열을 최소값에서부터 증가하는 순으로 생성
function next_permutation(a) {
  let i = a.length - 1; //뒤쪽부터 탐색하여 교환위치(i-1) 찾기(i : 가장 높은 값)
  // i-1 < i인 경우 찾기
  while (i > 0 && a[i - 1] >= a[i]) {
    i -= 1;
  }
  if (i <= 0) return false; //i(가장 큰 값)<=0이면 마지막 순열까지 탐색 완료
  let j = a.length - 1; //뒤쪽부터 탐색하여 교환위치(i-1)와 교환할 교환위치보다 큰 값 위치(j)찾기
  while (a[j] <= a[i - 1]) {
    j -= 1;
  }

  [a[i - 1], a[j]] = [a[j], a[i - 1]]; //두 위치값 교환(i-1, j)

  //가장 큰 값 인덱스(i)부터 맨 뒤까지 오름차순 정렬 (이미 내림차순 되어있으므로 0부터 n-1 자리수를 각각 교환)
  j = a.length - 1;
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i += 1;
    j -= 1;
  }
  return true;
}
