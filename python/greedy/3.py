n, m = map(int, input().split())
arr = [list(map(int, input().split())) for _ in range(n)]

minMax = 0

for i in range(0, n):
    if minMax < min(arr[i]):
        minMax = min(arr[i])

print(minMax)

# 연산자, 콤마 쓸때 띄어쓰기 하기
# 2차원 배열 한번에 다 입력받을 필요 없이 한줄씩 입력받아서 연산하기
