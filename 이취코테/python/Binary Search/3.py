n,m = map(int, input().split())
arr = list(map(int, input().split()))

arr.sort()
sum = 0 # 얻은 떡의 합
max = 0 # 구하고자 하는 값 (높이의 최대값)

h = arr[n-1] # 현재 높이

# 현재 높이보다 큰 떡의 길이만 남기기 위한 이진탐색
def binary_search(arr, target, start, end):
    if start > end:
        return arr[start:]
    mid = (start + end) // 2
    if (arr[mid] == target):
        return arr[mid+1:]
    elif(arr[mid] > target):
        return binary_search(arr, target, start, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, end)

while(max == 0):
    h -= 1 # 높이를 1씩 감소시키면서 확인
    sum = 0 
    temp = binary_search(arr, h, 0, n-1) # 높이보다 큰 떡들만 들어있는 배열 반환
    for i in temp:
        sum += i - h
        if sum >= m:
            max = h
            break

print(max)

# ---
# solve긴 하지만 시간초과 날 확률이 높은 코드.
# 떡의 길이들에서 이진탐색을 하는게 아니라 얻을 수 있는 떡의 합을 기준으로 이진탐색을 해야함.
# 왜? 높이의 범위가 10억까지니까 10억부터 1씩 감소시켜가는 코드는 너무 비효율적이다.
# 그래서 얻은 떡의 총합을 mid로 두고, 반씩 옮겨가면서 최적의 값을 찾음  (파라메트릭 서치를 이진탐색을 이용하여 해결)
# 입력값의 범위를 잘 보고, 이 코드가 시간제한을 맞출 수 있을지 생각해보기 필요

start = 0
end = max(arr)

while(start <= end):
    total = 0
    mid = (start + end) // 2
    for x in arr:
        #잘랐을때의 떡 양 계산
        if x > mid:
            total += x - mid
    # 떡의 양이 부족한 경우 더 많이 자름 (왼쪽 부분 탐색)
    if total < m:
        end = mid - 1
    # 떡의 양의 충분한 경우 덜 자르기 (오른쪽 부분 탐색)
    else:
        result = mid #최대한 덜 잘랐을경우를 구해야 하므로, 여기에서 result기록
        start = mid + 1

print(result)

# 4 6
# 19 15 10 17