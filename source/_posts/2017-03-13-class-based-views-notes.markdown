---
layout: post
title: "Django Class-based Views Notes (Hypers第一天)"
date: 2017-03-13 21:35:25 +0800
comments: true
categories: [django, hypers, python]
---

> 今天第一天到Hypers上班, 看代码才发现django有一个东西叫做**CBV(Class-based views)**. 晚上仔细看看官方的文档, 做一下笔记.     
<!--more-->
<br>

## 基本的概念:   
**View**: All views inherit from View Class, it handles linking the view in to the URLs, HTTP method dispatching and other simple features.    
**RedirectView** is for a simple HTTP redirect.   
**TemplateView** extends the base class to make it also render a template.    


## 最简单的一个用法:    
```python
from django.conf.urls import url
from django.views.generic import TemplateView

urlpatterns = [
    url(r'^about/$', TemplateView.as_view(template_name="about.html")),
]
```


## Class-based views 相对于 functions的优点:
- Organization of code related to specific **HTTP methods** (GET, POST, etc.) can be addressed by separate methods instead of conditional branching.     
举个栗子:    
```python
# FBV
def my_view(request):
    if request.method == 'GET':
        # <view logic>
        return HttpResponse('result')

# CBV
class MyView(View):
    def get(self, request):
        # <view logic>
        return HttpResponse('result')
```
- Object oriented techniques such as **mixins (multiple inheritance)** can be used to factor code into **reusable components**.    


## 重点研究TemplateView   
**作用**: **Renders** a given template, with the context containing parameters captured in the URL.   
_   
**整个流程:**   

- 在urls.py 调用 `as_view()` (Nothing to worry about. Just accept that the .as_view() is a pretty fine and decent solution :-))[4]   
- `as_view()`最后返回的是一个方法(在url匹配的时候执行). The function creates an instance of the class and calls its `dispatch()` method.   
- `dispatch()` looks at the request to determine whether it is a GET, POST, etc, and relays the request to a matching method if one is defined, **or** raises HttpResponseNotAllowed if not.    
_    
**如何使用:**
```python
# Example urls.py:
from django.conf.urls import url
from myapp.views import HomePageView

urlpatterns = [
    url(r'^$', HomePageView.as_view(), name='home'),
]


# Example views.py:
from django.views.generic.base import TemplateView
from articles.models import Article

class HomePageView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context = super(HomePageView, self).get_context_data(**kwargs)
        context['latest_articles'] = Article.objects.all()[:5]
        return context
```








## Reference:   
[1] [https://docs.djangoproject.com/en/1.10/ref/class-based-views/base/#templateview](https://docs.djangoproject.com/en/1.10/ref/class-based-views/base/#templateview)   
[2] [https://docs.djangoproject.com/en/1.10/topics/class-based-views/](https://docs.djangoproject.com/en/1.10/topics/class-based-views/)   
[3] [https://ccbv.co.uk/projects/Django/1.10/django.views.generic.base/TemplateView/](https://ccbv.co.uk/projects/Django/1.10/django.views.generic.base/TemplateView/)   
[4] [http://reinout.vanrees.org/weblog/2011/08/24/class-based-views-walkthrough.html](http://reinout.vanrees.org/weblog/2011/08/24/class-based-views-walkthrough.html)
