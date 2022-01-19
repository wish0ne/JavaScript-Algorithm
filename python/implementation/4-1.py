n = int(input())
x = 1
y = 1
# 좌표는 (1,1)부터 (n,n)까지
# 좌표는 1~n까지 허용
arr = input().split()

for command in arr:
    if(command=='R'):
        if(y==n):
            continue;
        else:
            y+=1
    elif (command == 'L'):
        if(y==1):
            continue;
        else:
            y-=1
    elif (command == 'U'):
        if(x==1):
            continue
        else:
            x-=1
    elif (command == 'D'):
        if(x==n):
            continue
        else:
            x+=1
    else:
        continue

print(x, y)

# 시뮬레이션
# 이동 방향을 배열로 저장해서 사용하는 방법 그래프등에서 자주 사용되니 꼭 기억할것
# 가능한 이동방향 4가지 (L, R, U, D)
x, y = 1, 1
dx = [0, 0, -1, 1]
dy = [-1, 1, 0, 0]
move_types = ['L', 'R', 'U', 'D']

for a in arr:
    for i in range(len(move_types)):
        if a == move_types[i]:
            nx = x + dx[i]
            ny = y + dy[i]
    # 벗어나면 무시
    if nx < 1 or ny < 1 or nx > n or ny > n:
        continue
    # 이동
    x, y = nx, ny

print(x, y)
