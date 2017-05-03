---
layout: post
title: "django filter 的一个小技巧"
date: 2017-05-03 23:40:57 +0800
comments: true
categories: [django, filter]
---

> 最近在看django的官方文档的时候, 看到filter()需要注意的地方:
`Blog.objects.filter(entry__headline__contains='Lennon', entry__pub_date__year=2008)`和`Blog.objects.filter(entry__headline__contains='Lennon').filter(entry__pub_date__year=2008)`的结果竟然不同.    
仔细看了许久才明白其中的差异, 特写下这篇日志来分享一下.    
<!--more-->
<br>  

这是我的一个更简单明了的例子:   
笔记连接: [http://note.youdao.com/noteshare?id=6df5d321962c781353aa3a87dea7c215](http://note.youdao.com/noteshare?id=6df5d321962c781353aa3a87dea7c215)

### 数据:
