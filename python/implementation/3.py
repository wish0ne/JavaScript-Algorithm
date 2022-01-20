n, m = map(int, input().split())
a, b, d = map(int, input().split())
gameMap = [list(map(int, input().split())) for _ in range(n)]

count = 1
fail = 0

gameMap[a][b] = -1

# 북 동 남 서
direction = [0,1,2,3]
dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]

nextX = a
nextY = b
nextD = d

while(True):
    #현재의 왼쪽 방향
    nextD = 3 if d == 0 else d-1
    nextX = a + dx[nextD]
    nextY = b + dy[nextD]
 
    # 바다거나 이미 가본 칸이면
    if(gameMap[nextX][nextY] == 1 or gameMap[nextX][nextY] == -1):
        fail += 1
    else:
        a = nextX
        b = nextY
        count += 1
        gameMap[a][b] = -1 # 가본 칸 처리
        fail = 0 # 새로 칸 이동했으니 fail 초기화!
    
    # 네 방향다 못가면 방향 유지한채 뒤로 한칸
    if fail == 4:
        a -= 1
        fail = 0 # 이부분 빼먹음 ! 처음 칸 초기화 추가했더니 이부분 없으면 안돌아감 (왜? 처음칸이 0으로 남아있었기 때문에 뒤로 갔을때 새로운 칸으로 이동한게 되고 그래서 fail이 초기화됐던것임 ㄷㄷ)
        # 뒤가 바다라면 stop
        if gameMap[a][b] == 1:
            break
    else:
        d = nextD


print(count)

# 시간 초과 😥 sovle 😃

# 시뮬레이션 문제
# 방향을 설정해서 이동하는 문제 유형에서는 dx, dy라는 별도의 리스트를 만들어 방향을 정하는것이 효과적.
# 이렇게 하면 반복문을 이용하여 모든 방향을 차례대로 확인할 수 있다.

# 만약 외곽이 전부 바다라는 조건이 없다면 예외처리를 해줘야함. 예외처리를 해야하는지 꼭 생각해보기
# 만약 새로운 2차원 배열을 만들어서 방문한 위치를 저장한다면 처음에 처음 위치도 방문처리를 해줘야함.
# 뒤로 한칸 간 경우 fail 초기화 하는것도 까먹음 ㅠ 
