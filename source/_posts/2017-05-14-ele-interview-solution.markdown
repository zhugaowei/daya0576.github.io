---
layout: post
title: "饿了吗 一道面试题的解答分享"
date: 2017-05-14 23:46:27 +0800
comments: true
categories: [ele, django, database]
---

> 之前在上海面试后端开发的时候, 面试官问了一个数据库相关的问题:   
有这么一张表: 里边存着所有用户的登录信息, 例如用户名和登录时间.   
请问如何找出所有用户的最近登录的记录呢?   
<!--more-->
<br>  
### sql:
用sql其实很简单, 就是先按时间排个序, 再按用户id groupby一下就行了.        
<br>

### orm:
在django的orm中也是一个道理, 可以用annotate:   
<img style="max-height:500px" class="lazy" data-original="/images/blog/170515_ele/annotate.png">    
