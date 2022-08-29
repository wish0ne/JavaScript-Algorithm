import fs from "fs";
const readFile = "../test.txt";
// const readFile = '/dev/stdin';
let input = fs.readFileSync(readFile).toString().split("\n");

const [n, k] = input[0].split(" ").map(Number);

const nstart = n * 24 * 60;
const nend = (n + 1) * 24 * 60 - 1;

let off = [15 * 60, 18 * 60, 21 * 60];

let ncount = 0;
const ntime = [];
while (off[0] <= nend) {
  off.forEach((o) => {
    if (o >= nstart && o <= nend) {
      ncount += 1;
      ntime.push(o);
    }
  });
  off = off.map((o) => o + k + 24 * 60);
}

console.log(ncount);
ntime.forEach((time) => {
  let d = parseInt(time / 24 / 60);
  let h = parseInt((time - d * 24 * 60) / 60);
  let m = time - 24 * 60 * d - 60 * h;
  console.log(
    `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
  );
});
