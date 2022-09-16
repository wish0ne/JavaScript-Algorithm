export class BSTNode {
  constructor(value = null) {
    this.left = null;
    this.right = null;
    this.parent = null;
    this.value = value;
  }

  //Binary Tree Node------
  get leftHeight() {
    if (!this.left) return 0;
    return this.left.height + 1;
  }

  get rightHeight() {
    if (!this.right) return 0;
    return this.right.height + 1;
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight);
  }

  setValue(value) {
    this.value = value;
    return this;
  }

  //현재 노드의 left 노드 설정
  setLeft(node) {
    //reset parent's left node
    if (this.left) this.left.parent = null;

    //attach new node to the left
    this.left = node;

    //current node to be a parent of new node
    if (this.left) {
      this.left.parent = this;
    }
    return this;
  }

  //현재 노드의 right 노드 설정
  setRight(node) {
    //reset parent's right node
    if (this.right) this.right.parent = null;

    //attach new node to the right
    this.right = node;

    //current node to be a parent of new node
    if (this.right) {
      this.right.parent = this;
    }
    return this;
  }

  //현재 노드의 자식 노드 중 중 nodeToRemove에 해당하는 노드 삭제
  removeChild(nodeToRemove) {
    if (this.left && this.left === nodeToRemove) {
      this.left = null;
      return true;
    }

    if (this.right && this.right === nodeToRemove) {
      this.right = null;
      return true;
    }
    return false;
  }

  //현재 노드의 자식 노드 교체
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) return false;

    if (this.left && this.left === nodeToReplace) {
      this.left = replacementNode;
      return true;
    }

    if (this.right && this.right === nodeToReplace) {
      this.right = replacementNode;
      return true;
    }
    return false;
  }

  copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value);
    targetNode.setLeft(sourceNode.left);
    targetNode.setRight(sourceNode.right);
  }

  //inorder : left -> now -> right
  inorder() {
    let traverse = [];

    if (this.left) traverse = traverse.concat(this.left.inorder());
    traverse.push(this.value);
    if (this.right) traverse = traverse.concat(this.right.inorder());

    return traverse;
  }

  //preorder : now -> left -> right
  preorder() {
    let traverse = [];
    traverse.push(this.value);
    if (this.left) traverse = traverse.concat(this.left.preorder());
    if (this.right) traverse = traverse.concat(this.right.preorder());
    return traverse;
  }

  //postorder : left -> right -> now
  postorder() {
    let traverse = [];
    if (this.left) traverse = traverse.concat(this.left.postorder());
    if (this.right) traverse = traverse.concat(this.right.postorder());
    traverse.push(this.value);
    return traverse;
  }

  toString() {
    return this.inorder().toString();
  }

  //------Binary Tree Node

  insert(value) {
    //empty
    if (this.value === null) {
      this.value = value;
      return this;
    }

    if (value < this.value) {
      //insert to the left
      if (this.left) return this.left.insert(value);

      const newNode = new BSTNode(value);
      this.setLeft(newNode);

      return newNode;
    }

    if (value > this.value) {
      //insert to the right
      if (this.right) return this.right.insert(value);

      const newNode = new BSTNode(value);
      this.setRight(newNode);

      return newNode;
    }
    return this;
  }

  find(value) {
    //check root
    if (value === this.value) return this;

    if (value < this.value && this.left) return this.left.find(value);

    if (value > this.value && this.right) return this.right.find(value);

    return null;
  }

  contains(value) {
    //double exclamation marks : boolean으로 casting
    //undefined, 0, "", null 등과 같이 정의되지 않은 변수를 강제 변환하여 확실한 true/false 논리결과 만듦
    return !!this.find(value);
  }

  remove(value) {
    const nodeToRemove = this.find(value);

    if (!nodeToRemove) {
      throw new Error("Item not found in the tree");
    }

    const { parent } = nodeToRemove;

    //node is leaf(has no children)
    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) parent.removeChild(nodeToRemove);
      else nodeToRemove.setValue(undefined);
    }
    //node has two children
    else if (nodeToRemove.left && nodeToRemove.right) {
      //오른쪽 서브 트리의 가장 작은 노드 찾기
      const nextBiggerNode = nodeToRemove.right.findMin();
      //삭제하고자 하는 노드를 nextBiggerNode로 교체
      if (nextBiggerNode !== nodeToRemove.right) {
        this.remove(nextBiggerNode.value); //오른쪽 서브 트리의 가장 왼쪽 노드 삭제
        nodeToRemove.setValue(nextBiggerNode.value); //삭제하고자 하는 노드 값을 가장 왼쪽 노드 값으로 변경(삭제하고자 하는 노드와 nextBiggerNode를 교체한 효과)
      }
      //삭제하고자 하는 노드의 바로 오른쪽 자식 노드가 nextBiggerNode인 경우(left child가 없음)
      //삭제하고자 하는 노드와 오른쪽 자식 노드를 교체하기만 하면 됨
      else {
        nodeToRemove.setValue(nodeToRemove.right.value);
        nodeToRemove.setRight(nodeToRemove.right.right);
      }
    }
    //node has one child
    else {
      //자식 노드를 현재 노드의 부모의 자식으로 설정
      const childNode = nodeToRemove.left || nodeToRemove.right;
      if (parent) {
        parent.replaceChild(nodeToRemove, childNode);
      } else this.copyNode(childNode, nodeToRemove);
    }

    nodeToRemove.parent = null;
    return true;
  }

  findMin() {
    if (!this.left) return this;
    return this.left.findMin();
  }
}

export class BST {
  constructor() {
    this.root = new BSTNode(null);
  }

  insert(value) {
    return this.root.insert(value);
  }

  contains(value) {
    return this.root.contains(value);
  }

  remove(value) {
    return this.root.remove(value);
  }

  toString() {
    return this.root.toString();
  }
}
