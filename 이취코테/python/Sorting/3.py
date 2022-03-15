n = int(input())
arr = []

for i in range(n):
    info = input().split()
    arr.append((info[0], int(info[1])))

def setting(data):
    return data[1]

arr.sort(key=setting)

for i in arr:
    print(i[0], end=' ')

# solve
# sort를 할때 어떤값을 기준으로 정렬할건지를 key값을 통해 설정해줄 수 있음.
# JS에서는? 배열안에 객체를 넣음다음 정렬하면 됨. sort의 compareFunction을 통해 자유롭게 정렬기준을 세울 수 있다~
# arr=[{name:'홍길동', score:95},{name:'이순신', score:77}] 인 경우 arr.sort((a,b)=>(a.score-b.score))을 하면 score를 기준으로 오름차순 정렬 가능.

    
# 2
# 홍길동 95
# 이순신 77