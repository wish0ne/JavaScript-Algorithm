n = int(input())
arr = []
for i in range(0, n):
    num = int(input())
    arr.append(num)
arr.sort(reverse=True)

for i in arr:
    print(i, end=" ")

# solve
# JS는 arr.sort() 한 뒤 reverse()하면 뒤집을 수 있음.
# JS에서 reverse()는 원본 배열을 바꾸기 때문에 원본을 유지하고 싶다면 복사해서 사용해야함
# ex) arr2 = [...arr].reverse()