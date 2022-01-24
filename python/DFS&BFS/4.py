from collections import deque

n, m  = map(int, input().split())
mapArr = [list(map(int, input())) for _ in range(n)]

# 상 하 좌 우 
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs(graph, x, y):
    queue = deque([[x, y]]) 
    # 큐가 빌때까지 반복
    while queue:
        v = queue.popleft()

        for i in range(4):
            nx = v[0] + dx[i]
            ny = v[1] + dy[i]
            #미로를 벗어난 경우
            if nx < 0 or nx >= n or ny < 0 or ny >= m:
                continue
            # 괴물이 있는 경우
            if graph[nx][ny] == 0:
                continue
            # 현재 노드 방문 처리
            graph[nx][ny] = graph[v[0]][v[1]] + 1
            # 도착지에 도달한 경우
            if nx == n-1 and ny == m-1:
                return
            queue.append([nx, ny])


bfs(mapArr, 0, 0)
print(mapArr[n-1][m-1])

# not solved😥
# dfs, bfs 문제는 정형화되어 있으니 큰 틀을 만들어놓고 이를 가져다가 덧붙이면 편리하다.
# bfs에서 큐에 노드를 넣기전에 예외처리를 한 후 넣어야 큐 크기의 낭비를 줄일 수 있다.
# 그래프 문제에서는 항상 dx, dy 이용하는 방법 떠올리기
# BFS : 큐 정의 -> 현재 노드 방문 처리 -> 큐가 빌때까지 반복 -> 큐에서 원소 하나 뽑음 -> 해당 원소와 연결된, 방문하지 않은 원소들을 큐에 삽입
# DFS : 현재 노드 방문 처리 -> 현재 노드와 연결된 다른 노드를 재귀적으로 방문

# BFS DFS 구분법
# BFS의 경우 최단거리, 최소 횟수를 구하는 등의 문제
# DFS의 경우 모든 경우를 탐색해야 할때
# 비슷한 유형의 문제들을 풀어보면서 감 익히기! 머릿속으로 생각해본 후 적절한 방법 찾기

# 5 6
# 101010
# 111111
# 000001
# 111111
# 111111