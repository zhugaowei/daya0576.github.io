---
layout: post
title: "Django REST Framework (Hypers week2) (待更新)"
date: 2017-03-22 21:10:29 +0800
comments: true
categories: [django]
---

> 在面试的时候经常被问起是否了解RESTFUL框架, 表示一脸懵b。    
公司项目重构的API用的是Django REST Framework, 花两天读了一下官方的tutorial。    
这篇日志是我做的笔记。       
<!--more-->
<br>  

> 官方文档的地址:[http://www.django-rest-framework.org/#tutorial ](http://www.django-rest-framework.org/#tutorial )
<br>

> 看到最后， 最关键的还是这张图:   
<img style="max-height:300px" class="lazy" data-original="/images/blog/170322_REST/highlight.png">
<br>

## Serializer class
1. Creating a model
2. Creating a Serializer class <-- create/update --> return model instance
The create() and update() methods define how fully fledged instances are created or modified when calling serializer.save()
A serializer class is very similar to a Django Form class (Difference??)
<br>

## ModelSerializer
```python
class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = ('id', 'title', 'code', 'linenos', 'language', 'style')
```
<br>

##REST framework Requests and Responses
(null)
<br>

## format_suffix_patterns
http http://127.0.0.1:8000/snippets.json  # JSON suffix
http http://127.0.0.1:8000/snippets.api   # Browsable API suffix

urlpatterns = format_suffix_patterns(urlpatterns)
<br>


## Associating two serializers
On the SnippetList view class, add the following method:
```python
def perform_create(self, serializer):
    serializer.save(owner=self.request.user)

class SnippetSerializer(serializers.Serializer):
owner = serializers.ReadOnlyField(source='owner.username')

```
