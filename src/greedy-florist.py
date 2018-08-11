
import os

def main():
    n, k = raw_input().split()
    n = int(n);
    k = int(k);
    c = []
    for i in raw_input().split():
        c.append(int(i))
    for i in range(n):
        for j in range(i + 1, n):
            if (c[i] < c[j]):
                t = c[i]
                c[i] = c[j]
                c[j] = t
    i = 0
    cost = 0
    x = 1
    while (i < n):
        j = 0;
        while (i < n and j < k):
            cost += c[i] * x
            i += 1
            j += 1
        x += 1
    print cost

if __name__ == '__main__':
    main()

