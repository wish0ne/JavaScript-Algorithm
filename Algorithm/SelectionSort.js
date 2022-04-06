const array = [7, 5, 9, 0, 3, 1, 6, 2, 4, 8];

for (let i = 0; i < array.length; i++) {
  let min_index = i; //가장 작은 원소의 인덱스
  for (let j = i + 1; j < array.length; j++) {
    if (array[min_index] > array[j]) min_index = j;
    [array[i], array[min_index]] = [array[min_index], array[i]]; //swap
  }
}

console.log(array);
