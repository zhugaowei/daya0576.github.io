---
layout: post
title: "Python中的静态方法和类方法实例分析"
date: 2017-07-16 01:59:08 +0800
comments: true
categories:
---

> 以前准备面试的时候, 有一个经典的python题目, 就是Python里的`静态方法(@staticmethod)`和`类方法(@classmetho)`.    
以前以为是个死记硬背的东西, 但上周在写一个公司的oauth2 sdk的时候竟然用上了, 还是感触颇深的, 用这篇日志记录一下.    
<!--more-->   
<br>  

### 我写的python包,主要有这么三个功能:   

1. `redirect_url = OAuth2Token.redirect(client_id, redirect_uri)`   
/authorize接口uri拼接,用于**获取重定向的链接**
2. `token = OAuth2Token.get(client_id, client_secret, redirect_uri, code)`   
授权后, 用的到的code换取access token
3. `token_new = token.refresh(self, client_id, client_secret)`   
用refresh token换取新access token
<br>


### 解释:   
    
声明: 就是一个简单的类, 干掉了敏感信息,而且这个包本来就上传到PyPI, 可以看到源码的.   
我就把代码贴出来做更好的解释：    

**功能1(redirect)** 我用了`静态方法(@staticmethod)`, 因为它没有用到Token实例.   
换句话说这个方法放在外边和类里边是一样的. 这个方法虽然没有用到实例, 但它这个类有关, 所以最好放到类里边, 可以使逻辑更加清晰, 美名曰静态方法.  

**功能2(get)** 我用了`类方法(@classmethod)`, 因为它是一个创建实例的方法, 它的第一个参数为Token类(cls).   
我对类方法的理解是: 想新建一个或多个实例, 但无法直接调用init方法时, 就可以用类方法(@classmethod).     
例如传入一个URL来实例化一个Token类, 我们是可以在类外边先对url做操作, 获取到init的所有参数, 再去实例化类. 但这样不就不优雅了, 不是吗?   
其实这就是传说中的工厂设计模式.   

**功能3(refresh)** 我用了`类的实例方法`, 它的第一个参数就是当前实例本身(self).    
因为该方法是对实例进行操作.    

```python
class Token(object):
    def __init__(self, access_token='', token_type='', refresh_token='', expiration=''):
        self.access_token = access_token
        self.token_type = token_type
        self.refresh_token = refresh_token
        self.expiration = expiration

    @staticmethod
    def redirect(client_id, redirect_uri, response_type='code'):
        """fetch redirect url

        BASE URL: ***
        Request:
            client_id
            redirect_uri
            response_type: code
        Request:
            (Redirect URL)
        """
        paras = dict(
            client_id=client_id,
            redirect_uri=redirect_uri,
            response_type=response_type
        )
        url = "{}/authorize?{}".format(BASE_URL, parse.urlencode(paras))
        return url

    @classmethod
    def get(cls, client_id, client_secret, redirect_uri, code, grant_type='authorization_code'):
        """fetch token

        POST: ***
        Request:
            header: Content-Type: application/x-www-form-urlencoded
            body:
                client_id
                client_secret
                redirect_uri
                grant_type： ***
                code
        Request:
            access_token, token_type, refresh_token, expiration
        """
        url = '{}/token'.format(BASE_URL)
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        data = dict(
            client_id=client_id,
            client_secret=client_secret,
            redirect_uri=redirect_uri,
            code=code,
            grant_type=grant_type
        )

        result = post(url, parse.urlencode(data), headers)
        return cls(**result)

    def update(self, result):
        if 'error' in result:
            raise APIError(result['error'], result.get('error_description'))

        self.access_token = result.get('access_token', '')
        self.token_type = result.get('token_type', '')
        self.refresh_token = result.get('refresh_token', '')
        self.expiration = result.get('expiration', '')

        if not (self.access_token and self.token_type and self.refresh_token and self.expiration):
            raise APIError('token', '')

        return self

    def refresh(self, client_id, client_secret, grant_type='refresh_token'):
        """refresh token

        POST: ***
        Request:
            body:
                grant_type: ***
                client_id
                client_secret
                refresh_token
        Response:
            access_token, token_type, refresh_token, expiration
        """
        url = '{}/token'.format(BASE_URL)
        data = dict(
            client_id=client_id,
            client_secret=client_secret,
            refresh_token=self.refresh_token,
            grant_type=grant_type
        )
        result = post(url, data, {})
        return self.update(result)

    def __str__(self):
        return '<Class: {}>\n' \
               'access_token:     "{}"\ntoken_type:       "{}"\n' \
               'refresh_token:    "{}"\nexpiration:       "{}"'.format(
                self.__class__.__name__,
                self.access_token, self.token_type, self.refresh_token, self.expiration)

    __repr__ = __str__
```
<br>
-EOF-
<br>


