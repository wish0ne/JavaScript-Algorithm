function solution(sizes) {
  let size1 = Math.max(...sizes[0]);
  let size2 = Math.min(...sizes[0]);

  for (let i = 1; i < sizes.length; i++) {
    const bigger = Math.max(...sizes[i]);
    const smaller = Math.min(...sizes[i]);

    if (bigger > size1) size1 = bigger;
    if (smaller > size2) size2 = smaller;
  }
  return size1 * size2;
}

//겨우 solve..아니 왜이렇게 어려웠지
//Math.max, min대신 sort하면됨
