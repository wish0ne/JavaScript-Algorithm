function solution(record) {
  const answer = [];
  const idSet = new Set(); //유저 id 관리할 set
  const users = [];
  for (let rec of record) {
    const str = rec.split(" ");
    if (str[0] === "Enter") {
      //나갔다가 들어온 유저면 기존 닉네임 변경
      if (idSet.has(str[1])) {
        users[str[1]] = str[2];
      }
      //새로 들어온 유저면 입장만
      else {
        idSet.add(str[1]);
        users[str[1]] = str[2]; //✔users.push({str[1]:str[2]})로 했더니 나중에 수정할때 수정이 안되고 추가됨.
        //✔배열에 {}로 감싸진 객체를 추가하는거랑, 그냥 객체ele를 추가하는거랑 다름
        //push하면 users[{a:1}, a:1]이랑 다른것
        //✔users[a] = 1이 동작할때 a가 없으면 추가, 있으면 수정된다는 점도 기억해두자
      }
    } else if (str[0] === "Change") {
      //기존 닉네임 다 변경
      users[str[1]] = str[2];
    }
  }

  for (let rec of record) {
    const str = rec.split(" ");
    if (str[0] === "Enter") {
      answer.push(`${users[str[1]]}님이 들어왔습니다.`);
    } else if (str[0] === "Leave") {
      //기존 닉네임 다 변경
      answer.push(`${users[str[1]]}님이 나갔습니다.`);
    }
  }
  return answer;
}

console.log(
  solution(["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Change uid4567 Ryan"])
);

//solve
//✔객체 값 수정할때 오류
