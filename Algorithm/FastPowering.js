/**
 *
 * @param {number} base
 * @param {number} power
 * @returns
 */
export default function fastPowering(base, power) {
  if (power === 0) return 1;
  if (power === 1) return base;
  if (power % 2 === 0) {
    const multiplier = fastPowering(base, power / 2);
    return multiplier * multiplier;
  } else {
    return base * fastPowering(base, power - 1);
  }
}
