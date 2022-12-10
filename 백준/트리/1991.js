import fs from "fs";
const readFile = "./input.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const n = parseInt(input[0]);

const tree = new Array(26);
for (let i = 0; i < 26; i++) tree[i] = new Array(2);

for (let i = 1; i <= n; i++) {
  const [root, left, right] = input[i].trim().split(" ");
  const index = root.charCodeAt(0) - "A".charCodeAt(0);
  tree[index][0] = left;
  tree[index][1] = right;
}

let preorder = "";
let inorder = "";
let postorder = "";

function preOrder(value) {
  if (value === ".") return;
  preorder += value;
  const index = value.charCodeAt(0) - "A".charCodeAt(0);
  preOrder(tree[index][0]);
  preOrder(tree[index][1]);
}

function inOrder(value) {
  if (value === ".") return;

  const index = value.charCodeAt(0) - "A".charCodeAt(0);
  inOrder(tree[index][0]);
  inorder += value;
  inOrder(tree[index][1]);
}

function postOrder(value) {
  if (value === ".") return;

  const index = value.charCodeAt(0) - "A".charCodeAt(0);
  postOrder(tree[index][0]);
  postOrder(tree[index][1]);
  postorder += value;
}

preOrder("A");
inOrder("A");
postOrder("A");

console.log(preorder);
console.log(inorder);
console.log(postorder);

//solve
//트리 순회(재귀, 분할정복)유형 종종 등장
//배열로 트리 만들지 말고 객체로 생성하면 알파벳 인덱스 안구해도 바로 사용가능
const tree2 = {};
for (let i = 1; i <= n; i++) {
  const [root, left, right] = input[i].trim().split(" ");
  tree2[root] = [left, right];
}
