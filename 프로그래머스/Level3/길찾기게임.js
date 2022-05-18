function solution(nodeinfo) {
  nodeinfo.forEach((info, idx) => info.push(idx + 1));
  nodeinfo.sort((a, b) => {
    if (a[1] !== b[1]) return b[1] - a[1];
    else return a[0] - b[0];
  });

  //트리 생성🔥
  const graph = new Array(nodeinfo.length + 1);
  for (let i = 0; i <= nodeinfo.length; i++) graph[i] = new Array(2);

  const make_tree = (parent, node) => {
    //left sub tree
    if (parent[0] > node[0]) {
      if (!graph[parent[2]][0]) {
        graph[parent[2]][0] = node;
        //console.log(parent[2], node[2]);
        return;
      }
      make_tree(graph[parent[2]][0], node);
    }
    //right sub tree
    else {
      if (!graph[parent[2]][1]) {
        graph[parent[2]][1] = node;
        //console.log(parent[2], node[2]);
        return;
      }
      make_tree(graph[parent[2]][1], node); //right
    }
  };

  for (let i = 0; i < nodeinfo.length - 1; i++)
    make_tree(nodeinfo[0], nodeinfo[i + 1]);

  const preorder = [];
  const postorder = [];

  //전위 순회 : root -> left -> right
  const preOrder = (parent, parent_idx) => {
    preorder.push(parent_idx); //root 추가
    let [left, right] = parent;
    if (left) preOrder(graph[left[2]], left[2]);
    if (right) preOrder(graph[right[2]], right[2]);
  };
  preOrder(graph[nodeinfo[0][2]], nodeinfo[0][2]); //root
  console.log(preorder);

  //후위 순회 : left -> right -> root
  const postOrder = (parent, parent_idx) => {
    let [left, right] = parent;
    if (left) postOrder(graph[left[2]], left[2]);
    if (right) postOrder(graph[right[2]], right[2]);
    postorder.push(parent_idx);
  };
  postOrder(graph[nodeinfo[0][2]], nodeinfo[0][2]);
  console.log(postorder);

  const answer = [];
  answer.push(preorder, postorder);
  return answer;
}

//solve
//트리 순회하는건 의외로 엄청 쉬웠고, 트리 생성에서 막혀서 하루종일 풀었다..
//사실 트리 생성은 구현이라 집중하면 빠르게 풀 수 있었을 것 같은데, 처음에 생각한 아이디어가 틀렸어서 더 시간 많이 잡아먹은듯
//구현문제는 항상 문제 난이도보다 체감 난이도를 더 크게 생각해서 막막해하는 것 같음
//구글링 가능한 시험이었다면 tree 자료구조 그대로 사용했어도 좋을듯

console.log(
  solution([
    [5, 3],
    [11, 5],
    [13, 3],
    [3, 5],
    [6, 1],
    [1, 3],
    [8, 6],
    [7, 2],
    [2, 2],
  ])
);
