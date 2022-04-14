function solution(str1, str2) {
  //대문자로 변환
  str1 = str1.toUpperCase().split("");
  str2 = str2.toUpperCase().split("");

  //영문자만 포함
  const arr1 = [];
  for (let i = 0; i < str1.length - 1; i++) {
    if (
      str1[i].charCodeAt(0) >= "A".charCodeAt(0) &&
      str1[i].charCodeAt(0) <= "Z".charCodeAt(0)
    ) {
      if (
        str1[i + 1].charCodeAt(0) >= "A".charCodeAt(0) &&
        str1[i + 1].charCodeAt(0) <= "Z".charCodeAt(0)
      )
        arr1.push(`${str1[i]}${str1[i + 1]}`);
    }
  }

  const arr2 = [];
  for (let i = 0; i < str2.length - 1; i++) {
    if (
      str2[i].charCodeAt(0) >= "A".charCodeAt(0) &&
      str2[i].charCodeAt(0) <= "Z".charCodeAt(0)
    ) {
      if (
        str2[i + 1].charCodeAt(0) >= "A".charCodeAt(0) &&
        str2[i + 1].charCodeAt(0) <= "Z".charCodeAt(0)
      )
        arr2.push([`${str2[i]}${str2[i + 1]}`, false]);
    }
  }

  const intersection = [];
  const only1 = [];
  for (let ar1 of arr1) {
    let find = false;
    for (let i = 0; i < arr2.length; i++) {
      if (arr2[i][0] === ar1 && !arr2[i][1]) {
        intersection.push(ar1);
        arr2[i][1] = true;
        find = true;
        break;
      }
    }
    if (!find) only1.push(ar1);
  }

  const union_size = only1.concat(arr2).length;
  const intersection_size = intersection.length;

  if (union_size === 0) return 65536;
  if (intersection_size === 0) return 0;
  return parseInt((intersection_size / union_size) * 65536);
}

console.log(solution("aa aa", "aabb")); //틀렸던 반례

//solve
//반례 찾는데 오래걸림
//교집합을 구할때 arr2에 있으면 무조건 교집합에 넣어서 중복됐었음
