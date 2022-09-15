/**
 *
 * @param {string} word
 * @returns {number[]}
 */

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
/**
 *
 * @param {string} text
 * @param {string} word
 * @returns {number}
 */

export default function KMP(text, word) {
  if (word.length === 0) return 0;

  let n = text.length;
  let m = word.length;

  let textIndex = 0;
  let wordIndex = 0;

  const pi = buildPatternTable(word);

  while (textIndex < n) {
    if (text[textIndex] === word[wordIndex]) {
      //find
      if (wordIndex === m - 1) return textIndex - m + 1;
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
