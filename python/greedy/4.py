n, k = map(int, input().split())
count=0
while (n != 1):
    if n % k == 0:
        n /= k
    else:
        n -= 1
    count += 1

print(count)

#1씩 빼도 현재 문제는 해결할 수 있지만, N이 100억 이상일때도 빠르게 동작하려면 N이 K의 배수가 되도록 한번에 빼는 방식을 활용
