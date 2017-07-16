---
layout: post
title: "P/NP/NPC/NP-Hard 笔记"
date: 2017-07-14 23:43:41 +0800
comments: true
categories: [algorithm]
---

> NP完全和NP难问题困扰了我好几个月， 用这篇日志记录我最近的思考和学习(<a style='color: red'>红色标注</a>的为待解决的问题)。      
<img style="max-height:250px" class="lazy" data-original="/images/blog/170714_np/np.png">    
<!--more-->   
<br>  


> ### 1. P/NP:   
**P: polynomial-time problems**   
P类问题就是能在多项式时间内解决的问题。   
**NP: non-deterministic polynomial**   
NP问题是指能在多项式时间里验证一个解是否为True的问题    
e.g. 给出一组输入， 我们可以在多项式时间内验证这个解的答案是‘是’或者‘否’。      
<br>


> ### 2. 归约的概念:   
**归约(Reductions)**:《算法导论》上举了这么一个例子。 比如说想在有两个问题：求解一个**一元一次方程**和求解一个**一元二次方程**。   
前者可以归约到后者，就是说知道如何解一个一次二元方程， 肯定能解出一元一次方程（将一元二次方程的二次项系数设为0）。   
所以一元二次方程的时间复杂度肯定大于等于一元一次方程，也就是说，只要能多项式时间复杂度去解决一元二次问题，一元一次方程也肯定能用多项式的时间复杂度去解决。   
**所以:**   
如果可以 多项式时间复杂度从 A(一元一次方程) 归约到 B(一元二次方程)   
B 属于 P --> A 属于 P   
B 属于 NP --> B 属于 NP   
<br>


> ### 3. NPC(NP完全问题):   
如何证明一个问题 X 是NP-complete:   
1. X ∈ NP   
2. reduce from know NP-complete    
那么就要说到第一个被证明为NPC问题，SAT(Boolean satisfiability problem)：   
给定一个个电路， 判断该电路的满足性(所有的输入中， 至少有一个使最后的输出为1)：   
<img style="max-height:250px" class="lazy" data-original="/images/blog/170714_np/boolean.jpg">     
1. 我们可以证明他是一个NP问题， 因为他的解可以在多项式的时间复杂度内验证。    
2. 而且它是np难的， 因为它至少比np中的任意问题都难。   
**<a style='color: red'>那么如何证明呢？？好困扰， 待解决中！！！</a>**    
**NPC问题举例：**   
1. null   
<br>


> ### 3. NP-Hard(NP难问题):   
时间复杂度大于或等于所有np问题，既未必可以在多项式时间内**验证一个解的正确性**。  
**NP困难问题举例：**   
1. null   
<br>
