import { BST, BSTNode } from "../BST";

describe("BinarySearchTreeNode", () => {
  it("should create binary search tree", () => {
    const bstNode = new BSTNode(2);

    expect(bstNode.value).toBe(2);
    expect(bstNode.left).toBeNull();
    expect(bstNode.right).toBeNull();
  });

  it("should insert in itself if it is empty", () => {
    const bstNode = new BSTNode();
    bstNode.insert(1);

    expect(bstNode.value).toBe(1);
    expect(bstNode.left).toBeNull();
    expect(bstNode.right).toBeNull();
  });

  it("should insert nodes in correct order", () => {
    const bstNode = new BSTNode(2);
    const insertedNode1 = bstNode.insert(1);

    expect(insertedNode1.value).toBe(1);
    expect(bstNode.toString()).toBe("1,2");
    expect(bstNode.contains(1)).toBe(true);
    expect(bstNode.contains(3)).toBe(false);

    const insertedNode2 = bstNode.insert(3);

    expect(insertedNode2.value).toBe(3);
    expect(bstNode.toString()).toBe("1,2,3");
    expect(bstNode.contains(3)).toBe(true);
    expect(bstNode.contains(4)).toBe(false);

    bstNode.insert(7);

    expect(bstNode.toString()).toBe("1,2,3,7");
    expect(bstNode.contains(7)).toBe(true);
    expect(bstNode.contains(8)).toBe(false);

    bstNode.insert(4);

    expect(bstNode.toString()).toBe("1,2,3,4,7");
    expect(bstNode.contains(4)).toBe(true);
    expect(bstNode.contains(8)).toBe(false);

    bstNode.insert(6);

    expect(bstNode.toString()).toBe("1,2,3,4,6,7");
    expect(bstNode.contains(6)).toBe(true);
    expect(bstNode.contains(8)).toBe(false);
  });

  it("should not insert duplicates", () => {
    const bstNode = new BSTNode(2);
    bstNode.insert(1);

    expect(bstNode.toString()).toBe("1,2");
    expect(bstNode.contains(1)).toBe(true);
    expect(bstNode.contains(3)).toBe(false);

    bstNode.insert(1);

    expect(bstNode.toString()).toBe("1,2");
    expect(bstNode.contains(1)).toBe(true);
    expect(bstNode.contains(3)).toBe(false);
  });

  it("should find min node", () => {
    const node = new BSTNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    expect(node.findMin()).not.toBeNull();
    expect(node.findMin().value).toBe(1);
  });

  it("should find node", () => {
    const node = new BSTNode(10);

    node.insert(20);
    node.insert(30);
    node.insert(5);
    node.insert(40);
    node.insert(1);

    expect(node.find(6)).toBeNull();
    expect(node.find(5)).not.toBeNull();
    expect(node.find(5).value).toBe(5);
  });

  it("should remove leaf nodes", () => {
    const bstRootNode = new BSTNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);

    expect(bstRootNode.toString()).toBe("5,10,20");

    const removed1 = bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe("10,20");
    expect(removed1).toBe(true);

    const removed2 = bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe("10");
    expect(removed2).toBe(true);
  });

  it("should remove nodes with one child", () => {
    const bstRootNode = new BSTNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);

    expect(bstRootNode.toString()).toBe("5,10,20,30");

    bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe("5,10,30");

    bstRootNode.insert(1);
    expect(bstRootNode.toString()).toBe("1,5,10,30");

    bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe("1,10,30");
  });

  it("should remove nodes with two children", () => {
    const bstRootNode = new BSTNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);
    bstRootNode.insert(5);
    bstRootNode.insert(30);
    bstRootNode.insert(15);
    bstRootNode.insert(25);

    expect(bstRootNode.toString()).toBe("5,10,15,20,25,30");
    expect(bstRootNode.find(20).left.value).toBe(15);
    expect(bstRootNode.find(20).right.value).toBe(30);

    bstRootNode.remove(20);
    expect(bstRootNode.toString()).toBe("5,10,15,25,30");

    bstRootNode.remove(15);
    expect(bstRootNode.toString()).toBe("5,10,25,30");

    bstRootNode.remove(10);
    expect(bstRootNode.toString()).toBe("5,25,30");
    expect(bstRootNode.value).toBe(25);

    bstRootNode.remove(25);
    expect(bstRootNode.toString()).toBe("5,30");

    bstRootNode.remove(5);
    expect(bstRootNode.toString()).toBe("30");
  });

  it("should remove node with no parent", () => {
    const bstRootNode = new BSTNode();
    expect(bstRootNode.toString()).toBe("");

    bstRootNode.insert(1);
    bstRootNode.insert(2);
    expect(bstRootNode.toString()).toBe("1,2");

    bstRootNode.remove(1);
    expect(bstRootNode.toString()).toBe("2");

    bstRootNode.remove(2);
    expect(bstRootNode.toString()).toBe("");
  });

  it("should throw error when trying to remove not existing node", () => {
    const bstRootNode = new BSTNode();

    bstRootNode.insert(10);
    bstRootNode.insert(20);

    function removeNotExistingElementFromTree() {
      bstRootNode.remove(30);
    }

    expect(removeNotExistingElementFromTree).toThrow();
  });

  it("should be possible to use objects as node values", () => {
    const nodeValueComparatorCallback = (a, b) => {
      const normalizedA = a || { value: null };
      const normalizedB = b || { value: null };

      if (normalizedA.value === normalizedB.value) {
        return 0;
      }

      return normalizedA.value < normalizedB.value ? -1 : 1;
    };

    const obj1 = { key: "obj1", value: 1, toString: () => "obj1" };
    const obj2 = { key: "obj2", value: 2, toString: () => "obj2" };
    const obj3 = { key: "obj3", value: 3, toString: () => "obj3" };

    const bstNode = new BSTNode(obj2, nodeValueComparatorCallback);
    bstNode.insert(obj1);

    expect(bstNode.toString()).toBe("obj1,obj2");
    expect(bstNode.contains(obj1)).toBe(true);
    expect(bstNode.contains(obj3)).toBe(false);

    bstNode.insert(obj3);

    expect(bstNode.toString()).toBe("obj1,obj2,obj3");
    expect(bstNode.contains(obj3)).toBe(true);

    expect(bstNode.findMin().value).toEqual(obj1);
  });

  it("should abandon removed node", () => {
    const rootNode = new BSTNode("foo");
    rootNode.insert("bar");
    const childNode = rootNode.find("bar");
    rootNode.remove("bar");

    expect(childNode.parent).toBeNull();
  });
});

