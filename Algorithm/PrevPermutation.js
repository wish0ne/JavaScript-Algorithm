//순열을 최대값에서부터 감소하는 순서로 생성
function prev_permutation(a) {
  let i = a.length - 1;
  while (i > 0 && a[i - 1] <= a[i]) {
    i -= 1;
  }
  if (i <= 0) return false;
  let j = a.length - 1;
  while (a[j] >= a[i - 1]) j -= 1;

  [a[i - 1], a[j]] = [a[j], a[i - 1]];

  j = a.length - 1;
  while (i < j) {
    [a[i], a[j]] = [a[j], a[i]];
    i += 1;
    j -= 1;
  }
  return true;
}
