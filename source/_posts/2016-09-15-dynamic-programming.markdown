---
layout: post
title: "Dynamic Programming Notes"
date: 2016-09-15 10:52:49 +1000
comments: true
categories: [dp, dynamic programming]
---

> I found a [fatastic video](https://www.youtube.com/watch?v=OQ5jsbhAv_M) about Dynamic Programming, this blog is my note of learning DP.

<!--more-->

   
**Video link**: [https://www.youtube.com/watch?v=OQ5jsbhAv_M](https://www.youtube.com/watch?v=OQ5jsbhAv_M)    
`DP = recursion + memorization + guessing`      


##Fibonacci number: 1, 1, 2, 3, 5, 8, 13...##
``` python
def fib(n):
    if n<=2: f = 1
    else: f = fib(n-1) + fib(n-2)

    return f
```
<br>

###improvement: 
- Memorize
- Reuse solutions to **sub-problems** to solve the problem    
- So time = #sub-problems * O(sub-problem)    
``` python
#!/usr/bin/python3
from collections import defaultdict
import sys

n = int(sys.argv[1])
mem = defaultdict(lambda: 0)

def fib(n):
    global mem
    # print(n)
    if mem[n]:
        return mem[n]

    if n<=2: f = 1
    else: f = fib(n-1) + fib(n-2)

    mem[n] = f
    print(f)
    return f

def fib_con(n):
    mem = {}
    for k in range(1, 1+n):
        if k<=2:
            mem[k] = 1
        else:
            mem[k] = mem[k-1] + mem[k-2]

        print(mem[k])
    return mem[n]

fib(n)
fib_con(n)

```

##Shortest Path:
The answer? guess!   
.. try all guesses    
(& take the best one)    
 

