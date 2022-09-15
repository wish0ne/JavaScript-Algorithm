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
   * @param {number} prevValueMultiplier - 맨 앞 글자에 곱해진 제곱수
   * @returns
   */
  roll(prevHash, prevWord, newWord, prevValueMultiplier) {
    let hash = prevHash;

    const prevValue = prevWord[0].charCodeAt(0);
    const newValue = newWord[newWord.length - 1].charCodeAt(0);

    hash += this.modulus;
    hash -= (prevValue * prevValueMultiplier) % this.modulus;

    hash *= this.base;
    hash += newValue;
    hash %= this.modulus;

    return hash;
  }
}

const MOD = 127;
const BASE = 256;

export default function rabinKarp(text, word) {
  let n = text.length;
  let m = word.length;
  if (n < m) return -1;

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

    if (wordHash === currentFrameHash && text.substr(i, m) === word) return i;
  }
  return -1;
}
