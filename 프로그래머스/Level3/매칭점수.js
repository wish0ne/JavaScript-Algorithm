//word : 검색어
//pages : HTML 목록
//매칭점수가 가장 높은 페이지의 index?
function solution(word, pages) {
  word = word.toLowerCase();
  for (let i = 0; i < pages.length; i++) pages[i] = pages[i].split(/\n/);

  let link = new Map(); //외부 링크 저장
  let score = new Map(); //해당 페이지의 기본점수, 외부링크수, 인덱스 저장
  for (let i = 0; i < pages.length; i++) {
    //현재 page의 url 찾기
    let page = pages[i].find((p) => p.includes('<meta property="og:url"'));
    let url = page.match(/"https:\S*"/)[0];
    console.log(url);

    //현재 page의 <body>태그부분만 추출
    const bodyStart = pages[i].findIndex((p) => p.includes("<body>"));
    const bodyEnd = pages[i].findIndex((p) => p.includes("</body>"));
    const body = pages[i].slice(bodyStart + 1, bodyEnd);

    //기본 점수 계산
    const basic = body
      .flatMap((b) => b.toLowerCase().split(/[\d|\W]/)) //문자가 아닌 것들을 기준으로 split한 뒤 word와 동일한지 확인
      .filter((f) => f === word).length;

    //현재 페이지에서 연결된 외부 링크들 찾기
    const tempLink = body
      .flatMap((b) => b.match(/<a href="https\S*"/gi))
      .filter((e) => e)
      .map((e) => e.substr(8));
    score.set(url, [basic, tempLink.length, 0, i]);
    link.set(url, tempLink);
  }

  //각 페이지 별 링크점수 계산
  for (let [key, value] of link) {
    value.forEach((v) => {
      if (score.has(v)) {
        let temp = score.get(v);
        temp[2] += score.get(key)[0] / score.get(key)[1];
        score.set(v, temp);
      }
    });
  }
  console.log(score);
  //매칭점수 계산
  const matching = new Array(pages.length);
  for (let [key, value] of score) {
    matching[value[3]] = [value[0] + value[2], value[3]];
  }

  //매칭점수 - index 순으로 정렬
  matching.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0];
    return a[1] - b[1];
  });

  return matching[0][1];
}

// function solution(word, pages) {
//   for (let i = 0; i < pages.length; i++) pages[i] = pages[i].split(/\s|\n/);

//   let link = new Map(); //외부 링크 저장
//   let score = new Map(); //해당 페이지의 기본점수, 외부링크수, 인덱스 저장
//   const pages_arr = [];
//   for (let i = 0; i < pages.length; i++) {
//     let page = pages[i].find((tag) => tag.includes("content="));
//     let url = page.slice(page.indexOf('"') + 1, page.lastIndexOf('"')); //해당 페이지 url
//     pages_arr.push(url);
//   }

//   let re = new RegExp(
//     "([^a-zA-Z]+" +
//       word.toLowerCase() +
//       "[^a-zA-Z]+)|" +
//       "(^" +
//       word.toLowerCase() +
//       "[^a-zA-Z]+)|" +
//       "([^a-zA-Z]+" +
//       word.toLowerCase() +
//       "$)",
//     "g"
//   );
//   for (let i = 0; i < pages.length; i++) {
//     let basic = 0; //기본 점수
//     let linkCnt = 0; //외부 링크 수
//     let url = pages_arr[i];
//     pages[i].forEach((w) => {
//       if (w.toLowerCase().trim() === word.toLowerCase()) basic += 1;
//       else if (w.toLowerCase().trim().match(re))
//         basic += w.toLowerCase().trim().match(re).length;
//       if (w.startsWith('href="https')) {
//         linkCnt += 1;
//         let tempLink = w.slice(w.indexOf('"') + 1, w.lastIndexOf('"'));
//         if (pages_arr.includes(tempLink)) {
//           if (link.get(tempLink)) {
//             let temp = link.get(tempLink);
//             link.set(tempLink, temp.concat(url));
//           } else {
//             link.set(tempLink, [url]);
//           }
//         }
//       }
//     });
//     score.set(url, [basic, linkCnt, i]);
//   }

//   const matching = new Array(pages.length); //매칭점수, index순으로 저장
//   for (let [key, value] of score) {
//     matching[value[2]] = [value[0], value[2]];
//   }

//   //링크점수 더하기
//   let linkScore = 0;
//   for (let [key, value] of link) {
//     linkScore = 0;
//     //링크점수 계산
//     value.forEach((v) => {
//       let [b, c] = score.get(v);
//       linkScore += b / c;
//     });
//     matching[score.get(key)[2]][0] += linkScore;
//   }
//   //매칭점수 - index 순으로 정렬
//   matching.sort((a, b) => {
//     if (a[0] !== b[0]) return b[0] - a[0];
//     return a[1] - b[1];
//   });

//   return matching[0][1];
// }
console.log(
  solution("blind", [
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://a.com"/>\n</head>  \n<body>\nBlind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. \n<a href="https://b.com"> Link to b </a>\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://b.com"/>\n</head>  \n<body>\nSuspendisse potenti. Vivamus venenatis tellus non turpis bibendum, \n<a href="https://a.com"> Link to a </a>\nblind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.\n<a href="https://c.com"> Link to c </a>\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://c.com"/>\n</head>  \n<body>\nUt condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind\n<a href="https://a.com"> Link to a </a>\n</body>\n</html>',
  ])
);

console.log(
  solution("Muzi", [
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
    '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
  ])
);

//정규표현식 문제
//정규표현식에 대한 이해가 없어서 어려웠고, 문제조건도 이상해서 not solve ㅡㅡ
//match, flatMap등 새로운 메소드들 알아가기