//BST
describe("BinarySearchTree", () => {
  it("should create binary search tree", () => {
    const bst = new BST();

    expect(bst).toBeDefined();
    expect(bst.root).toBeDefined();
    expect(bst.root.value).toBeNull();
    expect(bst.root.left).toBeNull();
    expect(bst.root.right).toBeNull();
  });

  it("should insert values", () => {
    const bst = new BST();

    const insertedNode1 = bst.insert(10);
    const insertedNode2 = bst.insert(20);
    bst.insert(5);

    expect(bst.toString()).toBe("5,10,20");
    expect(insertedNode1.value).toBe(10);
    expect(insertedNode2.value).toBe(20);
  });

  it("should check if value exists", () => {
    const bst = new BST();

    bst.insert(10);
    bst.insert(20);
    bst.insert(5);

    expect(bst.contains(20)).toBe(true);
    expect(bst.contains(40)).toBe(false);
  });

  it("should remove nodes", () => {
    const bst = new BST();

    bst.insert(10);
    bst.insert(20);
    bst.insert(5);

    expect(bst.toString()).toBe("5,10,20");

    const removed1 = bst.remove(5);
    expect(bst.toString()).toBe("10,20");
    expect(removed1).toBe(true);

    const removed2 = bst.remove(20);
    expect(bst.toString()).toBe("10");
    expect(removed2).toBe(true);
  });

  it("should insert object values", () => {
    const nodeValueCompareFunction = (a, b) => {
      const normalizedA = a || { value: null };
      const normalizedB = b || { value: null };

      if (normalizedA.value === normalizedB.value) {
        return 0;
      }

      return normalizedA.value < normalizedB.value ? -1 : 1;
    };

    const obj1 = { key: "obj1", value: 1, toString: () => "obj1" };
    const obj2 = { key: "obj2", value: 2, toString: () => "obj2" };
    const obj3 = { key: "obj3", value: 3, toString: () => "obj3" };

    const bst = new BST(nodeValueCompareFunction);

    bst.insert(obj2);
    bst.insert(obj3);
    bst.insert(obj1);

    expect(bst.toString()).toBe("obj1,obj2,obj3");
  });

  it("should be traversed to sorted array", () => {
    const bst = new BST();

    bst.insert(10);
    bst.insert(-10);
    bst.insert(20);
    bst.insert(-20);
    bst.insert(25);
    bst.insert(6);

    expect(bst.toString()).toBe("-20,-10,6,10,20,25");
    expect(bst.root.height).toBe(2);

    bst.insert(4);

    expect(bst.toString()).toBe("-20,-10,4,6,10,20,25");
    expect(bst.root.height).toBe(3);
  });
});
