---
layout: post
title: "Git Internal(初探git的内部实现)"
date: 2018-03-14 23:55:08 +0800
comments: true
categories: [git]
---

> 最近YouTube上看到Gitlab频道的一个视频: [Git Internals - How Git Works - Fear Not The SHA!](https://www.youtube.com/watch?v=P6jD966jzlk)   
感觉打开了新世界的大门🤩😍🤣. 用这篇博客记录一下感悟和思考, 希望你看完之后, 对下边这张图会有更深的理解.    
<img style="max-height:250px" class="lazy" data-original="/images/blog/180315_git_internal/6993E92A-CB86-4BB9-9063-F3134BDC94D3.png">
<!--more-->
<br><br>

{% include private/toc.html %}
<br><br>


# 第一部分: 基础概念和定义(重要!)
## Basic git workflow   
(p.s. git pull = git fetch + git merge)   
<img style="max-height: 400px" class="lazy" data-original="/images/blog/180315_git_internal/1FA4B411-E64F-4438-B889-E4F7DE9C27E5.png">

## 万物皆对象
git中各种概念(e.g. branch/commit..), 其实都是**对象(文件)**. 每个对象拥有唯一标示: `SHA1`.   
SHA1一共有40位, 前两位作为文件夹, 一般使用前八位作为shortcut (下图红色方框中).   
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/AE2169D4-24D6-4E62-81C7-DD783DDDE3DC.png">
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/15210820035986.jpg">


## Git Model:   
<img style="max-height:300px" class="lazy" data-original="/images/blog/180315_git_internal/B7315A1E-8F50-4597-BCEC-5AAAAF5D8DE8.png">

不同的branch其实指向对应的commit    
然后每个commit都会指向它之前的commit  
------  
一个具体的例子(现在可能一头雾水, 但完成本文第二部分的Workshop后, 肯定会豁然开朗):    
<img style="max-height:320px" class="lazy" data-original="/images/blog/180315_git_internal/6993E92A-CB86-4BB9-9063-F3134BDC94D3-1.png">

<br><br>

# 第二部分: Workshop

**提示:** 只有自己实践一遍才能真正领悟git的奥妙.   
**小工具:** 监测当前目录下的所有文件: `watch -n 1 -d find .`   
效果见下图:      
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/133173A3-26FB-4066-8229-D7FAFEF5B654.png">


## 第一个commit:   

###git add
**操作:** 新建文件foo.txt, 并执行`git add foo.txt` → 自动生成了一个文件(.git/objects/9d/aeaf...)      
<img style="max-height:270px" class="lazy" data-original="/images/blog/180315_git_internal/9B1A1C47-EDCD-41EF-A759-4AC2336E2582.png">

**上图的文件(9daeaf)是什么呢?**   
`git cat-file -p 9daeaf` → 文件foo.txt的内容
**blob怎么知道是哪个path?**   
文件名和blob的对应关系保存在 `.git/index`中. 
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/3ADA3565-0DC7-461A-B637-770264553DE6.png">

###git commit
**提交!**   
**执行** `git commit -m “foo commit #1”` →  自动新建了两个文件:    
<img style="max-height:220px" class="lazy" data-original="/images/blog/180315_git_internal/C32B30A0-304F-4C5F-BDB4-C8F1E4AF028B.png">    

**两个文件分别对应两个对象:**

1. commit(fb4495):   
commit文件中包含这几个内容: 指向的tree(b54231)/author/committer/message.   
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/600D84D1-5EB3-4085-9C17-AF368B14E2A9.png">

2. tree(b54231)   
指向的blob(9daeaf)   
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/3492EBD4-1970-4D1A-8399-B5CA24F10BED.png">

**完整关系(point references):**   
commit(红色) → tree(黄色) → blob(绿色)   
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/6F27581D-D28A-4296-9C0D-7E5ECFEF12C9.png">

对应这张图:   
<img class="lazy" data-original="/images/blog/180315_git_internal/B7315A1E-8F50-4597-BCEC-5AAAAF5D8DE8-1.png">
<br>

## 第二个commit:   
**操作:** 新建一个文件bar.txt, 修改文件foo.txt的内容. add并commit之后, 具体细节见第一个commit, 就不细说了, 但注意:

1. 当前commit多了一个指向上一个commit的字段: parent.   
2. 当前commit指向的tree指向了两个blobs, 分别为新建的bar.txt, 和修改后的foo.txt

<img style="max-height:250px" class="lazy" data-original="/images/blog/180315_git_internal/C57A8ECB-062D-4CDE-B54E-26F8EEA5F57C.png">
<br>

## 第三个commit:   
1. 新建一个文件baz.txt, 输入"AHA!!!"      
2. `git add` → 新增一个blob对象(ce9db9).   
3. commit之后:   
新建了一个commit对象(8f1fd55) → tree(d905ab) → 三个blob(两个已经存在的blob对象 + 刚刚add新增的blob对象(ce9db9))   
这个地方就是git的巧妙之处!!! 复用之前的文件, 所以永远不会保存重复的文件   
“That's glorious.” 视频中的原句 XD   
<img style="max-height:250px" class="lazy" data-original="/images/blog/180315_git_internal/ABEB63D2-D630-4D0F-AE0D-07A685311A03.png">   
再举一个例子: 如果创建了一百个相同内容的文件, git add .之后, 只会创建一个blob对象.    
再对照着看下图(对blob的引用), 是不是有种豁然开朗的感觉呢?     
<img class="lazy" style="max-height: 350px;" data-original="/images/blog/180315_git_internal/6993E92A-CB86-4BB9-9063-F3134BDC94D3-3.png">
<br>


## Branch
git checkout -b foobranch → 创建了一个文件: ./.git/refs/heads/foobranch

cat .git/refs/heads/foobranch → 8f1fd5... → git cat-file -p 8f1fd5 → 第三个commit
所以branch就是一个指向commit的对象 AHA!   
<img style="max-height:200px" class="lazy" data-original="/images/blog/180315_git_internal/C83061B0-4743-4BDE-8938-61A73E65B5AF.png">   
<img style="max-height: 350px;" class="lazy" data-original="/images/blog/180315_git_internal/6993E92A-CB86-4BB9-9063-F3134BDC94D3-4.png">
<br>

## TODO: merge/rebase
<br><br>

# 视频最后给出的扩展阅读资料:   
<img style="max-height:400px" class="lazy" data-original="/images/blog/180315_git_internal/DF36A37C-15FC-41DC-918E-334982A2635A.png">

<br><br>

# Reference

- [Git Internals - How Git Works - Fear Not The SHA!](https://www.youtube.com/watch?v=P6jD966jzlk)

