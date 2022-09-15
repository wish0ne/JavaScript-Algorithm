import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

function buildPatternTable(word) {
  const patternTable = [0];
  let prefixIndex = 0;
  let suffixIndex = 1;

  while (suffixIndex < word.length) {
    if (word[prefixIndex] === word[suffixIndex]) {
      patternTable[suffixIndex] = prefixIndex + 1;
      prefixIndex += 1;
      suffixIndex += 1;
    } else if (prefixIndex === 0) {
      patternTable[suffixIndex] = 0;
      suffixIndex += 1;
    } else {
      prefixIndex = patternTable[prefixIndex - 1];
    }
  }
  return patternTable;
}
function KMP(text, word) {
  let n = text.length;
  let m = word.length;

  let textIndex = 0;
  let wordIndex = 0;

  const pi = buildPatternTable(word);

  while (textIndex < n) {
    if (text[textIndex] === word[wordIndex]) {
      //find
      if (wordIndex === m - 1) answer.push(textIndex - m + 2);
      textIndex += 1;
      wordIndex += 1;
    } else if (wordIndex > 0) {
      wordIndex = pi[wordIndex - 1];
    } else {
      textIndex += 1;
    }
  }
  return -1;
}

const t = input[0];
const p = input[1];

const answer = [];
KMP(t, p);
console.log(answer.length);
console.log(answer.join(" "));

//KMP 알고리즘의 개념을 익히는 문제
//오답 1번 : 이 문제에서는 공백도 중요하므로 trim()을 사용해서 공백을 없애면 안됨
