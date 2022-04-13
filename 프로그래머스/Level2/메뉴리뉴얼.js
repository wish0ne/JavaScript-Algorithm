const Combination = (arr, selectNum) => {
  //하나씩 선택하는 경우 각 원소를 배열에 넣은 배열 return
  if (selectNum === 1) return arr.map((a) => [a]);
  const results = []; //조합이 담길 배열
  arr.forEach((a, index) => {
    //작은 배열로 나눠서 조합을 구함.
    //배열을 앞에서부터 하나씩 잘라서 작은 배열로 만들고 거기서 하나를 제외한 조합을 구함. => 앞의 숫자를 고정한채로 조합을 구하는것.
    const smallerCombination = Combination(arr.slice(index + 1), selectNum - 1);
    smallerCombination.forEach((smaller) => {
      results.push([a].concat(smaller));
    });
  });

  return results;
};

//시간초과 풀이
function solution1(orders, course) {
  const answer = [];
  const customers_orders = new Array(orders.length);
  for (let i = 0; i < orders.length; i++) {
    customers_orders[i] = new Array(26).fill(0);
  }

  let menu = new Set();
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i].split("");
    for (let ord of order) {
      const code = ord.charCodeAt(0) - "A".charCodeAt(0);
      customers_orders[i][code] = 1;
      menu.add(code);
    }
  }
  menu = Array.from(menu).sort((a, b) => a - b);
  console.log(menu);
  for (let crs of course) {
    const combs = Combination(menu, crs); //(0,1,2), (0,1,3).... 메뉴 개수당 조합
    let maxCount = 2; //해당 조합을 주문한 최대 손님 수
    let temp_answer = [];
    //조합 하나씩 확인
    //comb : (0, 1, 2)
    for (let comb of combs) {
      let count = 0; //해당 조합을 주문한 손님 수
      //각 손님마다 해당 조합을 모두 주문했는지 확인
      for (let i = 0; i < orders.length; i++) {
        let all_order = true;
        for (let cmb of comb) {
          if (customers_orders[i][cmb] === 0) {
            all_order = false;
            break;
          }
        }
        if (all_order) count += 1;
      }
      if (count > maxCount) {
        maxCount = count;
        temp_answer = [comb];
      } else if (count === maxCount) temp_answer.push(comb);
    }
    for (let temp of temp_answer) {
      let string = "";
      for (let i = 0; i < temp.length; i++) {
        string += String.fromCharCode(temp[i] + "A".charCodeAt(0));
      }
      answer.push(string);
    }
  }

  return answer.sort();
}

function solution(orders, course) {
  const answer = [];
  for (let crs of course) {
    //조합 계산
    let menu = new Set();
    for (let order of orders) {
      const comb = Combination(order.split(""), crs);
      comb.forEach((v) => {
        v.sort();
        menu.add(v.join(""));
      });
    }
    console.dir(menu);
    //menu = Array.from(menu).sort((a, b) => a - b);

    let maxCount = 2; //해당 조합을 주문한 최대 손님 수
    let temp_answer = [];
    //조합 하나씩 확인
    //comb : (0, 1, 2)
    for (let m of menu) {
      let count = 0; //해당 조합을 주문한 손님 수
      //각 손님마다 해당 조합을 모두 주문했는지 확인
      for (let order of orders) {
        let all_order = true;
        for (let c of m) {
          if (!order.includes(c)) {
            all_order = false;
            break;
          }
        }
        if (all_order) count += 1;
      }
      if (count > maxCount) {
        maxCount = count;
        temp_answer = [m];
      } else if (count === maxCount) temp_answer.push(m);
    }
    console.log(temp_answer, maxCount);
    for (let temp of temp_answer) {
      answer.push(temp);
    }
  }
  return answer.sort();
}

function print(graph) {
  for (let i = 0; i < graph.length; i++) console.log(graph[i]);
}

console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]));

//시간초과
//처음에는 조합을 만들때 한번이라도 주문한 메뉴들의 배열로 조합을 만들었음 -> 시간초과
//각 손님이 시킨 메뉴들에서 조합을 구한뒤 중복제거하니까 시간 엄청 단축
//조합의 수를 줄일 수 있는 방법을 잘 생각못했음. 처음방법은 쓸데없이 많은 조합을 만드는 방법임
//어차피 한 손님이라도 그 조합을 가지고 있어야 다른 손님이 가지고 있는지 확인해야하는거니까!
