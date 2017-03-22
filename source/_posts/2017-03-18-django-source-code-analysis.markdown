---
layout: post
title: "Django 阅读源码笔记 - Hypers第一周"
date: 2017-03-18 23:17:07 +0800
comments: true
categories: [hypers, django]
---

> 来Hypers上班的第一周, 在看Django的middleware的时候, 对process `request, view, template和response`的四个过程有些疑惑, 俊哥建议我读一下django的源码.     
在这篇日志中, 我整理了django从**启动server** --> **处理Request** --> **返回response** 的整个**代码流程**.    
<!--more-->
<br>  

自己做的有道云笔记的链接: [http://note.youdao.com/noteshare?id=465ac1f8ca5a82a9cb998d49bb763df8](http://note.youdao.com/noteshare?id=465ac1f8ca5a82a9cb998d49bb763df8)

{% include private/hypers_note/django/request_sourcecode.html %}
