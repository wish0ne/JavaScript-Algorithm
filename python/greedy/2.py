n, m, k = map(int, input().split())
data = list(map(int, input().split()))
data.sort()

#내코드
# sum = 0
# num = 0

# while(num<m):
#   for i in range(0, k):
#     sum+=data[n-1]
#     num+=1
#     if num==m:
#       break
#   if num==m:
#     break
#   else:
#     sum+=data[n-2]
#     num+=1
# print(sum)

# 예시 답안
# int(m/(k+1))*k 번 반복 후 나머지는 m%(k+1)
first = data[n-1]
second = data[n-2]

count = int(m/(k+1)) * k
count += m % (k+1)

result = 0
result += (count) * first
result += (m-count) * second

print(result)

# 머릿속으로 풀이를 99% 끝낸 후 코딩 시작하기
