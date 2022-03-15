str = input()
m = str[0] #열
n = int(str[1]) #행

count = 8

if n == 1:
    count -= 4
    if m =='a' or m =='h':
        count -= 2
    elif m == 'b' or m == 'g':
        count -= 1
elif n == 8:
    count -= 4
    if m=='a' or m =='h':
        count -= 2
    elif m == 'b' or m == 'g':
        count -= 1
elif n == 2:
    count -= 2
    if m <= 'a' or m >= 'h':
        count -= 3
    elif m<='b' or m >= 'g':
        count -= 2
elif n == 7:
    count -=2
    if m <= 'a' or m >= 'h':
        count -= 3
    elif m<='b' or m >= 'g':
        count -= 2

print(count)

# 이동할 수 있는 경로 8가지를 배열로 지정
# 이동 경로 구한 뒤, 좌표평면을 벗어나는지 확인

row = int(str[1])
col = int(ord(str[0]))-int(ord('a')) + 1 #문자를 아스키코드를 이용해 숫자로 변경

# 가능한 방향 경로 정의
drow = [2, 2, -2, -2, 1, 1, -1, -1]
dcol = [1, -1, 1, -1, 2, -2, 2, -2]

result = 0
for i in range(0, 8):
    next_row = row+drow[i]
    next_col = col+dcol[i]
    #이동 가능한지 확인
    if next_row>=1 and next_row<=8 and next_col>=1 and next_col <=8:
        result+=1

print(result)
