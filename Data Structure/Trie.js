class Node {
  constructor(value = "") {
    this.value = value; //현재 경로까지의 누적값
    this.end = false; //해당 노드에서 끝나는 문자열이 있는지 여부
    this.child = {}; //자식
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  //삽입
  insert(string) {
    let currentNode = this.root; //루트노드를 시작으로 탐색하면서 삽입한다

    for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];

      //만일, 해당 키를 가진 자식이 없다면 새 노드를 만들어준다.
      if (currentNode.child[currentChar] === undefined) {
        currentNode.child[currentChar] = new Node(
          currentNode.value + currentChar
        );
      }

      currentNode = currentNode.child[currentChar]; // 자식 노드로 이동한다.
    }
    currentNode.end = true; //해당 노드에서 끝나는 단어가 있음을 알린다
  }

  //탐색
  search(string) {
    let currentNode = this.root; //역시나 시작은 루트

    for (let i = 0; i < string.length; i++) {
      const currentChar = string[i];
      if (currentNode.child[currentChar]) {
        currentNode = currentNode.child[currentChar]; // 있으면 노드 이동
      } else {
        return "";
      }
    }
    //찾는 문자열의 마지막까지 탐색했다는것은, 문자열을 찾았다는 것.
    return currentNode.value;
  }
}

const myTrie = new Trie();

myTrie.insert("hell");
myTrie.insert("hep");
myTrie.insert("hel");

console.log(myTrie.search("hell")); // 찾아야함
console.log(myTrie.search("hello"));
console.log(myTrie.search("hep")); // 찾아야함
console.log(myTrie.search("help"));
console.log(myTrie.search("world"));

//출처 : https://velog.io/@teihong93/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-Trie-%EA%B5%AC%ED%98%84
