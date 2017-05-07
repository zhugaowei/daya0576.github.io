---
layout: post
title: "Http协议的笔记 (待更新)"
date: 2017-03-20 21:03:18 +0800
comments: true
categories: [django, http]
---

> 后端工程师面试时必问的一个问题就是**Http协议**, 例如 http是建立在 TCP/IP 协议之上的应用层规范, Request和Response的结构, Response状态码的类型.    
这些基础知识, 其实在实际的工作中其实还是很有用处的, 有利于自己理解很多**隐藏的细节**.     
这篇日志记录了最近看到的一些不错的资料, 以后可能会持续更新~~    
<!--more-->
<br>  


## Http request:
![Request][1]

## Http response:
![Response][2]

##Http response code    
这段真的是返回值的精华总结:    
**1xx: hold on   
2xx: here you go   
3xx: go away   
4xx: you fucked up   
5xx: I fucked up   **
_   
再下边是具体的常用返回值:   
# The status code is a 3-digit number:    
###1xx (Informational): Request received, server is continuing the process.   
**100** Continue: The server received the request and in the process of giving the response.   
###2xx (Success): The request was successfully received, understood, accepted and serviced.   
**200** OK: The request is fulfilled.   
###3xx (Redirection): Further action must be taken in order to complete the request.   
**301** Move Permanently: The resource requested for has been permanently moved to a new location. The URL of the new location is given in the response header called Location. The client should issue a new request to the new location. Application should update all references to this new location.   
**302** Found & Redirect (or Move Temporarily): Same as 301, but the new location is temporarily in nature. The client should issue a new request, but applications need not update the references.   
**304** Not Modified: In response to the If-Modified-Since conditional GET request, the server notifies that the resource requested has not been modified.   
###4xx (Client Error): The request contains bad syntax or cannot be understood.   
**400** Bad Request: Server could not interpret or understand the request, probably syntax error in the request message.   
**401** Authentication Required: The requested resource is protected, and require client’s credential (username/password). The client should re-submit the request with his credential (username/password).   
**403** Forbidden: Server refuses to supply the resource, regardless of identity of client.   
**404** Not Found: The requested resource cannot be found in the server.   
**405** Method Not Allowed: The request method used, e.g., POST, PUT, DELETE, is a valid method. However, the server does not allow that method for the resource requested.   
**408** Request Timeout:   
**414** Request URI too Large:   
###5xx (Server Error): The server failed to fulfill an apparently valid request.   
**500** Internal Server Error: Server is confused, often caused by an error in the server-side program responding to the request.   
**501** Method Not Implemented: The request method used is invalid (could be caused by a typing error, e.g., "GET" misspell as "Get").   
**502** Bad Gateway: Proxy or Gateway indicates that it receives a bad response from the upstream server.   
**503** Service Unavailable: Server cannot response due to overloading or maintenance. The client can try again later.   
**504** Gateway Timeout: Proxy or Gateway indicates that it receives a timeout from an upstream server.   


##Https
###非对称加密
为了防止密钥在传输的过程中泄露, 就发明了这种只传输公钥的加密算法.     
每个人都有一个公钥+密钥(public and private key).     
当我们在本地向github请求信息的时候:   

1. Github用我们**上传的公钥**对需要拉取的信息做加密处理.     
2. 这段**加密信息**, 就只有用到我们自己**本地私钥**才能解密.     

大致就是这个意思, 要是说的不对或者不太懂记得给我留言哦~~   




  [1]: https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_RequestMessageExample.png
  [2]: https://www.ntu.edu.sg/home/ehchua/programming/webprogramming/images/HTTP_ResponseMessageExample.png
  [3]: https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
