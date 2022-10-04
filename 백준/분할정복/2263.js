import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);
const inorder = input[1].split(" ").map(Number);
const postorder = input[2].split(" ").map(Number);
const preorder = [];

const inorder_sort = inorder.map((v, i) => [v, i]);
inorder_sort.sort((a, b) => a[0] - b[0]);

function go(left_post, right_post, left_in, right_in) {
  //postorder의 맨 끝이 root
  let root = postorder[right_post];
  preorder.push(root);

  //inorder에서 root를 중심으로 left subtree / right subtree 분할 가능
  let index = binary_search(0, n - 1, root);
  if (index < 0) return;

  if (left_post <= left_post + index - left_in - 1 && left_in <= index - 1)
    go(left_post, left_post + index - left_in - 1, left_in, index - 1); //left
  if (left_post + index - left_in <= right_post - 1 && index + 1 <= right_in)
    go(left_post + index - left_in, right_post - 1, index + 1, right_in); //right
}

function binary_search(start, end, target) {
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (inorder_sort[mid][0] === target) return inorder_sort[mid][1];
    else if (inorder_sort[mid][0] > target) end = mid - 1;
    else start = mid + 1;
  }
  return -1;
}

go(0, n - 1, 0, n - 1);
console.log(preorder.join(" "));

//겨우겨우...^^
//일단 분할정복을 어떻게 사용해야할지 알아차리는것부터 오래걸림... root를 기준으로 왼/오 자를 생각을 바로 못함
//메모리 초과 : 그냥 splice써서 편하게 짰더니 메모리초과
//-> splice안하고 index 넘겨주는걸로 해결 (index찾기 어려웠음ㅠ)
//시간초과 : inorder에서 root의 index찾을때 findIndex로 O(n) -> 전체 O(n^2)이니까 당연함
//-> 이진탐색으로 시간초과 해결

//해설
//postorder의 마지막은 루트, inorder에서 root의 왼쪽은 left subtree, 오른쪽은 right subtree 이용
//inorder의 정점의 위치를 기록해두면 inorder에서 root를 찾는 시간을 O(1)로 줄일 수 있다.
const answer = [];
function solve(postorder, position, in_start, in_end, post_start, post_end) {
  if (in_start > in_end || post_start > post_end) return;

  const root = postorder[post_end];
  answer.push(root);
  let p = position[root]; //root의 inorder에서의 위치

  //inorder : in_start p in_end
  //postorder : post_start post_end
  //left 자식 개수 : p-in_start
  //right 자식 개수 : in_end-p

  let left = p - in_start;
  solve(
    postorder,
    position,
    in_start,
    p - 1,
    post_start,
    post_start + left - 1
  );
  solve(postorder, position, p + 1, in_end, post_start + left, post_end - 1);
}
const position = new Array(n + 1).fill(0);
for (let i = 0; i < n; i++) position[inorder[i]] = i; //position[i] : i번 정점이 inorder에서 몇번째인지 기록
solve(postorder, position, 0, n - 1, 0, n - 1);
console.log(answer.join(" "));
