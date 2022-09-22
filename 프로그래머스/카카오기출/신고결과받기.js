//해시 자료구조 문제
//1. report를 하나씩 처리하면서 누구에게 신고당했는지 목록 만듦
//2. 신고된 유저 아이디를 순회하면서 정지기준을 만족하면 목록의 유저들의 카운트 + 1

function solution(id_list, report, k) {
  const map = new Map();
  const set = new Set(report);
  set.forEach((s) => {
    const [user, block] = s.split(" ");
    let prev = map.get(block);
    if (prev) map.set(block, prev.concat(user));
    else map.set(block, [user]);
  });

  const mail = new Map();
  id_list.forEach((id) => {
    mail.set(id, 0);
  });
  for (let entry of map) {
    let [id, users] = entry;
    if (users.length >= k) {
      users.forEach((user) => {
        mail.set(user, mail.get(user) + 1);
      });
    }
  }

  const answer = [];
  for (let num of mail.values()) {
    answer.push(num);
  }

  return answer;
}

function solution_my(id_list, report, k) {
  //각 유저당 신고횟수 기록
  const set = new Set(report); //동일한 신고는 하나로 취급
  const map = new Map();
  id_list.forEach((id) => {
    map.set(id, 0);
  });
  set.forEach((r) => {
    const [user, block] = r.split(" ");
    let num = map.get(block);
    map.set(block, num + 1);
  });

  //정지 유저
  const block = new Set();
  for (let entry of map) {
    let [id, num] = entry;
    if (num >= k) block.add(id);
  }

  //메일 횟수
  const mail = new Map();
  id_list.forEach((id) => {
    mail.set(id, 0);
  });
  set.forEach((r) => {
    const [user, bloc] = r.split(" ");
    if (block.has(bloc)) {
      let num = mail.get(user);
      mail.set(user, num + 1);
    }
  });

  const answer = [];
  for (let num of mail.values()) {
    answer.push(num);
  }

  return answer;
}

console.log(
  solution(
    ["muzi", "frodo", "apeach", "neo"],
    ["muzi frodo", "apeach frodo", "frodo neo", "muzi neo", "apeach muzi"],
    2
  )
);
