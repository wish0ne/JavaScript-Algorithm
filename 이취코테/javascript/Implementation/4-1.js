import fs from "fs";
let input = fs.readFileSync("../test.txt").toString().split("\n");
let n = parseInt(input[0]);

// L R U D
const dx = [0, 0, -1, 1];
const dy = [-1, 1, 0, 0];
const command = ["L", "R", "U", "D"];

let x = 1;
let y = 1;
let nextX = 1;
let nextY = 1;

input[1].split(" ").forEach((i) => {
  command.forEach((c, index) => {
    if (c === i) {
      nextX = x + dx[index];
      nextY = y + dy[index];
    }
  });

  if (nextX <= 5 && nextX >= 1 && nextY >= 1 && nextY <= 5) {
    x = nextX;
    y = nextY;
  }
});

console.log(x, y);
