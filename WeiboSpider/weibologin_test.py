# -*- coding:utf-8 -*-

import re
import urllib
import urllib2
import cookielib

import lxml.html as HTML

class Fetcher(object):
    def __init__(self, username=None, pwd=None, cookie_filename=None):
        #获取一个保存cookie的对象
        self.cj = cookielib.LWPCookieJar()
        if cookie_filename is not None:
            self.cj.load(cookie_filename)
        #将一个保存cookie对象，和一个HTTP的cookie的处理器绑定
        self.cookie_processor = urllib2.HTTPCookieProcessor(self.cj)
        #创建一个opener，将保存了cookie的http处理器，还有设置一个handler用于处理http的URL的打开
        self.opener = urllib2.build_opener(self.cookie_processor, urllib2.HTTPHandler)
        #将包含了cookie、http处理器、http的handler的资源和urllib2对象绑定在一起
        urllib2.install_opener(self.opener)
        
        self.username = username
        self.pwd = pwd
        self.headers = {'User-Agent':'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20100101 Firefox/14.0.1',
            'Referer':'','Content-Type':'application/x-www-form-urlencoded'}

    def get_rand(self, url):
        headers = {'User-Agent':'Mozilla/5.0 (Windows;U;Windows NT 5.1;zh-CN;rv:1.9.2.9)Gecko/20100824 Firefox/3.6.9',
        'Referer':''}
        req = urllib2.Request(url ,"", headers)
        login_page = urllib2.urlopen(req).read()
        rand = HTML.fromstring(login_page).xpath("//form/@action")[0]
        passwd = HTML.fromstring(login_page).xpath("//input[@type='password']/@name")[0]
        vk = HTML.fromstring(login_page).xpath("//input[@name='vk']/@value")[0]
        return rand, passwd, vk
    
    def login(self, username=None, pwd=None, cookie_filename=None):
        if self.username is None or self.pwd is None:
            self.username = username
            self.pwd = pwd
        assert self.username is not None and self.pwd is not None
        
        url = 'http://login.weibo.cn/login/?rand=437560244&backURL=http%3A%2F%2Fweibo.cn%2F&backTitle=%E5%BE%AE%E5%8D%9A&vt=4&revalid=2&ns=1'
        # 获取随机数rand、password的name和vk
        rand, passwd, vk = self.get_rand(url)
        print(rand, passwd, vk)
        data = urllib.urlencode({'mobile': self.username,
                                passwd: self.pwd,
                                'remember': 'on',
                                'backURL': 'http://weibo.cn/',
                                'backTitle': '新浪微博',
                                'vk': vk,
                                'submit': '登录',
                                'encoding': 'utf-8'})
        url = 'http://login.weibo.cn/login/' + rand
        print url

        # 模拟提交登陆
        page =self.fetch(url,data)
        link = HTML.fromstring(page).xpath("//a/@href")[0]
        if not link.startswith('http://'): link = 'http://weibo.cn/%s' % link
        
        # 手动跳转到微薄页面
        self.fetch(link,"")
        
        # 保存cookie
        if cookie_filename is not None:
            self.cj.save(filename=cookie_filename)
        elif self.cj.filename is not None:
            self.cj.save()
        print 'login success!',data
                                    
    def fetch(self, url,data):
        print 'fetch url: ', url
        req = urllib2.Request(url,data, headers=self.headers)
        return urllib2.urlopen(req).read()

# 开始运行
fet=Fetcher();
fet.login("EMAIL","PWD")
print fet.fetch('http://weibo.cn/ohmygossip', None)


#headers = {'User-Agent' : 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)'}
#url = "http://weibo.cn/mayun"
#req = urllib2.Request(url = url, headers = headers)
#res_data = urllib2.urlopen(req)
#res = res_data.read()
#real_user = {}
#real_user["username"] = re.findall('<title>(\S+)</title>', res)[0]
#real_user["userid"] = re.findall('<a href="/(\w+)/info">', res)[0]
#print res
#if (real_user != None):
#    print(real_user["username"])
#    print(real_user["userid"])
#else:
#    print "查找失败"