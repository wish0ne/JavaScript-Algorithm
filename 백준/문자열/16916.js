import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const s = input[0].trim();
const p = input[1].trim();

class Hash {
  /**
   *
   * @param {number} base - 적절한 진법
   * @param {number} modulus - 적절한 소수
   */
  constructor(base, modulus) {
    this.base = base;
    this.modulus = modulus;
  }

  /**
   * word의 hash 생성 : O(word.length)
   * @param {string} word - hash함수에 넣을 문자열
   * @return {number}
   */
  hash(word) {
    let hash = 0;
    for (let i = 0; i < word.length; i++) {
      hash = (hash * this.base + word[i].charCodeAt(0)) % this.modulus;
    }
    return hash;
  }

  /**
   * 이전 word의 해쉬값으로 해쉬값 구하기 : O(1)
   * @param {number} prevHash - 이전 단어의 해쉬값
   * @param {string} prevWord - 이전 단어
   * @param {string} newWord  - 현재 단어
   * @returns
   */
  roll(prevHash, prevWord, newWord, prevValueMultiplier) {
    let hash = prevHash;

    const prevValue = prevWord[0].charCodeAt(0);
    const newValue = newWord[newWord.length - 1].charCodeAt(0);

    hash += this.modulus; //뺄셈으로 음수가 나올 수 있기 때문에 modulus를 더하고 나눠줌
    hash -= (prevValue * prevValueMultiplier) % this.modulus;

    hash *= this.base;
    hash += newValue;
    hash %= this.modulus;

    return hash;
  }
}

//소수를 엄청 큰 수로 지정하고, 해시값이 같으면 문자열 비교 생략해도 됨
const MOD = 127;
const BASE = 256;

function rabinKarp(text, word) {
  let n = text.length;
  let m = word.length;
  if (n < m) return 0;

  const hasher = new Hash(BASE, MOD);
  const wordHash = hasher.hash(word);

  let prevFrame = null;
  let currentFrameHash = null;

  //첫번째 글자에 곱해져야할 제곱수
  let prevValueMultiplier = 1;
  for (let i = 1; i < word.length; i++) {
    prevValueMultiplier *= BASE;
    prevValueMultiplier %= MOD;
  }

  for (let i = 0; i <= n - m; i++) {
    const currentFrame = text.substring(i, i + m);

    if (currentFrameHash === null) {
      currentFrameHash = hasher.hash(currentFrame);
    } else {
      currentFrameHash = hasher.roll(
        currentFrameHash,
        prevFrame,
        currentFrame,
        prevValueMultiplier
      );
    }

    prevFrame = currentFrame;

    if (wordHash === currentFrameHash && text.substr(i, m) === word) return 1;
  }
  return 0;
}

console.log(rabinKarp(s, p));

//N,M이 100만이기 때문에 O(NM)인 브루트포스로는 풀 수 없음
//라빈 카프 알고리즘으로 문자열 S에서 패턴 P를 찾음
//해시함수에 따라 최선 : O(N+M), 최악 : O(NM)
