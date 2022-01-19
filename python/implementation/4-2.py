n = int(input())
hour = 0
min = 0
sec = 0
count = 0
while(hour <= n):
    if sec == 59:
        if min == 59:
            hour += 1
            min = 0
            sec = 0
        else:
            min += 1
            sec = 0
    else:
        sec += 1
    if (str(hour) + str(min) + str(sec)).find('3') != -1:
        count += 1

print(count)

# 완전 탐색 문제