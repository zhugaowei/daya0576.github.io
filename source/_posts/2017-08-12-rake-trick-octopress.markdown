---
layout: post
title: "Octopress `rake&nbsp;generate` 命令的大提速🚀"
date: 2017-08-12 17:11:12 +0800
comments: true
categories: [Octopress]
---

> 这个博客是三四年前用Octopress框架搭的, 老年人的博客, 哈哈.    
但是用久了之后**有个问题很困扰我:** 文章多了之后, 每次运行`rake generate`要很久.    
分享一个小技巧: 可以**大大提高了`rake generate`的速度(12.93s → 1.37s)**, 实时预览的时候也能对修改秒做响应了!   
<!--more-->   
<br><br>  


> 这个提速的小技巧就是Octopress自带的两条命令:    
`1. rake isolate\['xxx.md'\]`: 将其他博客文件(除了xxx.md)移出`_post`文件夹, 暂存到另一个临时的地方. 以达到提速的效果.         
`2. rake integrate`: 将暂存的全部文件都恢复.   
<img style="max-height:350px" class="lazy" data-original="/images/blog/170812_rake_tricky/rake_suggestion.png">   
<br><br>


> 可以从图上看到, isolate之后, rake generate的速度大大大大的提升了:   
从12.93s → 1.37s   
<img style="max-height:300px" class="lazy" data-original="/images/blog/170812_rake_tricky/result.png">    

 

