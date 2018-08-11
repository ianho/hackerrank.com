import os
import time

def main():
    t = int(raw_input())
    for c in range(t):
        read = raw_input()
        k, str1, str2 = read.split(' ')
        k = int(k)
        
        length = len(str1)
        maxres = 0
        for i in range(length):
            if (length - i < maxres):
                break
            x = 0
            diff = []
            while (x + i < length):
                while (str1[x] == str2[x + i]):
                    x += 1
                    if (x + i == length):
                        break
                if (x + i == length):
                    break
                diff.append(x)
                x += 1
            count = len(diff)
            if (count <= k):
                res = length - i
            else:
                res = diff[k];
                diff.append(x);
                for j in range(count - k):
                    if (diff[j + k + 1] - diff[j] - 1 > res):
                        res = diff[j + k + 1] - diff[j] - 1
            if res > maxres:
                maxres = res
            if res == 751:
                print diff
        for i in range(length):
            if (length - i < maxres):
                break
            x = 0
            diff = []
            while (x + i < length):
                while (str2[x] == str1[x + i]):
                    x += 1
                    if (x + i == length):
                        break
                if (x + i == length):
                    break
                diff.append(x)
                x += 1
            count = len(diff)
            if (count <= k):
                res = length - i
            else:
                res = diff[k];
                diff.append(x);
                for j in range(count - k):
                    if (diff[j + k + 1] - diff[j] - 1 > res):
                        res = diff[j + k + 1] - diff[j] - 1
            if res > maxres:
                maxres = res
        print maxres

if __name__=='__main__':
    main()
