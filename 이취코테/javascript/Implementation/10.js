//key 회전 함수
function rotation(key) {
  const new_key = [];
  for (let i = 0; i < key.length; i++) new_key.push([]);
  for (let i = key.length - 1; i >= 0; i--) {
    for (let j = 0; j < key.length; j++) {
      new_key[j].push(key[i][j]);
    }
  }
  return new_key;
}

//lock에 key를 더하는 함수
function lockPlusKey(x, y, key, new_lock, m) {
  for (let i = x; i < x + m; i++) {
    for (let j = y; j < y + m; j++) {
      new_lock[i][j] += key[i - x][j - y];
    }
  }
  return new_lock;
}

//lock이 모두 1인지 확인하는 함수(모두 1이여야 true)
function unLock(new_lock, m, n) {
  for (let i = m - 1; i <= m + n - 2; i++) {
    for (let j = m - 1; j <= m + n - 2; j++) {
      if (new_lock[i][j] !== 1) return false;
    }
  }
  return true;
}

function solution(key, lock) {
  const m = key.length;
  const n = lock.length;

  //크기가 2m+n-2인 정사각행렬 생성 (index는 0 ~ 2m+n-3)
  let new_lock = new Array(2 * m + n - 2)
    .fill()
    .map(() => new Array(2 * m + n - 2).fill(0));

  //키 최대 3번 회전 가능
  for (let r = 0; r < 4; r++) {
    //key 옮기면서 unlock되는지 확인 (key가 움직이는 인덱스 : 0 ~ m + n -2)
    for (let i = 0; i <= m + n - 2; i++) {
      for (let j = 0; j <= m + n - 2; j++) {
        //가운데에 lock 넣음.
        //lock의 인덱스 : m-1 ~ (2m+n-2)-m
        for (let i = m - 1; i <= m + n - 2; i++) {
          for (let j = m - 1; j <= m + n - 2; j++) {
            new_lock[i][j] = lock[i - m + 1][j - m + 1];
          }
        }
        //key를 더한 합이 모두 1이 되면 true
        if (unLock(lockPlusKey(i, j, key, new_lock, m), m, n)) {
          return true;
        }
      }
    }
    key = rotation(key);
  }
  return false;
}

console.log(
  solution(
    [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
    ],
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ]
  )
);

//key를 lock에 더해서 1이 되는지 확인한다는 알고리즘은 잘 생각했으나... 그걸 구현못함!!!
//index를 조절해서 잘 더해보려고 했는데 도저히 안되더라 ㅠ ⭐padding⭐을 이용하는 방법 새롭게 알아가기
//알고리즘 생각할때 또!! 완전탐색방법이라 시간초과날것같아서 머뭇댔는데 1000만번 이하라면 완전탐색 바로 사용하자
