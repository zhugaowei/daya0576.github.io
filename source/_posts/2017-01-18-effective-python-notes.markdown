---
layout: post
title: "Note of 《Effective Python》"
date: 2017-01-18 21:45:51 +1100
comments: true
categories: [python]
---

> 记得以前上大学的时候, 去图书馆借了一本《代码简洁之道》. 虽然大部分的内容都忘得差不多了, 但里边的一些思想至今还是收益颇深.     
最近开始看一本书叫做《Effective Python: 59 Specific Ways to Write Better Python》, 把里边一些印象深刻的东西记录在这篇日志里.     

<!--more-->
<br>   

###Chapter 1: Pythonic Thinking:    
1. Pythonic Thinking: `import this`   
2. 讲到选择Python2还是Python3的时候, 作者还是推荐大家尽量选择Python3.      
个人觉得一个初学者总是问学Python2 和 Python3的问题真的是很蠢的一种行为, 我以后还是要慢慢去学会写兼容Python 2 和 3 代码.
3. PEP 8 Style: 如果用Pycharm的话, 风格的不合适也是会用warning提示你的, 所以这个不必担心.    
但个人认为提高Python代码可读性, 还是要代码写的很有节奏, 配上简洁明了的注释.     
例子: `if len(l) == 0: --> if not l:`
4. standard library modules > third-party modules > own modules.     
import包的顺序, 以前写java的时候也是这么推荐的.     
5. 编码的问题(two types of representing se):   
Python3: `bytes`(raw 8-bit values) and `str`(Unicode characters)   
Python2: `str`(raw 8-bit values) and `unicode`   
编码的问题原理我还是不是特别清楚, 以前上课的时候提到过Unicode编码的思想, 有空还是要深入了解一下.    
Things to remember in this chapter:   
   * In python 3, `bytes` contains sequences of 8-bit values, `str` caontains sequences of Unicode characters. `bytes` and `str` instances cann't be used with operateors(like > or +)     
   * In Python 2, `str` contains sequences of 8-bit values, `unicode` contains sequences of Unicode characters. `str` and `unicode` can be used together with operators if the `str` only contains 7-bit ASCII characters.   
   * Use `helper functions` to ensure that the inputs you operate on are the type of character sequence you expect (8-bit values, UTF-8 encoded characters, Unicode characters, etc.).
   * If you want to read or write binary data to/from a file, always open the file using a binary mode (like `'rb'` or `'wb'`)   
6. 作者推荐这类只用一行简洁的写法: `red = my_values.get(‘red’, [”])[0] or 0`    
不由的让人想起了Perl的优美使用: `open BOOK, "hp1.txt" or die "$0: open '$file' failed: $!"`   
7. 数组的slice: 最经典还是这个反转数组(字符串)操作: `somelist[::-1]`    
8. 要尽量用List Comprehension(`squares = [x**2 for x in l if x % 2 == 0`, 而且更强大) 而不是map或者filte.    
字典和set也支持Comprehension Expression: `rank_dict = {rank: name for name, rank in chile_ranks.items()}`    
9. Consider generator expressions for large comprehensions(防止消耗过大的空间):     
Bad: `value = [len(x) for x in open(‘/tmp/my_file.txt’)]`   
Good: `(len(x) for x in open(‘/tmp/my_file.txt’))`   
看了这一小章终于明白generator存在的意义了.     
generator 唯一的缺点就是它只能用一次.    
stackoverflow上的一个不错的回答: [http://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do](http://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do)   
10. `zip`: 唯一要关注的问题就是在Python2中, zip并不是一个generator, 所以它可能会占用很大的内存, 所以要用izip. 而且当zip的两个参数的长度不一样的时候, 一个参数长出来的部分就会消失咯.  
11. `for`循环后边要尽量不用`else`    
13. try/except/else/finally的逻辑(异常Python用的不多, 但和以前Java的结构好像并没有什么不同). 例如没有exception的话就会走else.     

<br>

###Chapter 2: Functions:   
1. 要使用exception而不是返回`None` ("return" or "return None"), 因为None, 0, [], '' 都会被当成False.   
``` python
def divide(a, b):
    try:
        return a / b
    except ZeroDivisionError as e:
        raise ValueError('Invalid b') from e

if __name__ == '__main__':
    try:
        result = divide(1, 0)
    except ValueError:
        print('invalid input')
    else:
        print('result is %.1f' % result)
```
2. 用一个helper方法去自定义排序.    
```python
def sort_priority(values, group):
    def helper(x):
        if x in group:
            return 0, x
        return 1, x

    values.sort(key=helper)

l = [1, 2, 3, 4, 5, 6]
g = {4, 5}

sort_priority(l, g)
print(l)
```    
能这么做原因: 1.Python支持闭包(closures). 2.方法可以直接当做变量使用. 3.Python有自己的排序规则来自定义key.     
这一小节还讨论了一些scope的问题, 比如在helper里去改变sort_priority的变量肯定就没有效果, 要加上`nonlocal`, 不禁让人想起了`global`, 他们的作用是刚好相补的.     
但是作者还是推荐说`nonlocal`有风险, 要谨慎使用. 可以用一个类实现一样的功能或者使用list.    
为什么list可以无视scope呢, 还是不太明白?           
"The trick is that the value for found is a list, which is `mutable`. "   
_   
查了一下, 意思就是比如`x=y=1`, 改变immutable变量的值的话是会重新创建一个变量.    
如果是`x=y=[]`, 改变mutable的变量的话, x和y的值就一起变了. 可以理解为C语言中传的地址. y is a copy of x's reference.       
Stackoverflow上的详细解释: [http://stackoverflow.com/questions/986006/how-do-i-pass-a-variable-by-reference](http://stackoverflow.com/questions/986006/how-do-i-pass-a-variable-by-reference)   
_   
可以这么写不去改变传入的参数: `list(a)` or `a[:]` 来创建新对象.   
3.






<未完待续>
