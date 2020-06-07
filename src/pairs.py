import os

numbers = []

def sort(l, r):
    if (l >= r):
        return
    t = numbers[l]
    i = l
    j = r
    while (i < j):
        while (i < j and numbers[j] >= t):
            j -= 1
        if (i < j):
            numbers[i] = numbers[j]
            i += 1
        while (i < j and numbers[i] <= t):
            i += 1
        if (i < j):
            numbers[j] = numbers[i]
            j -= 1
    numbers[i] = t
    sort(l, i - 1)
    sort(i + 1, r)

def main():
    n, k = raw_input().split()
    n = int(n)
    k = int(k)
    for i in raw_input().split():
        numbers.append(int(i))
    sort(0, n - 1)
    res = 0
    j = 1
    for i in range(n - 1):
        if (numbers[n - 1] - numbers[i] < k):
            break
        while (j < n):
            if (numbers[j] - numbers[i] >= k):
                break
            j += 1
        if (numbers[j] - numbers[i] == k):
            res += 1
            j += 1

    print res

if __name__ == '__main__':
    main()
