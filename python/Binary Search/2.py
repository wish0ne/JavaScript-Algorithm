n = int(input())
nArr = list(map(int, input().split()))
m = int(input())
mArr = list(map(int, input().split()))

def binary_search(arr, target, start, end):
    if start > end:
        return False
    mid = (start + end) // 2
    if (arr[mid] == target):
        return True
    elif arr[mid] > target:
        return binary_search(arr, target, start, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, end)

nArr.sort() #이진탐색 사용하기 전 정렬필수
for i in mArr:
    if (binary_search(nArr, i, 0, n-1)):
        print('yes', end=" ")
    else:
        print('no', end=" ")

# 이진탐색 사용하기 전에 무조건 배열을 정렬해주는것 잊지말기


# 5
# 8 3 7 9 2
# 3
# 5 7 9