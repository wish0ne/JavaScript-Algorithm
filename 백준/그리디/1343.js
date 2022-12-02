import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

let board = input[0].split("");
let start = -1; //x 시작 인덱스
let end = -1; //x 종료 인덱스
let check = true;

function solution() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "X") {
      if (start < 0) start = i;
    } else if (board[i] === ".") {
      if (start >= 0) {
        end = i - 1;
        //덮기 시작
        check = calc(end, start, board);
        if (!check) return -1;
        start = -1;
      }
    }
  }
  //마지막 X 처리
  if (start >= 0) {
    end = board.length - 1;
    check = calc(end, start, board);
  }
  if (!check) return -1;
  return board.join("");
}

function calc(end, start, board) {
  let n = end - start + 1;
  if (n % 2 === 1) return false;
  //AAAA로 먼저 덮기
  for (let i = start; i < start + parseInt(n / 4) * 4; i++) {
    board[i] = "A";
  }
  //BB로 남은 부분 덮기
  for (let i = start + parseInt(n / 4) * 4; i <= end; i++) {
    board[i] = "B";
  }
  return true;
}

console.log(solution());

//solve
//이런 문제 항상 for문 밖에서 마지막 처리 해줘야하는거 주의하기

//참고할만한 풀이
//'XXXX'를 'AAAA'로 바꾸고 나서 남은 'XX'를 'BB'로 바꾼 뒤 'X'가 남아있으면 실패
//replaceAll은 ES2021에 추가된거 주의 (replace랑 정규식으로 replaceAll 구현가능)
let board2 = input[0].trim();
board2.replaceAll("XXXX", "AAAA");
board2.replaceAll("XX", "BB");
board2.includes("X") ? console.log(-1) : console.log(board);
