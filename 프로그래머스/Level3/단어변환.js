// begin -> target으로 변환하는 가장 짧은 변환과정 찾기
//1. 한번에 하나의 알파벳만 변경가능
//2. words에 있는 단어로만 변경가능

import DoublyLinkedList from "../../Data Structure/DoublyLinkedList.js";

function solution(begin, target, words) {
  const visited = new Set();
  const bfs = () => {
    visited.add(begin);
    const q = new DoublyLinkedList();
    q.append([begin, 0]);
    while (!q.isEmpty()) {
      const [node, count] = q.deleteHead();
      if (node === target) return count;
      //글자 하나 다른 단어 모두 추가
      for (let i = 0; i < words.length; i++) {
        if (visited.has(words[i])) continue;
        if (onlyOneDiff(node, words[i])) {
          q.append([words[i], count + 1]);
          visited.add(words[i]);
        }
      }
    }
    return 0;
  };
  let count = bfs();
  return count;
}

function onlyOneDiff(prev, word) {
  let diff = 0;
  for (let i = 0; i < word.length; i++) {
    if (prev[i] !== word[i]) diff += 1;
    if (diff > 1) return false;
  }
  if (diff === 0) return false;
  return true;
}

console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]));
console.log(solution("hit", "cog", ["hot", "dot", "dog", "lot", "log"]));

//solve
//기본적인 bfs 문제!
//visited를 set으로 생성해봤음.
