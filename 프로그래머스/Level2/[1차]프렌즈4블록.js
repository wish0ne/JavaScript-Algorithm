function solution(m, n, board) {
  for (let i = 0; i < m; i++) board[i] = board[i].split("");
  print(board);
  console.log("\n");

  let count = 0;

  //check
  const check = (x, y, set) => {
    let char = board[x][y];
    if (
      board[x + 1][y] === char &&
      board[x][y + 1] === char &&
      board[x + 1][y + 1] === char
    ) {
      set.add(`${x}-${y}`);
      set.add(`${x + 1}-${y}`);
      set.add(`${x}-${y + 1}`);
      set.add(`${x + 1}-${y + 1}`);
      return true;
    }
  };

  //remove
  const remove = (set, cnt) => {
    for (let item of set) {
      const [x, y] = item.split("-").map(Number);
      board[x][y] = null;
      cnt += 1;
    }
    return cnt;
  };

  //update
  const update = () => {
    for (let j = 0; j < n; j++) {
      let end = true;
      while (end) {
        end = false;
        for (let i = 1; i < m; i++) {
          if (!board[i][j] && board[i - 1][j]) {
            board[i][j] = board[i - 1][j];
            board[i - 1][j] = null;
            end = true;
          }
        }
      }
    }
  };

  while (true) {
    //check
    let set = new Set();
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (board[i][j]) {
          check(i, j, set);
        }
      }
    }
    //remove
    let cnt = remove(set, count);
    if (cnt === count) return count;
    else count = cnt;
    print(board);
    console.log("remove \n");

    //update
    update();
    print(board);
    console.log("\n");
  }
}

function print(board) {
  for (let i = 0; i < board.length; i++) console.log(board[i]);
}

//console.log(solution(4, 5, ["CCBDE", "AAADE", "AAABF", "CCBBF"]));
console.log(
  solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
);

//solve
//일반적인 구현문제
//블록 위치를 업데이트할때 배열을 90도 회전시키면 자연스럽게 해결됨
