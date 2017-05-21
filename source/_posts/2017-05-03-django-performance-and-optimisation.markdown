---
layout: post
title: "Django 性能优化官方文档笔记(主要针对ORM)"
date: 2017-05-03 21:34:09 +0800
comments: true
categories: [django, orm]
---

> 最近看了django关于性能优化的文档:     [https://docs.djangoproject.com/en/1.11/topics/performance/](https://docs.djangoproject.com/en/1.11/topics/performance/)   
写下几点比较深的感触.  
<br>
<!--more-->
<br>  

### 1. 你的时间才是最宝贵的:
文档里的这句话还是挺有意思的: Your own time is a valuable resource, more precious than CPU time. Some improvements might be too difficult to be worth implementing, or might affect the portability or maintainability of the code. Not all performance improvements are worth the effort.
<br>

### 2. 最重要的原则: Work at the appropriate level
意思就是说要在对应的level(M V C)做对应的事. eg. 如果计算court, 在最低的数据库level里是最快的.   
但queryset是lazy的, 所以有时候在higher level(模板)里控制queryset是否真的执行, 说不定会更高效.   
_   
下面这段代码很好的解释了不同level的意思:    
```python
# QuerySet operation on the database
# fast, because that's what databases are good at
my_bicycles.count()

# counting Python objects
# slower, because it requires a database query anyway, and processing
# of the Python objects
len(my_bicycles)

# Django template filter
# slower still, because it will have to count them in Python anyway,
# and because of template language overheads
\{\{ my_bicycles|length \}\}
```

既然queryset是lazy的, 那么问题来了, queryset什么时候会被evaluate呢?

1. Iteration
2. slicing
3. picling/caching
4. repr(print)
5. len (Note: 如果你只想知道这个queryset结果的长度的话, 最高效的还是在数据库的层级调用count()方法, 也就是sql中的COUNT(). )
6. list()
7. bool()   

以上的情况一旦发生, 就会查询数据库并生成cache.   
<br>

### 数据库层级的优化
官方的文档介绍了很多, 我写几点最有效的和最常用的:   

1. 利用queryset lazy的特性去优化代码, 尽可能的减少连接数据库的次数.
2. 用iterator来存Queryset, 以防止占用太多的内存.   
3. 尽可能把一些数据库层级的工作放到数据库, 例如filter, exclude, F, annotate....
4. 巧用select_related() 和 values_list().  
5. bulk(批量)地去insert update和delete数据.     
6. 在解决性能问题的时候, 要利用工具看看到底执行了哪些sql, 具体的执行速度.    
以前上一门computer vision的时候, 老师最强调的一点就是你这个性能或效果是如何量化的, 只有这样才能更好的进行比较和针对优化.  
<br>


### 举个栗子:   
最近改写了一个项目里很常用的方法(之前也是我写的, 但感觉稍微有些慢), 利用刚看的一些知识, 把执行时间从100多ms降到了20ms.    
```python
def users(self, add_self=False, add_share=True, select_id=False):
    """Return 当前用户能看到的所有用户, 返回queryset, 以便做性能优化:
    参数:
        1. add_self:  是否添加当前用户(self).
        2. add_share: 是否添加因为共享(account/campaign)而可见的用户.
            eg. u2共享a1给u1, u1.users(add_share=True)就能看到u2
        3. select_id: 是否只取id字段
    逻辑:
        1. add_share=False 时:
            +----------+-------------------------------------+
            | Type     | 可见的用户集合                        |
            +----------+-------------------------------------+
            | Root     | 所有 [Advanced, Member] - blacklist |
            +----------+-------------------------------------+
            | Admin    | 同组 [Advanced, Member] - blacklist |
            +----------+-------------------------------------+
            | other    | []                                  |
            +----------+-------------------------------------+
        2. add_share=True 时:
            利用当前用户能看到的所有accounts, 获取创建它们的用户(permission=2)
    """
    # 1. users_shared
    if add_share:
        # 共享给该用户的account的主人们
        aps = AccountPermission.objects.filter(
            account__status='ACTIVE', permission='2', account__in=self.accounts()
        ).select_related('share_user').values_list('share_user__id', flat=True)
        users_shared = User.objects.filter(id__in=aps)
    else:
        users_shared = User.objects.none()

    # 2. users
    if self.score <= 2:
        query_dict = dict(role__in=['ADVANCED', 'MEMBER'])
        # Admin
        self.score == 2 and query_dict.update(usergroup=self.usergroup)
        users = User.objects.filter(**query_dict).exclude(id__in=self.blacklist)
    else:
        users = User.objects.filter(id=self.id)

    users = users | users_shared

    # 控制是否添加本身, 主要是user1.has_permission(user1)的时候用到
    if not add_self:
        users.exclude(id=self.id)
    else:
        users |= User.objects.filter(id=self.id)

    # 大部分情况下只需要id. 用户列表很多时, 可以大幅度提高性能.
    if select_id:
        users = users.values_list('id', flat=True)
    return list(set(users))
```
